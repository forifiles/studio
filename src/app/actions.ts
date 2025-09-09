'use server';

import { insuranceRecommendation, type InsuranceRecommendationInput, type InsuranceRecommendationOutput } from '@/ai/flows/insurance-recommendation';
import { db } from '@/lib/firebase';
import type { InsurancePlan, Purchase, PurchaseStatus } from '@/lib/types';
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';

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


// --- Admin Actions ---

export async function getPurchases(): Promise<Purchase[]> {
  try {
    const purchasesCol = collection(db, 'purchases');
    const q = query(purchasesCol, orderBy('purchaseDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Purchase));
  } catch (error) {
    console.error('Error fetching purchases:', error);
    throw new Error('Failed to fetch purchase records.');
  }
}

export async function getInsurancePlans(): Promise<InsurancePlan[]> {
  try {
    const plansCol = collection(db, 'insurance_plans');
    const snapshot = await getDocs(plansCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InsurancePlan));
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    throw new Error('Failed to fetch insurance plans.');
  }
}

export async function addInsurancePlan(planData: Omit<InsurancePlan, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'insurance_plans'), planData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding insurance plan:', error);
    throw new Error('Failed to add insurance plan.');
  }
}

export async function updatePurchaseStatus(purchaseId: string, status: PurchaseStatus): Promise<void> {
  try {
    const purchaseRef = doc(db, 'purchases', purchaseId);
    await updateDoc(purchaseRef, { status });
  } catch (error) {
    console.error('Error updating purchase status:', error);
    throw new Error('Failed to update purchase status.');
  }
}
