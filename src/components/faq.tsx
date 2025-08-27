import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the AI recommendation work?',
    answer: 'Our AI analyzes your profile details like age, income, and family status against current market data. It then identifies the top three insurance policies that offer the best value and coverage for your specific needs.',
  },
  {
    question: 'Is my personal data secure?',
    answer: 'Absolutely. We prioritize your privacy and use industry-standard encryption to protect your data. We only use your information to generate recommendations and never share it with third parties without your consent.',
  },
  {
    question: 'What types of insurance can I get recommendations for?',
    answer: 'We provide recommendations for a wide range of insurance types, including Life, Health, Motor (Auto), Travel, and Education insurance. You can select the type you are interested in via the form.',
  },
  {
    question: 'How often are the market conditions updated?',
    answer: 'Our system continuously monitors the insurance market. The "market conditions" information reflects the most current trends, ensuring your recommendations are timely and relevant.',
  },
];

const Faq = () => {
  return (
    <section id="faq" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 font-headline">Frequently Asked Questions</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Have questions? We've got answers. Here are some of the most common questions we receive.
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-headline text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
