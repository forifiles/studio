import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const features = [
  {
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="20"
          y="40"
          width="60"
          height="30"
          rx="2"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <rect
          x="25"
          y="45"
          width="50"
          height="20"
          rx="1"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <circle cx="50" cy="55" r="5" fill="#F59E0B" />
        <path
          d="M48 52v6M52 52v6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M48 52h4" stroke="white" strokeWidth="1.5" />
        <rect
          x="15"
          y="35"
          width="60"
          height="30"
          rx="2"
          transform="rotate(-5 15 35)"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <rect
          x="25"
          y="30"
          width="60"
          height="30"
          rx="2"
          transform="rotate(-10 25 30)"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      </svg>
    ),
    title: 'Up to date prices',
    description: 'from leading insurers',
  },
  {
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 75V45h50v30"
          stroke="#4A5568"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 75h60"
          stroke="#4A5568"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 45V35c0-2.76 2.24-5 5-5h30c2.76 0 5 2.24 5 5v10"
          stroke="#4A5568"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 40h60l-5-15H25L20 40z"
          fill="#F59E0B"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="40"
          y="55"
          width="20"
          height="20"
          fill="white"
          stroke="#4A5568"
          strokeWidth="2"
        />
        <path d="M48 62v6M52 62v6M48 62h4" stroke="#F59E0B" strokeWidth="1.5" />
      </svg>
    ),
    title: 'One stop shop for all',
    description: 'your insurance needs',
  },
  {
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20L25 35v30c0 10 10 15 25 15s25-5 25-15V35L50 20z"
          stroke="#4A5568"
          strokeWidth="2"
          fill="#F59E0B"
          fillOpacity="0.2"
        />
        <path
          d="M40 52l5 5 10-10"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M70 40c0-5-2-10-5-13l-3 4c2 2 4 6 4 9 3 5 3 10 0 15l3 4c3-3 5-8 5-14z"
          fill="#4A5568"
        />
        <path
          d="M72 45v-5c0-2-1-4-2-5l-5-3c-3-2-7-2-10 0l-5 3c-1 1-2 3-2 5v5l-5 5c-3 3-3 8 0 11l5 5h5c3 0 5-1 7-3l3-3 5-5c3-3 3-8 0-11l-5-5z"
          transform="translate(10, 5) scale(0.6)"
          fill="#4A5568"
        />
        <path
          d="M70 45v-5c0-2-1-4-2-5l-5-3c-3-2-7-2-10 0l-5 3c-1 1-2 3-2 5v5l-5 5c-3 3-3 8 0 11l5 5h5c3 0 5-1 7-3l3-3 5-5c3-3 3-8 0-11l-5-5z"
          transform="translate(12, 7) scale(0.6)"
          fill="white"
        />
        <path
          d="M68 40a5 5 0 013 4v2"
          stroke="#4A5568"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Guaranteed best',
    description: 'value for your money',
  },
  {
    icon: (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M65 35C73.2843 35 80 41.7157 80 50C80 58.2843 73.2843 65 65 65" stroke="#F59E0B" stroke-width="2"/>
            <path d="M60 40C68.2843 40 75 46.7157 75 55C75 63.2843 68.2843 70 60 70" stroke="#4A5568" stroke-width="2" stroke-dasharray="4 4"/>
            <path d="M50 75C58.2843 75 65 68.2843 65 60C65 51.7157 58.2843 45 50 45C41.7157 45 35 51.7157 35 60C35 68.2843 41.7157 75 50 75Z" fill="#F59E0B" fill-opacity="0.2"/>
            <path d="M50 75C58.2843 75 65 68.2843 65 60C65 51.7157 58.2843 45 50 45C41.7157 45 35 51.7157 35 60C35 68.2843 41.7157 75 50 75Z" stroke="#4A5568" stroke-width="2"/>
            <path d="M50 45V35" stroke="#4A5568" stroke-width="2" stroke-linecap="round"/>
            <path d="M50 30L55 35L45 35L50 30Z" fill="#4A5568"/>
            <path d="M50 62C52.2091 62 54 60.2091 54 58C54 55.7909 52.2091 54 50 54C47.7909 54 46 55.7909 46 58C46 60.2091 47.7909 62 50 62Z" fill="#4A5568"/>
            <path d="M40 70C40 67.2386 44.4772 65 50 65C55.5228 65 60 67.2386 60 70" stroke="#4A5568" stroke-width="2"/>
        </svg>
    ),
    title: 'Support assistants ready',
    description: 'to help',
  },
  {
    icon: (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="40" height="50" rx="2" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="2"/>
            <path d="M35 40H65" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
            <path d="M35 50H55" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
            <path d="M35 60H60" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
            <rect x="40" y="25" width="40" height="50" rx="2" fill="#FEF3C7" stroke="#4A5568" stroke-width="2"/>
            <path d="M45 35H75" stroke="#4A5568" stroke-width="2" stroke-linecap="round"/>
            <path d="M45 45H65" stroke="#4A5568" stroke-width="2" stroke-linecap="round"/>
            <path d="M45 55H70" stroke="#4A5568" stroke-width="2" stroke-linecap="round"/>
            <path d="M75 65L85 60V70L75 65Z" fill="#4A5568"/>
            <path d="M25 65L15 70V60L25 65Z" fill="#4A5568"/>
        </svg>
    ),
    title: 'Side by side comparisons',
    description: 'from top insurers',
  },
];

const BestPlace = () => {
  return (
    <section id="best-place" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 font-headline">
          What makes <span className="text-primary">Compare Africa</span> the
          best place to buy insurance?
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                      <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-full relative">
                        <div
                          className="absolute inset-0 bg-gray-200 rounded-full transform scale-90"
                          style={{
                            clipPath:
                              'ellipse(50% 40% at 50% 50%)',
                          }}
                        ></div>
                        <div className="relative z-10">{feature.icon}</div>
                      </div>
                      <h3 className="font-semibold font-headline text-lg mt-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default BestPlace;
