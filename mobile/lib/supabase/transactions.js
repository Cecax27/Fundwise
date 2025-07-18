import { supabase } from './client'

export const getMonthlyBalance = async (month = null) => {
  const { data, error } = await supabase.rpc('get_monthly_balance', {
    p_month: month // o puedes omitirlo si tienes default en la función
  })
  return { data, error }
}

export const getMonthlyIncomes = async (month = null) => {
  const { data, error } = await supabase.rpc('get_monthly_incomes', {
    p_month: month // o puedes omitirlo si tienes default en la función
  })
  return { data, error }
}

export const getMonthlySpendings = async (month = null) => {
    const { data, error } = await supabase.rpc('get_monthly_spendings', {
      p_month: month // o puedes omitirlo si tienes default en la función
    })
    return { data, error }
  }

export const getSpendingsTable = async (
  start_date = null,
  end_date = null,
  account = null,
  category = null,
  budget_group = null
) => {
  const { data, error } = await supabase
  .rpc('get_filtered_spendings', {
    date_start_range: start_date,
    date_end_range: end_date,
    account: account,
    category: category,
    p_budget_group: budget_group
  });

if (error) {
  console.error('Error al obtenfer gastos:', error);
} else {
  return data
}
}

export const getAccounts = async () => {
  const { data, error } = await supabase.from('accounts').select('*');
  if (error) {
    console.error('Error al obtener cuentas:', error);
  } else {
    return data
  }
}

export const getCategories = async () => {
  const { data, error } = await supabase.from('spendings_categories').select('*');
  if (error) {
    console.error('Error al obtener categorías:', error);
  } else {
    return data
  }
}

export const getBudgetGroups = async () => {
  const { data, error } = await supabase.from('budget_groups').select('*');
  if (error) {
    console.error('Error al obtener grupos de presupuesto:', error);
  } else {
    return data
  }
}