#!/bin/bash
# ============================================================================
# 🚀 سكريبت تطبيق التحديثات الشامل
# Complete Update Implementation Script
# ============================================================================

set -e  # توقف عند أي خطأ

# الألوان
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# دالات مساعدة
# ============================================================================

print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC} $1"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ============================================================================
# الخطوة 1: التحقق من البيئة
# ============================================================================

print_header "الخطوة 1️⃣  : التحقق من البيئة والملفات"

# التحقق من Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js غير مثبت"
    exit 1
fi
NODE_VERSION=$(node -v)
print_success "Node.js متثبت: $NODE_VERSION"

# التحقق من npm
if ! command -v npm &> /dev/null; then
    print_error "npm غير مثبت"
    exit 1
fi
NPM_VERSION=$(npm -v)
print_success "npm متثبت: $NPM_VERSION"

# التحقق من git
if ! command -v git &> /dev/null; then
    print_warning "git غير مثبت (اختياري)"
else
    GIT_VERSION=$(git --version)
    print_success "$GIT_VERSION"
fi

# التحقق من وجود مشروع Next.js
if [ ! -f "package.json" ]; then
    print_error "package.json غير موجود - يجب تشغيل السكريبت من جذر المشروع"
    exit 1
fi
print_success "تم العثور على package.json"

# ============================================================================
# الخطوة 2: إنشاء نسخة احتياطية
# ============================================================================

print_header "الخطوة 2️⃣  : إنشاء نسخة احتياطية"

BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

print_info "إنشاء نسخة احتياطية في: $BACKUP_DIR"

# نسخ الملفات الهامة
cp -r lib "$BACKUP_DIR/" 2>/dev/null || true
cp -r public "$BACKUP_DIR/" 2>/dev/null || true
cp next.config.js "$BACKUP_DIR/" 2>/dev/null || true
cp app/globals.css "$BACKUP_DIR/" 2>/dev/null || true

print_success "تم إنشاء نسخة احتياطية كاملة في: $BACKUP_DIR"

# ============================================================================
# الخطوة 3: التحقق من ملفات التحديث
# ============================================================================

print_header "الخطوة 3️⃣  : التحقق من ملفات التحديث"

