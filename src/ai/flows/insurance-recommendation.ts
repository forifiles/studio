// Insurance Recommendation Flow
'use server';

/**
 * @fileOverview AI-powered insurance recommendation flow.
 *
 * - insuranceRecommendation - A function that provides insurance recommendations based on user data.
 * - InsuranceRecommendationInput - The input type for the insuranceRecommendation function.
 * - InsuranceRecommendationOutput - The return type for the insuranceRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InsuranceRecommendationInputSchema = z.object({
  userData: z.string().describe('User-provided data, including age, income, family status, coverage needs, email, phone number, car type, and car value.'),
  insuranceType: z.string().describe('The type of insurance being sought (e.g., life, health, auto).'),
});
export type InsuranceRecommendationInput = z.infer<typeof InsuranceRecommendationInputSchema>;

const InsuranceRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      insuranceProvider: z.string().describe('The name of the insurance provider.'),
      policyName: z.string().describe('The name of the insurance policy.'),
      coverageDetails: z.string().describe('A brief description of the coverage provided by the policy.'),
      premium: z.string().describe('The premium amount for the policy.'),
      reasoning: z.string().describe('The reasoning behind why this policy is a good fit for the user.'),
    })
  ).length(3).describe('The top three insurance recommendations.'),
});
export type InsuranceRecommendationOutput = z.infer<typeof InsuranceRecommendationOutputSchema>;

export async function insuranceRecommendation(input: InsuranceRecommendationInput): Promise<InsuranceRecommendationOutput> {
  return insuranceRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'insuranceRecommendationPrompt',
  input: {
    schema: InsuranceRecommendationInputSchema
  },
  output: {
    schema: InsuranceRecommendationOutputSchema
  },
  prompt: `You are an expert insurance advisor specializing in the Nigerian market. Analyze the user data and insurance type to recommend the three best insurance options for the user in Nigeria.

User Data: {{{userData}}}
Insurance Type: {{{insuranceType}}}

Provide the recommendations in a clear and concise format, including the insurance provider, policy name, coverage details, premium, and reasoning for each recommendation. Ensure the recommendations align with the user's needs in Nigeria. Only provide 3 top recommendations. Do not start with an introduction or greeting. Do not include a conclusion. Start immediately with the first recommendation and continue to the second and third.
`,
});

const insuranceRecommendationFlow = ai.defineFlow(
  {
    name: 'insuranceRecommendationFlow',
    inputSchema: InsuranceRecommendationInputSchema,
    outputSchema: InsuranceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
