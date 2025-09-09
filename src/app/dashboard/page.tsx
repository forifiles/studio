'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getUserPurchases } from '@/app/actions';
import type { Purchase } from '@/lib/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { user, loading, userRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const statusColors: Record<Purchase['status'], string> = {
    pending: 'bg-yellow-500',
    active: 'bg-green-500',
    expired: 'bg-gray-500',
    cancelled: 'bg-red-500',
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        const loadUserPurchases = async () => {
          setIsDataLoading(true);
          try {
            const purchaseData = await getUserPurchases(user.uid);
            setPurchases(purchaseData);
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Failed to load purchase history',
              description: 'Could not retrieve your data from the database.',
            });
          } finally {
            setIsDataLoading(false);
          }
        };
        loadUserPurchases();
      }
    }
  }, [user, loading, router, toast]);
  

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
          <h1 className="text-4xl font-bold font-headline">Your Dashboard</h1>
          <p className="text-muted-foreground">View your purchased insurance plans.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Insurance Plans</CardTitle>
            <CardDescription>A list of all your active and past insurance policies.</CardDescription>
          </CardHeader>
          <CardContent>
            {isDataLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : purchases.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">You haven't purchased any plans yet.</p>
                <Button onClick={() => router.push('/')} className="mt-4">Find a Plan</Button>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy Name</TableHead>
                      <TableHead>Premium</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="font-medium">{purchase.policyName}</TableCell>
                        <TableCell>{purchase.premium}</TableCell>
                        <TableCell>
                          {purchase.purchaseDate ? format(purchase.purchaseDate.toDate(), 'PPP') : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${statusColors[purchase.status]} hover:${statusColors[purchase.status]}`}>
                            {purchase.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
