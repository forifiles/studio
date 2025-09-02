import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type Recommendation = InsuranceRecommendationOutput['recommendations'][0];

type RecommendationCardProps = {
  recommendation: Recommendation;
  onViewDetails: () => void;
  onCompareSelect: (recommendation: Recommendation, isSelected: boolean) => void;
  isComparing: boolean;
};

const RecommendationCard = ({ recommendation, onViewDetails, onCompareSelect, isComparing }: RecommendationCardProps) => {
  const handleCheckboxChange = (isChecked: boolean | 'indeterminate') => {
    if (typeof isChecked === 'boolean') {
      onCompareSelect(recommendation, isChecked);
    }
  };

  return (
    <Card 
      className="flex flex-col h-full transform transition-all duration-300 hover:shadow-2xl bg-card/80 backdrop-blur-sm"
    >
      <div 
        className="flex-grow cursor-pointer"
        onClick={onViewDetails}
      >
        <CardHeader>
          <CardTitle className="font-headline">{recommendation.policyName}</CardTitle>
          <CardDescription>{recommendation.insuranceProvider}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">Coverage</h4>
            <p className="text-sm text-muted-foreground">{recommendation.coverageDetails}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Reasoning</h4>
            <p className="text-sm text-muted-foreground">{recommendation.reasoning}</p>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`compare-${recommendation.policyName}`} 
            onCheckedChange={handleCheckboxChange}
            disabled={isComparing}
          />
          <Label htmlFor={`compare-${recommendation.policyName}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Compare
          </Label>
        </div>
        <div className="text-lg font-bold text-primary">{recommendation.premium}</div>
      </CardFooter>
       <div className="p-6 pt-0">
         <Button onClick={onViewDetails} className="w-full">View Details</Button>
       </div>
    </Card>
  );
};

export default RecommendationCard;
