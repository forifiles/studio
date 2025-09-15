import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BadgePercent, Bot, Columns, FileText, ShoppingCart } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-12 h-12 text-primary" />,
    title: 'Up to date prices',
    description: 'from leading insurers',
  },
  {
    icon: <ShoppingCart className="w-12 h-12 text-primary" />,
    title: 'One stop shop for all',
    description: 'your insurance needs',
  },
  {
    icon: <BadgePercent className="w-12 h-12 text-primary" />,
    title: 'Guaranteed best',
    description: 'value for your money',
  },
  {
    icon: <Bot className="w-12 h-12 text-primary" />,
    title: 'Support assistants ready',
    description: 'to help',
  },
  {
    icon: <Columns className="w-12 h-12 text-primary" />,
    title: 'Side by side comparisons',
    description: 'from top insurers',
  },
];

const BestPlace = () => {
  return (
    <section id="best-place" className="py-12 md:py-20 bg-white text-black">
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
