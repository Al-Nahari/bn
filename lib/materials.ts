/**
 * مقارنة الخامات المستخدمة في المظلات والسواتر — محتوى وصفي عام (Industry-standard)
 * بدون أي أرقام أسعار مُختلقة. كل خدمة تختار المواد ذات الصلة عبر relevantMaterialIds.
 */

export interface MaterialComparison {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export const materials: MaterialComparison[] = [
  {
    id: 'pvc-fabric',
    name: 'قماش PVC مشدود',
    pros: ['خفيف الوزن وتركيب سريع', 'مقاوم للأشعة فوق البنفسجية والمطر', 'تشكيلة ألوان واسعة'],
    cons: ['عمر افتراضي أقل من الحديد أو الخشب', 'يحتاج تغيير القماش دورياً حسب الاستخدام'],
    bestFor: 'مواقف السيارات والمساحات الكبيرة التي تحتاج تغطية سريعة واقتصادية',
  },
  {
    id: 'iron-laser',
    name: 'حديد مجلفن / قص ليزر',
    pros: ['متانة عالية وعمر افتراضي طويل', 'مستوى أمان مرتفع للسواتر', 'تصاميم جمالية عبر القص بالليزر'],
    cons: ['يحتاج صيانة دورية للدهان لمنع الصدأ', 'أثقل وزناً ويحتاج أساسات أقوى'],
    bestFor: 'السواتر، الهناجر، والمستودعات التي تحتاج قوة إنشائية',
  },
  {
    id: 'wood-treated',
    name: 'خشب طبيعي / معالج (WPC)',
    pros: ['مظهر جمالي دافئ يناسب الحدائق والجلسات', 'عزل حراري جيد'],
    cons: ['يحتاج عناية دورية أكبر من الحديد', 'أكثر حساسية للرطوبة إذا لم يكن معالجاً جيداً'],
    bestFor: 'البرجولات وجلسات الحدائق الخارجية',
  },
  {
    id: 'polycarbonate',
    name: 'لكسان (بولي كربونيت)',
    pros: ['شفاف ويسمح بمرور الإضاءة الطبيعية', 'مقاوم للكسر أكثر من الزجاج العادي', 'يعزل جزءاً من الحرارة والأشعة'],
    cons: ['سعره أعلى من القماش', 'يحتاج تنظيفاً دورياً للحفاظ على الشفافية'],
    bestFor: 'مظلات المسابح ومداخل الفلل',
  },
];

/** يربط كل خدمة بالخامات الأكثر صلة بها لعرضها في جدول المقارنة */
export const serviceMaterialsMap: Record<string, string[]> = {
  'mazallat-sayarat-riyadh': ['pvc-fabric', 'iron-laser', 'polycarbonate'],
  'mazallat-mutaharrika-riyadh': ['pvc-fabric', 'iron-laser'],
  'mazallat-haramiya-riyadh': ['iron-laser', 'pvc-fabric'],
  'mazallat-shad-inshai-riyadh': ['pvc-fabric', 'iron-laser'],
  'mazallat-maqousa-riyadh': ['pvc-fabric', 'iron-laser'],
  'mazallat-madaris-riyadh': ['pvc-fabric', 'iron-laser'],
  'mazallat-masabi-riyadh': ['polycarbonate', 'iron-laser'],
  'sawatr-hadid-riyadh': ['iron-laser'],
  'sawatr-laser-riyadh': ['iron-laser'],
  'sawatr-qumash-riyadh': ['pvc-fabric'],
  'sawatr-plastic-riyadh': ['wood-treated', 'iron-laser'],
  'jalsat-borjolat-riyadh': ['wood-treated', 'iron-laser', 'polycarbonate'],
  'tansiq-hadaiq-riyadh': ['wood-treated', 'polycarbonate', 'pvc-fabric'],
  'ghoraf-sandwich-panel-riyadh': ['iron-laser'],
  'hanajer-w-mastoudat-riyadh': ['iron-laser'],
  'buyut-sha3r-riyadh': ['pvc-fabric', 'iron-laser'],
  'asatih-sandwich-panel-riyadh': ['iron-laser'],
  'qaramid-riyadh': ['iron-laser', 'wood-treated'],
};

export function getMaterialsForService(serviceId: string): MaterialComparison[] {
  const ids = serviceMaterialsMap[serviceId];
  if (!ids) return materials.slice(0, 3); // fallback: أشهر 3 خامات
  return materials.filter((m) => ids.includes(m.id));
}
