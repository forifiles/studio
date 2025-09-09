'use server';

import { insuranceRecommendation, type InsuranceRecommendationInput, type InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import { db } from '@/lib/firebase';
import type { Purchase } from '@/lib/types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function getInsuranceRecommendations(input: InsuranceRecommendationInput): Promise<InsuranceRecommendationOutput> {
  try {
    const recommendations = await insuranceRecommendation(input);
    return recommendations;
  } catch (error) {
    console.error('Error getting insurance recommendations:', error);
    throw new Error('Failed to fetch AI recommendations. Please check your input and try again.');
  }
}

export async function createPurchaseRecord(purchaseData: Omit<Purchase, 'id' | 'purchaseDate' | 'status'>): Promise<string> {
  try {
    const purchaseWithTimestamp = {
      ...purchaseData,
      status: 'pending' as const,
      purchaseDate: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'purchases'), purchaseWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error creating purchase record:', error);
    throw new Error('Failed to save purchase record to the database.');
  }
}
