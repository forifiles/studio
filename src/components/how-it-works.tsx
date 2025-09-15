import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path d="M29.5 22h-9c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-9" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.5 28h10M22.5 32h10M22.5 36h5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 18h6v6" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 36l14-14" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Select an Insurance Type',
    description: 'Once you’ve accessed the website, select an insurance type of your choice from the various categories.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path d="M28 22H18c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 28h8M20 32h8M20 36h4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 22H32c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V24c0-1.1-.9-2-2-2z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 28h6M34 32h6M34 36h2" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Choose a Type of Insurance',
    description: 'The type of insurance covers vary according to the insurance type selected.',
  },
  {
    icon: (
       <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path d="M20 34h24M20 34c-2-4-2-8 0-12" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 34c2-4 2-8 0-12" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 22l-2 4h24l-2-4" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 20v4" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 34v-4a2 2 0 0 0-2-2h-2" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 34v-4a2 2 0 0 1 2-2h2" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="22" y="30" width="4" height="4" rx="1" fill="#FBBF24"/>
        <rect x="38" y="30" width="4" height="4" rx="1" fill="#FBBF24"/>
      </svg>
    ),
    title: 'Select an Offer',
    description: 'Once you are able to view offers from our various partners, proceed to choose what suits you best.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path d="M39 29h-9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 29v-3a3 3 0 0 1 3-3h5" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 35h9" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 39l-2-6" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 25l-5 4" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
