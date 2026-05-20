/** قواعد تصنيف الصور حسب اسم الملف — مشتركة بين newphoto و img */

export function normalize(text) {
  return text
    .replace(/-/g, ' ')
    .replace(/مضلات/g, 'مظلات')
    .replace(/مضلان/g, 'مظلات')
    .replace(/مضله/g, 'مظلة')
    .replace(/mzlat/gi, 'مظلات')
    .replace(/سندوش/g, 'ساندويش')
    .replace(/ساندوتش/g, 'ساندويش')
    .replace(/حدايق/g, 'حدائق')
    .replace(/خارجه/g, 'خارجية')
    .replace(/بلاستيكيه/g, 'بلاستيكية')
    .replace(/قراميد/g, 'قرميد')
    .replace(/\.+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseType(name) {
  const checks = [
    ['هناجر', 'هناجر ومستودعات'],
    ['مستودعات', 'هناجر ومستودعات'],
    ['ساندويش', 'ساندويش بنل'],
    ['سندوش', 'ساندويش بنل'],
    ['غرف', 'غرف ساندويش بنل'],
    ['قرميد', 'قرميد'],
    ['ليزر', 'سواتر ليزر'],
    ['بلاستيك', 'سواتر بلاستيك'],
    ['بديل الخشب', 'سواتر بديل الخشب'],
    ['سواتر', 'سواتر'],
    ['ساتر', 'سواتر'],
    ['برجول', 'برجولات وجلسات'],
    ['جلسات', 'جلسات خارجية'],
    ['جلسه', 'جلسات خارجية'],
    ['بيوت شعر', 'بيوت شعر'],
    ['شعر', 'بيوت شعر'],
    ['تنسيق', 'تنسيق حدائق'],
    ['حدائق', 'تنسيق حدائق'],
    ['مدارس', 'مظلات مدارس'],
    ['ساحات', 'مظلات مدارس'],
    ['مسابح', 'مظلات مسابح'],
    ['مسبح', 'مظلات مسابح'],
    ['swim', 'مظلات مسابح'],
    ['هرميه', 'مظلات هرمية'],
    ['هرمية', 'مظلات هرمية'],
    ['مقوسه', 'مظلات مقوسة'],
    ['مقوسة', 'مظلات مقوسة'],
    ['كلادينج', 'مظلات كلادينج'],
    ['ممرات', 'مظلات ممرات'],
    ['تضليل', 'تضليل ممرات'],
    ['شد انشائي', 'مظلات شد إنشائي'],
    ['شد إنشائي', 'مظلات شد إنشائي'],
    ['متحرك', 'مظلات متحركة'],
    ['متحركة', 'مظلات متحركة'],
    ['سيارات', 'مظلات سيارات'],
    ['سيارت', 'مظلات سيارات'],
    ['مواقف', 'مظلات مواقف'],
    ['اسطح', 'أسطح ساندويش بنل'],
    ['أسطح', 'أسطح ساندويش بنل'],
    ['مظلات', 'مظلات'],
  ];
  for (const [key, type] of checks) {
    if (name.includes(key)) return type;
  }
  if (/picsart/i.test(name)) return 'أعمال متنوعة';
  return null;
}

export function getSlug(name) {
  if (/هناجر|مستودعات/.test(name)) return 'hanajer-w-mastoudat-riyadh';
  if (/ساندويش|سندوش|ساندوتش|بنل/.test(name) && /غرف|ملاحق/.test(name))
    return 'ghoraf-sandwich-panel-riyadh';
  if (/ساندويش|سندوش|ساندوتش|بنل|اسطح|أسطح/.test(name))
    return 'asatih-sandwich-panel-riyadh';
  if (/قرميد|قراميد/.test(name)) return 'qaramid-riyadh';
  if (/ليزر/.test(name)) return 'sawatr-laser-riyadh';
  if (/بلاستيك|بديل الخشب/.test(name)) return 'sawatr-plastic-riyadh';
  if (/قماش/.test(name)) return 'sawatr-qumash-riyadh';
  if (/سواتر|ساتر/.test(name)) return 'sawatr-hadid-riyadh';
  if (/بيوت شعر|بيت شعر|خيم/.test(name)) return 'buyut-sha3r-riyadh';
  if (/تنسيق|حدائق|حدايق/.test(name) && !/جلسات|برجول|جلسه/.test(name))
    return 'tansiq-hadaiq-riyadh';
  if (/برجول|جلسات|جلسه/.test(name)) return 'jalsat-borjolat-riyadh';
  if (/مدارس|ساحات/.test(name)) return 'mazallat-madaris-riyadh';
  if (/مسابح|مسبح|swim|لكسان/.test(name)) return 'mazallat-masabi-riyadh';
  if (/هرميه|هرمية|makhruti/.test(name)) return 'mazallat-haramiya-riyadh';
  if (/مقوسه|مقوسة/.test(name)) return 'mazallat-maqousa-riyadh';
  if (/شد انشائي|شد إنشائي/.test(name)) return 'mazallat-shad-inshai-riyadh';
  if (/متحرك|متحركة/.test(name)) return 'mazallat-mutaharrika-riyadh';
  if (/كلادينج/.test(name)) return 'mazallat-shad-inshai-riyadh';
  if (/ممرات|تضليل/.test(name)) return 'mazallat-maqousa-riyadh';
  if (/سيارات|سيارت|مواقف/.test(name)) return 'mazallat-sayarat-riyadh';
  if (/مظلات|mzlat/i.test(name)) return 'mazallat-sayarat-riyadh';
  if (/picsart/i.test(name)) return 'jalsat-borjolat-riyadh';
  return null;
}

export function buildAlt(description, type) {
  return `تركيب ${description} في الرياض — ${type}`;
}

export function labelFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  const label = normalize(base);
  if (label.length > 2) return label;
  return 'مشروع منفذ';
}
