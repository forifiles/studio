'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';
import { List } from 'lucide-react';

export default function MotorInsurancePage() {
  const [plateNumber, setPlateNumber] = useState('');

  const whyBuyPoints = [
    "Motor insurance protects you and your vehicle from financial loss because of an accident. It also covers repairs, parts and labour replacement, legal costs, death benefits, and other expenses resulting from a claim.",
    "It protects your vehicle from theft or damage by other drivers.",
    "It ensures you have access to medical care if you're injured in an accident. (Not all policies cover this). You are taking a huge risk if you own a car and have not yet purchased motor insurance.",
    "One big risk is that your vehicles can be stolen and never recovered. This would mean that you could be on the hook for the total cost of repairing or replacing your vehicle, including replacing all the parts and labour involved.",
    "It covers any damage that occurs during an accident between vehicles or pedestrians (such as hitting a pedestrian while driving).",
    "It also covers any injuries sustained by passengers riding in your vehicle at the time of an accident.",
    "You identify as a law-abiding citizen because having a motor insurance means you obey the mandatory rule.",
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-primary">Private Motor Insurance</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  This type of insurance protects you and your vehicle against accidents, theft, and vandalism. With private motor insurance, you can save on the cost of repairs caused by some occurrence, reducing the risk of financial loss in case of an incident.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start">
                   <Image
                      src={placeholderImages.motor.hero.src}
                      alt={placeholderImages.motor.hero.alt}
                      width={400}
                      height={300}
                      className="object-contain"
                      data-ai-hint={placeholderImages.motor.hero['data-ai-hint']}
                   />
                </div>
              </div>
              <div className="flex flex-col items-center">
                 <p className="text-center text-muted-foreground mb-4">Enter your plate number to discover the best policies and deals just for you!</p>
                <Card className="w-full max-w-md shadow-lg">
                  <CardContent className="p-8">
                     <h3 className="font-bold text-lg mb-4">Enter your plate number</h3>
                     <Input
                        type="text"
                        placeholder="Your plate number (e.g. ABC-123DE)"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        className="mb-4"
                     />
                     <Button className="w-full">Get Quote</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 font-headline">Why should I buy motor insurance?</h2>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <ul className="space-y-4">
                            {whyBuyPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                                    <p className="text-muted-foreground">{point}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center">
                         <Image
                            src={placeholderImages.motor.theft.src}
                            alt={placeholderImages.motor.theft.alt}
                            width={400}
                            height={300}
                            className="object-contain"
                            data-ai-hint={placeholderImages.motor.theft['data-ai-hint']}
                        />
                    </div>
                 </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
