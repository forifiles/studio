'use client';

import type { Purchase, PurchaseStatus } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { updatePurchaseStatus } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type PurchaseListProps = {
  purchases: Purchase[];
  onStatusChange: () => void;
};

const PurchaseList = ({ purchases, onStatusChange }: PurchaseListProps) => {
  const { toast } = useToast();

  const handleStatusChange = async (id: string, status: PurchaseStatus) => {
    try {
      await updatePurchaseStatus(id, status);
      toast({
        title: 'Status Updated',
        description: `Purchase status has been changed to ${status}.`,
      });
      onStatusChange();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update the purchase status.',
      });
    }
  };

  const statusColors: Record<PurchaseStatus, string> = {
    pending: 'bg-yellow-500',
    active: 'bg-green-500',
    expired: 'bg-gray-500',
    cancelled: 'bg-red-500',
  };

  return (
    <div className="rounded-lg border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Policy</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>
                <div className="font-medium">{purchase.formData.fullName}</div>
                <div className="text-sm text-muted-foreground">{purchase.userEmail}</div>
              </TableCell>
              <TableCell>{purchase.policyName}</TableCell>
              <TableCell>{purchase.premium}</TableCell>
              <TableCell>
                {purchase.purchaseDate ? format(purchase.purchaseDate.toDate(), 'PPP') : 'N/A'}
              </TableCell>
              <TableCell>
                <Badge className={`${statusColors[purchase.status]} hover:${statusColors[purchase.status]}`}>
                  {purchase.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {(['active', 'pending', 'expired', 'cancelled'] as PurchaseStatus[]).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleStatusChange(purchase.id!, status)}
                        disabled={purchase.status === status}
                      >
                        Mark as {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseList;
