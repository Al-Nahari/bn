'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  image: string;
  description: string;
  alt: string;
  type?: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  title: string;
}

export default function GalleryLightbox({ images, title }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToNext();
      if (e.key === 'ArrowRight') goToPrevious();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, closeLightbox, goToNext, goToPrevious]);

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        role="list"
        aria-label={`معرض صور ${title}`}
      >
        {images.map((img, index) => (
          <button
            key={`${img.image}-${index}`}
            type="button"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md cursor-pointer group text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setSelectedIndex(index)}
            aria-label={`فتح صورة: ${img.description}`}
          >
            <Image
              src={img.image}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end gap-1.5 p-4">
              {img.type && (
                <span className="self-start rounded-full bg-coffee-medium/95 px-2.5 py-0.5 text-xs font-medium text-white">
                  {img.type}
                </span>
              )}
              <p className="text-white text-sm font-medium line-clamp-2">{img.description}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`معاينة صورة: ${images[selectedIndex].description}`}
          onClick={closeLightbox}
        >
          <div
            className="relative flex w-full max-w-5xl max-h-[92vh] flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-0 left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
              aria-label="إغلاق المعاينة"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative min-h-[50vh] flex-1 rounded-xl overflow-hidden bg-black/40">
              <Image
                src={images[selectedIndex].image}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>

            <div className="mt-4 text-center text-white shrink-0">
              {images[selectedIndex].type && (
                <p className="text-sm text-coffee-light font-medium mb-1">
                  {images[selectedIndex].type}
                </p>
              )}
              <p className="text-lg font-semibold">{images[selectedIndex].description}</p>
              <p className="text-sm text-white/60 mt-1">
                {selectedIndex + 1} من {images.length}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 gap-3 shrink-0">
              <button
                type="button"
                onClick={goToPrevious}
                className="bg-white/15 hover:bg-white/25 text-white p-3 rounded-full transition-colors"
                aria-label="الصورة السابقة"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2 overflow-x-auto flex-1 px-2 py-1 scrollbar-thin">
                {images.map((thumb, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      index === selectedIndex
                        ? 'border-white ring-2 ring-white/50'
                        : 'border-white/25 hover:border-white/50 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`الانتقال إلى صورة ${index + 1}`}
                    aria-current={index === selectedIndex ? 'true' : undefined}
                  >
                    <Image
                      src={thumb.image}
                      alt=""
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="bg-white/15 hover:bg-white/25 text-white p-3 rounded-full transition-colors"
                aria-label="الصورة التالية"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
