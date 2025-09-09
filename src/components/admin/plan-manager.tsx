'use client';

import { useState } from 'react';
import type { InsurancePlan } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import AddPlanForm from './add-plan-form';

type PlanManagerProps = {
  initialPlans: InsurancePlan[];
  onPlanAdded: () => void;
};

const PlanManager = ({ initialPlans, onPlanAdded }: PlanManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Insurance Plans</CardTitle>
            <CardDescription>View, add, or edit available insurance plans.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add a New Insurance Plan</DialogTitle>
              </DialogHeader>
              <AddPlanForm onPlanAdded={() => { onPlanAdded(); setIsDialogOpen(false); }} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.provider}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(plan.premium)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanManager;
