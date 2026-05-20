'use client';

import { useMemo, useState } from 'react';
import GalleryLightbox from './GalleryLightbox';
import type { GalleryImage } from '@/lib/gallery';

interface GalleryBrowserProps {
  images: GalleryImage[];
  types: string[];
}

export default function GalleryBrowser({ images, types }: GalleryBrowserProps) {
  const [activeType, setActiveType] = useState<string>('الكل');

  const filteredImages = useMemo(() => {
    if (activeType === 'الكل') return images;
    return images.filter((img) => img.type === activeType);
  }, [activeType, images]);

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2 mb-10 p-4 rounded-2xl bg-white/70 border border-coffee-medium/10"
        role="tablist"
        aria-label="تصفية الصور حسب النوع"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeType === 'الكل'}
          onClick={() => setActiveType('الكل')}
          className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
            activeType === 'الكل'
              ? 'bg-gradient-primary text-white shadow-md scale-[1.02]'
              : 'bg-white text-foreground border border-coffee-medium/20 hover:border-coffee-medium/40 hover:bg-muted/50'
          }`}
        >
          الكل ({images.length})
        </button>
        {types.map((type) => {
          const count = images.filter((img) => img.type === type).length;
          return (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={activeType === type}
              onClick={() => setActiveType(type)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                activeType === type
                  ? 'bg-gradient-primary text-white shadow-md scale-[1.02]'
                  : 'bg-white text-foreground border border-coffee-medium/20 hover:border-coffee-medium/40 hover:bg-muted/50'
              }`}
            >
              {type} ({count})
            </button>
          );
        })}
      </div>

      {filteredImages.length > 0 ? (
        <GalleryLightbox images={filteredImages} title="معرض الأعمال" />
      ) : (
        <p className="text-center text-muted-foreground">لا توجد صور في هذا التصنيف.</p>
      )}
    </div>
  );
}