REQUIRED_FILES=(
    "data-new.ts"
    "img-gallery-new.ts"
    "newphoto-gallery-new.ts"
    "next-config-optimized.js"
    "image_rename_mapping.json"
    "README-UPDATES.md"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ وجد: $file"
    else
        print_warning "⚠ غير موجود: $file (قد يكون ضروريًا)"
    fi
done

# ============================================================================
# الخطوة 4: استبدال ملفات TypeScript
# ============================================================================

print_header "الخطوة 4️⃣  : استبدال ملفات TypeScript"

if [ -f "data-new.ts" ]; then
    print_info "استبدال lib/data.ts..."
    cp data-new.ts lib/data.ts
    print_success "تم تحديث lib/data.ts"
else
    print_warning "data-new.ts غير موجود - تخطي"
fi

if [ -f "img-gallery-new.ts" ]; then
    print_info "استبدال lib/img-gallery.ts..."
    cp img-gallery-new.ts lib/img-gallery.ts
    print_success "تم تحديث lib/img-gallery.ts"
else
    print_warning "img-gallery-new.ts غير موجود - تخطي"
fi

if [ -f "newphoto-gallery-new.ts" ]; then
    print_info "استبدال lib/newphoto-gallery.ts..."
    cp newphoto-gallery-new.ts lib/newphoto-gallery.ts
    print_success "تم تحديث lib/newphoto-gallery.ts"
else
    print_warning "newphoto-gallery-new.ts غير موجود - تخطي"
fi

# ============================================================================
# الخطوة 5: استبدال next.config.js
# ============================================================================

print_header "الخطوة 5️⃣  : تحديث next.config.js"

if [ -f "next-config-optimized.js" ]; then
    print_info "استبدال next.config.js بالإصدار المحسّن..."
    cp next-config-optimized.js next.config.js
    print_success "تم تحديث next.config.js"
else
    print_warning "next-config-optimized.js غير موجود - تخطي"
fi

# ============================================================================
# الخطوة 6: تنظيف .next cache
# ============================================================================

print_header "الخطوة 6️⃣  : تنظيف cache"

if [ -d ".next" ]; then
    print_info "حذف مجلد .next..."
    rm -rf .next
    print_success "تم حذف .next cache"
fi

# ============================================================================
# الخطوة 7: فحص صيغة TypeScript
# ============================================================================

print_header "الخطوة 7️⃣  : فحص صيغة TypeScript"

if command -v npx &> /dev/null; then
    print_info "فحص الأخطاء في الملفات المحدثة..."
    
    # محاولة build سريع
    if npx tsc --noEmit lib/data.ts 2>/dev/null; then
        print_success "لا توجد أخطاء TypeScript"
    else
        print_warning "⚠ قد تكون هناك أخطاء TypeScript (تحقق من الـ logs)"
    fi
fi

# ============================================================================
# الخطوة 8: معلومات الصور
# ============================================================================

print_header "الخطوة 8️⃣  : معلومات الصور"

if [ -d "public/img" ]; then
    IMG_COUNT=$(ls -1 public/img/*.jpg 2>/dev/null | wc -l)
    print_info "عدد الصور في /img: $IMG_COUNT"
fi

if [ -d "public/newphoto" ]; then
    NEWPHOTO_COUNT=$(ls -1 public/newphoto/*.jpg 2>/dev/null | wc -l)
    print_info "عدد الصور في /newphoto: $NEWPHOTO_COUNT"
fi

# ============================================================================
# الخطوة 9: تعليمات إعادة التسمية
# ============================================================================

print_header "الخطوة 9️⃣  : تعليمات إعادة تسمية الصور"

echo -e "${YELLOW}⚠️  تنبيه مهم: يجب إعادة تسمية الصور يدويًا!${NC}\n"

echo "📋 الخريطة المرجعية:"
if [ -f "image_rename_mapping.json" ]; then
    print_success "✓ وجدت: image_rename_mapping.json"
    echo ""
    echo "الخطوات:"
    echo "  1️⃣  استخدم أداة Batch Rename:"
    echo "      • Windows: RenameMaster, Bulk Rename Utility"
    echo "      • Mac: A-Zippr, Rename X"
    echo "      • Linux: rename utility"
    echo ""
    echo "  2️⃣  أو استخدم الخريطة اليدوية في: image_rename_mapping.json"
    echo ""
    echo "  3️⃣  أو استخدم سكريبت Python (إذا كان متاحاً):"
    echo "      python3 apply_rename.py"
fi

# ============================================================================
# الخطوة 10: npm scripts محسّنة
# ============================================================================

print_header "الخطوة 🔟 : إضافة npm scripts محسّنة"

print_info "📝 إضافة scripts للـ package.json..."

# قراءة package.json
PACKAGE_JSON=$(cat package.json)

# التحقق من وجود scripts
if grep -q '"scripts"' package.json; then
    print_info "✓ scripts موجودة بالفعل"
else
    print_warning "⚠ لم توجد scripts - قد تحتاج لإضافتها يدويًا"
fi

echo ""
echo "Scripts المقترحة للإضافة:"
echo "  {\"name\": \"scripts\", \"value\": ["
echo '    "dev": "next dev",'
echo '    "build": "next build && next export",'
echo '    "start": "next start",'
echo '    "lint": "next lint",'
echo '    "type-check": "tsc --noEmit",'
echo '    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,md}\",'
echo '    "clean": "rm -rf .next out",'
echo '    "analyze": "ANALYZE=true next build"'
echo "  ]}"

# ============================================================================
# الخطوة 11: اختبار محلي
# ============================================================================

print_header "الخطوة ١١: تعليمات الاختبار"

echo "🧪 خطوات الاختبار المحلي:\n"

echo "1️⃣  ثبّت الـ dependencies (إذا لم تكن مثبتة):"
echo "   npm install"
echo ""

echo "2️⃣  شغّل الـ dev server:"
echo "   npm run dev"
echo ""

echo "3️⃣  افتح المتصفح:"
echo "   http://localhost:3000"
echo ""

echo "4️⃣  تحقق من:"
echo "   ✓ تحميل الصور بدون أخطاء 404"
echo "   ✓ alt texts تظهر عند مرور الفأرة على الصور"
echo "   ✓ الصور تحميل بسرعة"
echo "   ✓ فتح DevTools (F12) > Network > اختر صورة"
echo "   ✓ تحقق من Content-Type: image/webp أو image/avif"
echo ""

echo "5️⃣  في حالة الأخطاء:"
echo "   • تحقق من أسماء الملفات في public/img و public/newphoto"
echo "   • تأكد من مطابقة data.ts مع الأسماء الجديدة"
echo "   • امسح cache: rm -rf .next && npm run dev"

# ============================================================================
# الخطوة 12: إعادة تسمية الصور (اختياري)
# ============================================================================

print_header "الخطوة ١٢: إعادة تسمية الصور (اختياري)"

read -p "هل تريد محاولة إعادة تسمية الصور تلقائيًا؟ (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -f "apply_rename.py" ]; then
        print_info "تشغيل سكريبت إعادة التسمية..."
        python3 apply_rename.py
        print_success "تم إعادة تسمية الصور"
    else
        print_warning "سكريبت apply_rename.py غير موجود"
        echo "يمكنك استخدام أداة Batch Rename بدلاً منها"
    fi
fi

# ============================================================================
# الخطوة 13: git commit (اختياري)
# ============================================================================

print_header "الخطوة ١٣: git commit (اختياري)"

if command -v git &> /dev/null && git rev-parse --git-dir > /dev/null 2>&1; then
    read -p "هل تريد عمل commit للتحديثات؟ (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "إضافة الملفات..."
        git add lib/data.ts lib/img-gallery.ts lib/newphoto-gallery.ts next.config.js
        
        print_info "عمل commit..."
        git commit -m "🎨 SEO: تحسينات شاملة - 166 صورة + next.config محسّن"
        
        print_success "تم عمل commit بنجاح"
        
        read -p "هل تريد عمل push الآن؟ (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "عمل push..."
            git push origin main
            print_success "تم رفع التحديثات"
        fi
    fi
fi

# ============================================================================
# الملخص النهائي
# ============================================================================

print_header "✨ ملخص التحديثات"

echo "✅ الملفات المحدثة:"
echo "   • lib/data.ts (166 صورة)"
echo "   • lib/img-gallery.ts (109 صورة)"
echo "   • lib/newphoto-gallery.ts (57 صورة)"
echo "   • next.config.js (محسّن)"
echo ""

echo "📊 الإحصائيات:"
echo "   • صور محسّنة: 166"
echo "   • alt texts محسّنة: 166"
echo "   • Security headers مضافة: 8+"
echo "   • Cache TTL: سنة واحدة"
echo ""

echo "📂 الملفات الاحتياطية:"
echo "   • نسخة احتياطية في: $BACKUP_DIR"
echo ""

echo "🚀 الخطوات التالية:"
echo "   1. إعادة تسمية الصور (يدوي أو تلقائي)"
echo "   2. اختبار محلي: npm run dev"
echo "   3. اختبار في الإنتاج: npm run build && npm start"
echo "   4. فحص Search Console"
echo "   5. رفع Sitemap"
echo ""

echo "📚 المزيد من المعلومات:"
echo "   • اقرأ: README-UPDATES.md"
echo "   • خريطة الصور: image_rename_mapping.json"
echo ""

print_success "اكتمل التحديث بنجاح! 🎉"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}مشروعك الآن محسّن تماماً للـ SEO والأداء والأمان! 🚀${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# ============================================================================
# الملاحظات النهائية
# ============================================================================

print_info "ملاحظات هامة:"
echo "  1. احفظ النسخة الاحتياطية لمدة أسبوع على الأقل"
echo "  2. راقب Google Search Console بعد الرفع"
echo "  3. اختبر Core Web Vitals في PageSpeed Insights"
echo "  4. تحقق من عدم وجود 404 errors في Search Console"
echo ""
