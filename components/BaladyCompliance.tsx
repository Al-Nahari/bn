export default function BaladyCompliance() {
  return (
    <section className="py-10 md:py-12 bg-gradient-desert" aria-labelledby="balady-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-5 bg-white rounded-2xl border border-coffee-medium/15 p-6 md:p-8 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 id="balady-heading" className="text-lg md:text-xl font-bold text-foreground mb-2">
              تنفيذ ملتزم باشتراطات أمانة منطقة الرياض
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              نراعي عند تنفيذ المظلات الخارجية (كمظلات مواقف السيارات المطلة على الشارع) الأنظمة
              المعتمدة عبر منصة{' '}
              <a
                href="https://balady.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coffee-medium font-semibold underline underline-offset-2"
              >
                بلدي
              </a>{' '}
              من حيث الارتفاعات والمسافات النظامية، لتفادي أي مخالفات لاحقة وضمان تنفيذ آمن ومطابق
              للمواصفات.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
