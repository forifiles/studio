
'use client';

import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import placeholderImages from '@/lib/placeholder-images.json';

const HeroBackground = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on('select', onSelect);
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
            {placeholderImages.hero.map((image, index) => (
            <div
                key={index}
                className={cn(
                'relative min-w-full h-full transition-opacity duration-1000',
                { 'opacity-100': index === activeIndex, 'opacity-0': index !== activeIndex }
                )}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    data-ai-hint={image['data-ai-hint']}
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            ))}
        </div>
    </div>
  );
};

export default HeroBackground;
