'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  address: z.string().min(10, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  idType: z.enum(['nin', 'passport', 'drivers_license', 'voters_card']),
  idNumber: z.string().min(5, 'A valid ID number is required'),
  idExpiry: z.date().optional(),
  idImage: z.any().refine((file) => file?.length == 1, 'ID Image is required.'),
});

type CheckoutFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  policyName: string;
  premium: string;
};

const CheckoutForm = ({ isOpen, onOpenChange, policyName, premium }: CheckoutFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      idNumber: '',
    },
  });
  
  const idType = form.watch('idType');

  // This function will be called by the Paystack callback
  const handleSuccessfulPayment = (reference: string) => {
    setIsLoading(false);
    onOpenChange(false);
    form.reset();
    toast({
      title: 'Purchase Complete!',
      description: `Your application for ${policyName} has been submitted. Payment reference: ${reference}`,
    });
  }

  // This function simulates initiating a payment with Paystack
  const initiatePayment = (values: z.infer<typeof checkoutSchema>) => {
    
    // --- How to implement Paystack ---
    // 1.  On your backend, create an endpoint that calls the Paystack Transaction Initialization API.
    //     This API call will include the user's email, the amount (premium), and other details.
    //     It will return an `authorization_url`.
    //     API Docs: https://paystack.com/docs/api/transaction/#initialize
    
    // 2.  In this function, make a request to your backend endpoint to get the `authorization_url`.
    
    // 3.  Redirect the user to the `authorization_url` or use Paystack Inline.
    //     - For redirection: window.location.href = authorization_url;
    //     - For Paystack Inline, you would use the access_code from the response.

    // 4.  Set up a webhook on your Paystack dashboard to receive payment success events (`charge.success`).
    //     When your webhook URL receives this event, you can verify the transaction and provision the service (e.g., mark the policy as active in your database).

    // --- FAKE IMPLEMENTATION FOR NOW ---
    console.log('Checkout values:', values);
    setIsLoading(true);
    
    // Simulate API call to your backend to get a payment link
    setTimeout(() => {
      const fakeAuthUrl = `https://checkout.paystack.com/pkh_${Math.random().toString(36).substring(7)}`;
      const paymentWindow = window.open(fakeAuthUrl, '_blank', 'width=800,height=600');
      
      // Simulate checking if the payment window is closed
      const checkWindow = setInterval(() => {
        if (paymentWindow && paymentWindow.closed) {
          clearInterval(checkWindow);
          // In a real scenario, Paystack calls a callback URL or webhook.
          // We are simulating the callback here.
          handleSuccessfulPayment(`fake_ref_${new Date().getTime()}`);
        }
      }, 500);

    }, 2000);
  }

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to complete a purchase.',
      });
      return;
    }
    initiatePayment(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You're one step away from securing the {policyName} for {premium}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lagos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lagos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <h3 className="font-headline text-lg pt-4">Identification</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nin">NIN</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                        <SelectItem value="voters_card">Voter's Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {idType && idType !== 'nin' && (
                <FormField
                  control={form.control}
                  name="idExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} onChange={e => field.onChange(e.target.valueAsDate)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="idImage"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Upload ID Image</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => onChange(e.target.files)} 
                        className="pt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-6">
              <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
