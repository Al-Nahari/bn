#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🖼️  سكريبت إعادة تسمية الصور التلقائي
Automatic Image Renaming Script
"""

import os
import json
import shutil
from pathlib import Path
from typing import Dict, Tuple

class ImageRenamer:
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.public_dir = self.project_root / "public"
        self.mapping_file = self.project_root / "image_rename_mapping.json"
        self.log_file = self.project_root / "rename_log.txt"
        
        # تحميل الخريطة
        self.mapping = self._load_mapping()
        
        # إحصائيات
        self.renamed_count = 0
        self.failed_count = 0
        self.skipped_count = 0
        self.log = []
    
    def _load_mapping(self) -> Dict:
        """تحميل ملف الخريطة"""
        if not self.mapping_file.exists():
            raise FileNotFoundError(f"ملف الخريطة غير موجود: {self.mapping_file}")
        
        with open(self.mapping_file, 'r', encoding='utf-8') as f:
            return json.load(f)
        
    def _log(self, message: str):
        """تسجيل رسالة"""
        self.log.append(message)
        print(message)
    
    def _save_log(self):
        """حفظ سجل العمليات"""
        with open(self.log_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(self.log))
    
    def rename_folder_images(self, folder_name: str) -> Tuple[int, int, int]:
        """إعادة تسمية صور مجلد معين"""
        folder_path = self.public_dir / folder_name
        
        if not folder_path.exists():
            self._log(f"❌ المجلد غير موجود: {folder_path}")
            return 0, 0, 0
        
        self._log(f"\n{'='*70}")
        self._log(f"📁 معالجة مجلد: {folder_name}")
        self._log(f"{'='*70}\n")
        
        if folder_name not in self.mapping:
            self._log(f"⚠️  لا توجد خريطة للمجلد: {folder_name}")
            return 0, 0, 0
        
        folder_mapping = self.mapping[folder_name]
        renamed = 0
        failed = 0
        skipped = 0
        
        for old_name, info in folder_mapping.items():
            new_name = info['new']
            old_path = folder_path / old_name
            new_path = folder_path / new_name
            
            # تجاهل إذا كان الاسم الجديد موجوداً بالفعل
            if new_path.exists():
                self._log(f"⏭️  تم التجاهل (موجود): {new_name}")
                skipped += 1
                continue
            
            # تجاهل إذا كان الملف الأصلي غير موجود
            if not old_path.exists():
                self._log(f"⚠️  ملف غير موجود: {old_name}")
                failed += 1
                continue
            
            try:
                # إعادة التسمية
                shutil.move(str(old_path), str(new_path))
                self._log(f"✅ {old_name:50} → {new_name}")
                renamed += 1
            except Exception as e:
                self._log(f"❌ خطأ: {old_name}")
                self._log(f"   {str(e)}")
                failed += 1
        
        self._log(f"\n📊 ملخص {folder_name}:")
        self._log(f"   ✅ تمت إعادة التسمية: {renamed}")
        self._log(f"   ❌ فشل: {failed}")
        self._log(f"   ⏭️  تم التجاهل: {skipped}")
        
        return renamed, failed, skipped
    
    def verify_images(self, folder_name: str) -> Dict:
        """التحقق من صور المجلد"""
        folder_path = self.public_dir / folder_name
        
        if not folder_path.exists():
            return {"exists": False, "count": 0}
        
        # عد الصور
        image_count = len(list(folder_path.glob('*.jpg'))) + \
                     len(list(folder_path.glob('*.jpeg'))) + \
                     len(list(folder_path.glob('*.png'))) + \
                     len(list(folder_path.glob('*.webp'))) + \
                     len(list(folder_path.glob('*.avif')))
        
        return {
            "exists": True,
            "count": image_count,
            "path": str(folder_path)
        }
    
    def generate_verification_report(self) -> str:
        """توليد تقرير التحقق"""
        report = "\n" + "="*70 + "\n"
        report += "📋 تقرير التحقق من الصور\n"
        report += "="*70 + "\n\n"
        
        total_images = 0
        
        for folder in ['img', 'newphoto']:
            verification = self.verify_images(folder)
            folder_name = f"public/{folder}"
            
            if verification['exists']:
                report += f"📁 {folder_name}\n"
                report += f"   ✓ الملف موجود\n"
                report += f"   📊 عدد الصور: {verification['count']}\n"
                total_images += verification['count']
            else:
                report += f"❌ {folder_name} - غير موجود\n"
        
        report += f"\n{'='*70}\n"
        report += f"📊 إجمالي الصور: {total_images}\n"
        report += f"✅ الهدف: 166 صورة (109 في img + 57 في newphoto)\n"
        report += f"{'='*70}\n\n"
        
        return report
    
    def run(self, dry_run: bool = False) -> Dict:
        """تشغيل الأداة الكاملة"""
        self._log("="*70)
        self._log("🖼️  سكريبت إعادة تسمية الصور التلقائي")
        self._log("="*70)
        self._log("")
        
        if dry_run:
            self._log("⚠️  وضع اختبار (لن يتم تطبيق أي تغييرات)")
            self._log("")
        
        # التحقق المسبق
        self._log("🔍 التحقق المسبق...")
        verification = self.generate_verification_report()
        self._log(verification)
        
        if dry_run:
            self._log("⏭️  تخطي إعادة التسمية في وضع التجربة")
            self._log("")
        else:
            # إعادة تسمية الصور
            for folder in ['img', 'newphoto']:
                r, f, s = self.rename_folder_images(folder)
                self.renamed_count += r
                self.failed_count += f
                self.skipped_count += s
            
            self._log("\n" + "="*70)
            self._log("✨ ملخص النتائج النهائي")
            self._log("="*70)
            self._log(f"✅ تمت إعادة التسمية: {self.renamed_count}")
            self._log(f"❌ فشل: {self.failed_count}")
            self._log(f"⏭️  تم التجاهل: {self.skipped_count}")
            self._log("="*70)
        
        # التحقق البعدي
        self._log("\n🔍 التحقق البعدي...")
        verification = self.generate_verification_report()
        self._log(verification)
        
        # حفظ السجل
        self._save_log()
        self._log(f"\n📝 تم حفظ السجل في: {self.log_file}")
        
        return {
            "renamed": self.renamed_count,
            "failed": self.failed_count,
            "skipped": self.skipped_count,
            "total": self.renamed_count + self.failed_count + self.skipped_count
        }

# ============================================================================
# التشغيل الرئيسي
# ============================================================================

if __name__ == "__main__":
    import sys
    import argparse
    
    parser = argparse.ArgumentParser(
        description="🖼️  سكريبت إعادة تسمية الصور التلقائي"
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='تشغيل في وضع التجربة (بدون تعديلات فعلية)'
    )
    parser.add_argument(
        '--project-root',
        default='.',
        help='جذر المشروع (افتراضي: المجلد الحالي)'
    )
    
    args = parser.parse_args()
    
    try:
        renamer = ImageRenamer(args.project_root)
        results = renamer.run(dry_run=args.dry_run)
        
        print("\n" + "="*70)
        if args.dry_run:
            print("✅ انتهت عملية التجربة بنجاح")
            print("📌 ملاحظة: لم يتم تطبيق أي تغييرات")
            print("لتطبيق التغييرات فعلاً، شغّل بدون --dry-run:")
            print("  python3 apply_rename.py")
        else:
            print("✅ انتهت إعادة التسمية بنجاح!")
        print("="*70)
        
    except Exception as e:
        print(f"\n❌ خطأ: {str(e)}")
        sys.exit(1)
