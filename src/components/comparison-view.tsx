'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import { ScrollArea } from './ui/scroll-area';

type Recommendation = InsuranceRecommendationOutput['recommendations'][0];

type ComparisonViewProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  recommendations: Recommendation[];
};

const ComparisonView = ({ isOpen, onOpenChange, recommendations }: ComparisonViewProps) => {
  if (!recommendations.length) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl">Plan Comparison</DialogTitle>
          <DialogDescription>
            Here is a side-by-side comparison of the plans you selected.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">Feature</TableHead>
                {recommendations.map((rec) => (
                  <TableHead key={rec.policyName} className="font-bold text-primary">{rec.policyName}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Provider</TableCell>
                {recommendations.map((rec) => (
                  <TableCell key={rec.policyName}>{rec.insuranceProvider}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Premium</TableCell>
                {recommendations.map((rec) => (
                  <TableCell key={rec.policyName} className="font-bold">{rec.premium}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Coverage Details</TableCell>
                {recommendations.map((rec) => (
                  <TableCell key={rec.policyName}>{rec.coverageDetails}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Reasoning</TableCell>
                {recommendations.map((rec) => (
                  <TableCell key={rec.policyName}>{rec.reasoning}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Covered</TableCell>
                {recommendations.map((rec) => (
                  <TableCell key={rec.policyName}>
                    <ul className="list-disc pl-4 space-y-1">
                      {rec.covered.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
               <TableRow>
                <TableCell className="font-semibold">Not Covered</TableCell>
                {recommendations.map((rec) => (
                  <TableCell key={rec.policyName}>
                     <ul className="list-disc pl-4 space-y-1">
                      {rec.notCovered.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonView;
