import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';

type Recommendation = InsuranceRecommendationOutput['recommendations'][0];

const RecommendationCard = ({ recommendation }: { recommendation: Recommendation }) => {
  return (
    <Card className="flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline">{recommendation.policyName}</CardTitle>
        <CardDescription>{recommendation.insuranceProvider}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="font-semibold mb-1">Coverage</h4>
          <p className="text-sm text-muted-foreground">{recommendation.coverageDetails}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Reasoning</h4>
          <p className="text-sm text-muted-foreground">{recommendation.reasoning}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-bold text-primary">{recommendation.premium}</div>
        <Button>Select Plan</Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
