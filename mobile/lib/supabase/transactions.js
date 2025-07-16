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