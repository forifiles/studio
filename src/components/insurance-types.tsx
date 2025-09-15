import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Car, GraduationCap, HeartHandshake, HeartPulse, Plane } from 'lucide-react';
import Link from 'next/link';

const insuranceTypes = [
  { name: 'Life Insurance', icon: HeartHandshake, href: '/products/life-insurance' },
  { name: 'Motor Insurance', icon: Car, href: '/products/motor-insurance' },
  { name: 'Travel Insurance', icon: Plane, href: '/products/travel-insurance' },
  { name: 'Health Insurance', icon: HeartPulse, href: '/products/health-insurance' },
  { name: 'Education Insurance', icon: GraduationCap, href: '/products/education-insurance' },
];

const InsuranceTypes = () => {
  return (
    <section id="insurance-types" className="py-12 md:py-20 -mt-20 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {insuranceTypes.map((type) => (
          <Link href={type.href} key={type.name} className="block">
            <Card className="text-center p-6 transition-all duration-300 hover:bg-primary/10 hover:-translate-y-2 cursor-pointer border-2 h-full bg-card shadow-lg">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                <type.icon className="w-12 h-12 text-primary" />
                <h3 className="font-semibold font-headline">{type.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InsuranceTypes;
