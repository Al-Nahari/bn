import { services } from '@/lib/data';
import { projects } from '@/lib/projects';

export default function StatsCounter() {
  const stats = [
    { value: `${projects.length}+`, label: 'مشروع منفذ في معرض أعمالنا' },
    { value: `${services.length}`, label: 'خدمة متخصصة في المظلات والسواتر' },
    { value: '10+', label: 'سنوات خبرة في السوق السعودي' },
    { value: '24', label: 'ساعة — مدة الرد على طلب المعاينة' },
  ];

  return (
    <section className="py-10 md:py-14 bg-coffee-espresso" aria-label="إحصائيات الشركة">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
