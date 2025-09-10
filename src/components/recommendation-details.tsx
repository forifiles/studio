'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import CheckoutForm from './checkout-form';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

type Recommendation = InsuranceRecommendationOutput['recommendations'][0];

type RecommendationDetailsProps = {
  recommendation: Recommendation | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const RecommendationDetails = ({ recommendation, isOpen, onOpenChange }: RecommendationDetailsProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isOpen && user) {
        setShowCheckout(true);
    }
  }, [isOpen, user]);

  if (!recommendation) return null;

  const handleSelectPlan = () => {
    if (user) {
      setShowCheckout(true);
    } else {
      sessionStorage.setItem('pendingCheckout', JSON.stringify(recommendation));
      router.push('/login?redirect=/');
    }
  };

  const handleCloseSheet = (open: boolean) => {
    if (!open) {
      setShowCheckout(false); // Also close checkout form
    }
    onOpenChange(open);
  }

  return (
    <>
      <Sheet open={isOpen && !showCheckout} onOpenChange={handleCloseSheet}>
        <SheetContent className="sm:max-w-lg w-full">
          <SheetHeader className="text-left">
            <SheetTitle className="font-headline text-2xl">{recommendation.policyName}</SheetTitle>
            <SheetDescription>{recommendation.insuranceProvider}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-headline text-lg font-semibold flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                What's Covered
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                {recommendation.covered.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold flex items-center gap-2 mb-3">
                <XCircle className="text-destructive w-5 h-5" />
                What's Not Covered
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                {recommendation.notCovered.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <SheetFooter className="mt-8 flex-col sm:flex-row sm:justify-between items-center gap-4">
              <div className="text-xl font-bold text-primary">{recommendation.premium}</div>
              <Button size="lg" onClick={handleSelectPlan}>Select this Plan</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <CheckoutForm 
        isOpen={showCheckout} 
        onOpenChange={(open) => {
            setShowCheckout(open);
            // If checkout is closed, also close the details sheet
            if (!open) {
              onOpenChange(false);
            }
        }} 
        policyName={recommendation.policyName}
        premium={recommendation.premium}
      />
    </>
  );
};

export default RecommendationDetails;
