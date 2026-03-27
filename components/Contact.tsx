'use client';

import { useState } from 'react';
import { companyInfo, services } from '@/lib/data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
    setFormData({ name: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-muted via-white to-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">تواصل معنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            اتصل بنا اليوم
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا للحصول على استشارة مجانية أو طلب خدمة
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone */}
              <a
                href={`tel:${companyInfo.phone}`}
                className="group block bg-white p-6 rounded-2xl border-2 border-border hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-primary group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">اتصل الآن</p>
                    <p className="font-bold text-foreground text-xl group-hover:text-primary transition-colors">
                      {companyInfo.phone}
                    </p>
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white p-6 rounded-2xl border-2 border-border hover:border-green-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-green-500 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">تواصل عبر الواتساب</p>
                    <p className="font-bold text-foreground text-xl group-hover:text-green-500 transition-colors">
                      {companyInfo.whatsapp}
                    </p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <div className="group bg-white p-6 rounded-2xl border-2 border-border hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-primary group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">البريد الإلكتروني</p>
                    <p className="font-bold text-foreground text-xl group-hover:text-primary transition-colors">
                      {companyInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group bg-white p-6 rounded-2xl border-2 border-border hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-primary group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">العنوان</p>
                    <p className="font-bold text-foreground text-xl group-hover:text-primary transition-colors">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group bg-white p-6 rounded-2xl border-2 border-border hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-primary group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">ساعات العمل</p>
                    <p className="font-bold text-foreground text-xl group-hover:text-primary transition-colors">
                      {companyInfo.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-3xl border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    أرسل لنا رسالة
                  </h3>
                  <p className="text-muted-foreground">
                    نحن هنا لمساعدتك..fill out the form below and we'll get back to you shortly.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-muted/50"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      رقم الهاتف <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-muted/50"
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="mb-6">
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    الخدمة المطلوبة
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-muted/50"
                  >
                    <option value="">اختر الخدمة</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-5 py-4 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none bg-muted/50"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}