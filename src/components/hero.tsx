'use client';

import { useEffect, useState } from 'react';
import InsuranceForm from '@/components/insurance-form';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import RecommendationCard from './recommendation-card';
import { Loader2 } from 'lucide-react';
import RecommendationDetails from './recommendation-details';
import { Button } from './ui/button';
import ComparisonView from './comparison-view';
import { useToast } from '@/hooks/use-toast';

type Recommendation = InsuranceRecommendationOutput['recommendations'][0];

const Hero = () => {
  const [recommendations, setRecommendations] = useState<InsuranceRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [comparisonList, setComparisonList] = useState<Recommendation[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const pendingCheckout = sessionStorage.getItem('pendingCheckout');
    if (pendingCheckout) {
      try {
        const recommendation: Recommendation = JSON.parse(pendingCheckout);
        setSelectedRecommendation(recommendation);
        sessionStorage.removeItem('pendingCheckout');
      } catch (error) {
        console.error('Failed to parse pending checkout data', error);
        sessionStorage.removeItem('pendingCheckout');
      }
    }
  }, []);

  const handleRecommendationClick = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
  };
  
  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedRecommendation(null);
    }
  };

  const handleCompareSelect = (recommendation: Recommendation, isSelected: boolean) => {
    if (isSelected) {
      if (comparisonList.length < 4) {
        setComparisonList([...comparisonList, recommendation]);
      } else {
        toast({
          variant: 'destructive',
          title: 'You can only compare up to 4 plans.',
        });
      }
    } else {
      setComparisonList(comparisonList.filter((item) => item.policyName !== recommendation.policyName));
    }
  };

  const visibleRecommendations = showAllRecommendations 
    ? recommendations?.recommendations 
    : recommendations?.recommendations.slice(0, 3);

  return (
    <section id="hero" className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Find Your Perfect <span className="text-primary">Insurance</span> Plan
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Our AI-powered tool analyzes your needs to find the best insurance policies for you. Get personalized recommendations in minutes.
            </p>
          </div>
          <InsuranceForm
            setRecommendations={setRecommendations}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>

        {isLoading && (
          <div className="mt-16 text-center">
            <div className="flex justify-center items-center gap-2 text-lg text-muted-foreground">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
              <p>Analyzing your profile, please wait...</p>
            </div>
          </div>
        )}

        {recommendations && (
          <div id="recommendations" className="mt-20">
            <div className="flex flex-col md:flex-row justify-center items-center text-center gap-4 mb-8">
              <h2 className="font-headline text-3xl font-bold">Your Top Recommendations</h2>
              <Button 
                onClick={() => setShowComparison(true)}
                disabled={comparisonList.length < 2 || comparisonList.length > 4}
              >
                Compare Plans ({comparisonList.length})
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleRecommendations?.map((rec, index) => (
                <RecommendationCard 
                  key={index} 
                  recommendation={rec} 
                  onViewDetails={() => handleRecommendationClick(rec)}
                  onCompareSelect={handleCompareSelect}
                  isComparing={comparisonList.length >= 4 && !comparisonList.some(item => item.policyName === rec.policyName)}
                />
              ))}
            </div>
            {recommendations.recommendations.length > 3 && !showAllRecommendations && (
              <div className="text-center mt-12">
                <Button onClick={() => setShowAllRecommendations(true)}>View More</Button>
              </div>
            )}
          </div>
        )}
      </div>
      <RecommendationDetails 
        recommendation={selectedRecommendation}
        isOpen={!!selectedRecommendation}
        onOpenChange={handleSheetOpenChange}
      />
      <ComparisonView 
        isOpen={showComparison}
        onOpenChange={setShowComparison}
        recommendations={comparisonList}
      />
    </section>
  );
};

export default Hero;
