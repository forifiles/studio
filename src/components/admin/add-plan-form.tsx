'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addInsurancePlan } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { InsurancePlan } from '@/lib/types';

const planSchema = z.object({
  name: z.string().min(3, 'Plan name is required.'),
  provider: z.string().min(2, 'Provider name is required.'),
  description: z.string().min(10, 'Description is required.'),
  premium: z.coerce.number().min(0, 'Premium must be a positive number.'),
  coverage: z.string().min(3, 'Coverage details are required.'),
  exclusions: z.string().min(3, 'Exclusion details are required.'),
});

type AddPlanFormProps = {
  onPlanAdded: () => void;
};

const AddPlanForm = ({ onPlanAdded }: AddPlanFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: '',
      provider: '',
      description: '',
      premium: 0,
      coverage: '',
      exclusions: '',
    },
  });

  async function onSubmit(values: z.infer<typeof planSchema>) {
    setIsLoading(true);
    try {
      const planData: Omit<InsurancePlan, 'id'> = {
        ...values,
        coverage: values.coverage.split(',').map(s => s.trim()),
        exclusions: values.exclusions.split(',').map(s => s.trim()),
      };
      await addInsurancePlan(planData);
      toast({
        title: 'Plan Added!',
        description: 'The new insurance plan has been successfully created.',
      });
      form.reset();
      onPlanAdded();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Could not add the new plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Comprehensive Auto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Provider</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AXA Mansard" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="premium"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Premium</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 50000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Briefly describe the plan..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverage"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Coverage (comma-separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Theft, Fire, Flood" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exclusions"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Exclusions (comma-separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Wear and tear, War" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Saving...' : 'Save Plan'}
            </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPlanForm;
