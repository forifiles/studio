'use server';

import { insuranceRecommendation, type InsuranceRecommendationInput, type InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';

export async function getInsuranceRecommendations(input: InsuranceRecommendationInput): Promise<InsuranceRecommendationOutput> {
  try {
    const recommendations = await insuranceRecommendation(input);
    return recommendations;
  } catch (error) {
    console.error('Error getting insurance recommendations:', error);
    throw new Error('Failed to fetch AI recommendations. Please check your input and try again.');
  }
}
