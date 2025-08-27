'use client'

import { useState } from 'react';
import InsuranceForm from '@/components/insurance-form';
import type { InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import RecommendationCard from './recommendation-card';
import { Loader2 } from 'lucide-react';

const Hero = () => {
  const [recommendations, setRecommendations] = useState<InsuranceRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Your Top 3 Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.recommendations.map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
