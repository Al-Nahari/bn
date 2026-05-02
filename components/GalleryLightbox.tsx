'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  image: string;
  description: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  title: string;
}

export default function GalleryLightbox({ images, title }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={img.image}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white p-4 text-sm">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative flex-1 flex items-center justify-center bg-black/50 rounded-lg overflow-hidden">
              <Image
                src={images[selectedIndex].image}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="text-white mt-4 text-center">
              <p className="text-lg font-semibold mb-2">
                {images[selectedIndex].description}
              </p>
              <p className="text-sm text-gray-300">
                {selectedIndex + 1} من {images.length}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-4 gap-4">
              <button
                onClick={goToPrevious}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 overflow-x-auto flex-1 px-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      index === selectedIndex
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <Image
                      src={images[index].image}
                      alt={images[index].alt}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={goToNext}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
