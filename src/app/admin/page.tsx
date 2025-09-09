'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getPurchases, getInsurancePlans } from '@/app/actions';
import type { Purchase, InsurancePlan } from '@/lib/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PurchaseList from '@/components/admin/purchase-list';
import PlanManager from '@/components/admin/plan-manager';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const loadAdminData = async () => {
    try {
      const [purchaseData, planData] = await Promise.all([
        getPurchases(),
        getInsurancePlans(),
      ]);
      setPurchases(purchaseData);
      setPlans(planData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load data',
        description: 'Could not retrieve admin data from the database.',
      });
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if(user) {
      loadAdminData();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage plans and view purchase history.</p>
        </div>

        <Tabs defaultValue="purchases">
          <TabsList className="grid w-full grid-cols-2 max-w-lg">
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="plans">Manage Plans</TabsTrigger>
          </TabsList>
          <TabsContent value="purchases">
            {isDataLoading ? (
               <Loader2 className="h-8 w-8 animate-spin text-primary mt-8" />
            ) : (
              <PurchaseList purchases={purchases} onStatusChange={loadAdminData} />
            )}
          </TabsContent>
          <TabsContent value="plans">
             {isDataLoading ? (
               <Loader2 className="h-8 w-8 animate-spin text-primary mt-8" />
            ) : (
               <PlanManager initialPlans={plans} onPlanAdded={loadAdminData} />
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
