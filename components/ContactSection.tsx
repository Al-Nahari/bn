import { companyInfo } from '@/lib/data';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-white scroll-mt-24"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-semibold text-coffee-medium mb-4">
            تواصل معنا
          </span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            اطلب عرض سعر مجاني
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            فريقنا جاهز لزيارة موقعك في الرياض وتقديم استشارة وعرض سعر غير ملزم خلال 24 ساعة.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <a
            href={`tel:${companyInfo.phone}`}
            className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-coffee-medium/15 bg-gradient-desert hover:border-coffee-medium/40 hover:shadow-lg transition-all"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-white shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </span>
            <div className="text-center">
              <p className="font-bold text-foreground text-lg">اتصال مباشر</p>
              <p className="text-coffee-medium font-semibold mt-1" dir="ltr">
                {companyInfo.phone}
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${companyInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-green-600/20 bg-green-50/50 hover:border-green-600/40 hover:shadow-lg transition-all"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            <div className="text-center">
              <p className="font-bold text-foreground text-lg">واتساب</p>
              <p className="text-green-700 font-semibold mt-1">رد سريع على استفساراتك</p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-coffee-medium/15 bg-muted/50 sm:col-span-2 lg:col-span-1">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coffee-dark/10 text-coffee-dark text-2xl" aria-hidden>
              📍
            </span>
            <div className="text-center">
              <p className="font-bold text-foreground text-lg">موقعنا</p>
              <p className="text-muted-foreground mt-1">{companyInfo.address}</p>
              <p className="text-sm text-muted-foreground mt-2">{companyInfo.workingHours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
