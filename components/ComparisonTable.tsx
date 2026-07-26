import type { MaterialComparison } from '@/lib/materials';

export default function ComparisonTable({
  materials,
  title,
}: {
  materials: MaterialComparison[];
  title: string;
}) {
  if (!materials.length) return null;

  return (
    <section className="py-14 md:py-16 bg-white" aria-labelledby="comparison-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 id="comparison-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {title}
          </h2>

          {/* جدول لشاشات الحاسوب */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-coffee-medium/15">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gradient-desert">
                  <th className="p-4 font-bold text-foreground">الخامة</th>
                  <th className="p-4 font-bold text-foreground">المميزات</th>
                  <th className="p-4 font-bold text-foreground">العيوب</th>
                  <th className="p-4 font-bold text-foreground">الاستخدام الأمثل</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => (
                  <tr key={m.id} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                    <td className="p-4 font-semibold text-foreground align-top whitespace-nowrap">{m.name}</td>
                    <td className="p-4 text-muted-foreground align-top">
                      <ul className="space-y-1 list-disc pr-4">
                        {m.pros.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 text-muted-foreground align-top">
                      <ul className="space-y-1 list-disc pr-4">
                        {m.cons.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 text-muted-foreground align-top">{m.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* بطاقات للجوال */}
          <div className="md:hidden space-y-4">
            {materials.map((m) => (
              <div key={m.id} className="rounded-2xl border border-coffee-medium/15 p-5 bg-muted/10">
                <h3 className="font-bold text-foreground mb-3">{m.name}</h3>
                <p className="text-sm font-semibold text-success mb-1">المميزات</p>
                <ul className="space-y-1 list-disc pr-4 text-sm text-muted-foreground mb-3">
                  {m.pros.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-coffee-dark mb-1">العيوب</p>
                <ul className="space-y-1 list-disc pr-4 text-sm text-muted-foreground mb-3">
                  {m.cons.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
                <p className="text-sm text-coffee-medium font-medium">الأنسب لـ: {m.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
