'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getInsuranceRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  age: z.coerce.number().min(18, 'Must be at least 18').max(100),
  income: z.coerce.number().min(0, 'Income cannot be negative'),
  familyStatus: z.enum(['single', 'married', 'married_with_children', 'single_parent']),
  coverageNeeds: z.string().min(10, 'Please describe your needs'),
  insuranceType: z.enum(['life', 'motor', 'travel', 'health', 'education']),
  marketConditions: z.string().min(10, 'Please describe market conditions'),
});

type InsuranceFormProps = {
  setRecommendations: (recommendations: InsuranceRecommendationOutput | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

const InsuranceForm = ({ setRecommendations, setIsLoading, isLoading }: InsuranceFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      income: 50000,
      familyStatus: 'single',
      coverageNeeds: 'Looking for comprehensive coverage with a balance of cost and benefits.',
      insuranceType: 'health',
      marketConditions: 'Stable market with competitive pricing from various providers.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);

    const userData = `Age: ${values.age}, Annual Income: $${values.income}, Family Status: ${values.familyStatus}, Coverage Needs: ${values.coverageNeeds}`;
    
    try {
      const result = await getInsuranceRecommendations({
        userData,
        insuranceType: values.insuranceType,
        marketConditions: values.marketConditions,
      });
      setRecommendations(result);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: e instanceof Error ? e.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Get Your AI Recommendation</CardTitle>
        <CardDescription>Fill in your details to receive personalized insurance options.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="familyStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="married_with_children">Married with Children</SelectItem>
                        <SelectItem value="single_parent">Single Parent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insuranceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="life">Life Insurance</SelectItem>
                        <SelectItem value="motor">Motor Insurance</SelectItem>
                        <SelectItem value="travel">Travel Insurance</SelectItem>
                        <SelectItem value="health">Health Insurance</SelectItem>
                        <SelectItem value="education">Education Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="coverageNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage Needs</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe what you are looking for..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="marketConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Conditions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Stable market with competitive pricing..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Get Recommendations'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InsuranceForm;
