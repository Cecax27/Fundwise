import { supabase } from "./client";

export async function addBudget({ name, period_type, period_length_days = null, plan_groups }) {
    let { error } = await supabase.rpc('create_budget_plan', {
        p_name: name,
        p_period_type: period_type,
        p_period_length_days: period_length_days,
        p_plan_groups: plan_groups
        });

    if (error) {
        return error;
    }
    return true;
}

export async function updateBudget({ id, name, period_type, period_length_days = null, plan_groups }) {
    let { error } = await supabase.from('budget_plans').update({name, period_type, period_length_days}).eq('id', id);
    if (error) {
        return error;
    }
    ({ error } = await supabase.rpc('update_budget_plan_groups', {
        p_plan_id: id,
        p_plan_groups: plan_groups
    }));
    if (error) {
        return error;
    }
    return true;
}

export async function deleteBudget(id) {
    let { error } = await supabase.from('budget_plans').delete().eq('id', id);
    if (error) {
        return error;
    }
    return true;
}

export async function getBudgetPlans(){
    const { data, error } = await supabase.rpc('get_user_budget_plans');
    if (error) {
        return error;
    } else {
        return data;
    }
}

export async function getBudgetPlanDetails(id, reference_date) {
    const { data, error } = await supabase.rpc('get_budget_plan', {
        p_plan_id: id,
        p_reference_date: reference_date
    });
    if (error) {
        return error;
    } else {
        return data;
    }
}

export async function getBudgetGroups(){
    const { data, error } = await supabase.from('budget_groups').select('*');
    if (error) {
        return error;
    } else {
        return data;
    }
}