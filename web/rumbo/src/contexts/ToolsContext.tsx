'use client'

import { createContext, useState, useEffect } from "react";
import {getBudgetPlans} from "@shared/supabase/tools";

interface BudgetPlanGroup {
  group_name: string;
  limit_percentage: number;
  alert_threshold: number;
}

interface BudgetPlan {
  id: number;
  name: string;
  period_type: string;
  period_length_days: number;
  groups: BudgetPlanGroup[];
}

type BudgetPlanResponse = BudgetPlan[];

type ToolsContextType = BudgetPlanResponse;

export const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children } : { children: React.ReactNode }) {
    
    const [budgetPlans, setBudgetPlans] = useState<ToolsContextType>([]);

    useEffect(() => {
        async function fetchBudgetPlans() {
            const plans = await getBudgetPlans();
            setBudgetPlans(plans);
        }
        fetchBudgetPlans();
    }, []);

    return (
        <ToolsContext.Provider
        value ={budgetPlans}>
            { children }
        </ToolsContext.Provider>
    )
}