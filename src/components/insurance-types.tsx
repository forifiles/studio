import { Card, CardContent } from '@/components/ui/card';
import { Car, GraduationCap, HeartHandshake, HeartPulse, Plane } from 'lucide-react';

const insuranceTypes = [
  { name: 'Life Insurance', icon: HeartHandshake },
  { name: 'Motor Insurance', icon: Car },
  { name: 'Travel Insurance', icon: Plane },
  { name: 'Health Insurance', icon: HeartPulse },
  { name: 'Education Insurance', icon: GraduationCap },
];

const InsuranceTypes = () => {
  return (
    <section id="insurance-types" className="py-12 md:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 font-headline">Covering All Your Needs</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Whatever stage of life you're in, we have a plan that fits. Explore our range of insurance products.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {insuranceTypes.map((type) => (
            <Card key={type.name} className="text-center p-6 transition-all duration-300 hover:bg-primary/10 hover:-translate-y-2 cursor-pointer border-2">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                <type.icon className="w-12 h-12 text-primary" />
                <h3 className="font-semibold font-headline">{type.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceTypes;
