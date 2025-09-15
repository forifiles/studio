import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Files, LayoutList, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList className="w-12 h-12 text-primary" />,
    title: 'Select an Insurance Type',
    description: 'Once you’ve accessed the website, select an insurance type of your choice from the various categories.',
  },
  {
    icon: <Files className="w-12 h-12 text-primary" />,
    title: 'Choose a Type of Insurance',
    description: 'The type of insurance covers vary according to the insurance type selected.',
  },
  {
    icon: <LayoutList className="w-12 h-12 text-primary" />,
    title: 'Select an Offer',
    description: 'Once you are able to view offers from our various partners, proceed to choose what suits you best.',
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary" />,
    title: 'Make Your Payment',
    description: 'You can make payment by inputting your card details and signing up to save your information.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 font-headline">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-2 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                {step.icon}
              </CardHeader>
              <CardContent>
                <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
