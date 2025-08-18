import { View, Text, ActivityIndicator, FlatList, ScrollView, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { ProgressChart } from 'react-native-chart-kit'
import React, { useMemo, useEffect, useState} from 'react'
import { useGlobalSearchParams, Stack } from 'expo-router'
import { useTheme } from '../../../../theme/useTheme'
import { makeStyles } from '../../../../assets/uiStyles'
import { useBudget } from '../../../../hooks/useBudget'
import { getBudgetPlanDetails } from '../../../../lib/supabase/tools'
import { formatCurrency, hexToRgba } from '../../../../lib/utils'

const types = {
    month: 'Monthly',
    week: 'Weekly',
    year: 'Yearly',
    custom: 'Custom'
}

const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

const years = Array.from({ length: 20 }, (_, i) => 2015 + i);

const groupNames = {
    essentials: 'Essentials',
    savings: 'Savings',
    discretionary: 'Discretionary'
}

export default function BudgetDetails() {
    const { theme } = useTheme()
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const params = useGlobalSearchParams()

    const { budgetGroups } = useBudget()
    

    const [budgetPlan, setBudgetPlan] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
    const fetchBudgetPlan = async () => {
        const reference_date = `${year}-${String(month).padStart(2, "0")}-01`;
        const data = await getBudgetPlanDetails(params.id, reference_date);
        setBudgetPlan(data);  
    };

    fetchBudgetPlan();
    }, [params.id, year, month]);

  return (
        <>
        <Stack.Screen options={{ title: 'Budget' }} />
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={[styles.container, { padding: 20 }]}>
                {!budgetPlan && <ActivityIndicator color={theme.primary} size="large" />}
                {budgetPlan && (
                    <View>
                        <View style={styles.centeredView}>
                            <View style={[styles.toolCard, {width:254, height:173, padding:20}]}>
                                <Image 
                                    source={require('../../../../assets/icons/budget.png')}
                                    style={{width:22, height:22, marginTop:10}}/>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize:14, color:theme.text, marginTop:10}}>
                                    {budgetPlan?.name}
                                </Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize:12, color: theme.text, marginTop: 30 }}>
                                    {types[budgetPlan?.period_type]}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Picker
                                    selectedValue={month}
                                    style={styles.picker}
                                    onValueChange={(value) => setMonth(value)}
                                    dropdownIconColor={theme.text}
                                >
                                    {months.map((m, index) => (
                                    <Picker.Item key={index} label={m} value={index + 1} />
                                    ))}
                                </Picker>

                                <Picker
                                    selectedValue={year}
                                    style={ styles.picker }
                                    onValueChange={(value) => setYear(value)}
                                    dropdownIconColor={theme.text}
                                >
                                    {years.map((y, index) => (
                                    <Picker.Item key={index} label={y.toString()} value={y} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                                <Image source={require('../../../../assets/icons/incomes.png')} style={{width:30, height:30}} />
                                <View style={styles.detailContainer}>
                                    <Text style={styles.label}>
                                        Incomes
                                    </Text>
                                    <Text style={styles.incomes}>
                                    {formatCurrency(budgetPlan?.total_incomes)}
                                    </Text>
                                </View>

                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                                <Image source={require('../../../../assets/icons/expenses.png')} style={{width:30, height:30}} />
                                <View style={styles.detailContainer}>
                                    <Text style={styles.label}>
                                        Spendings
                                    </Text>
                                    <Text style={styles.spendings}>
                                    {formatCurrency(budgetPlan?.groups?.reduce((a, b) => a + b.real_amount, 0))}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.centeredView}>
                        <View style={{ gap: 16, alignItems:'flex-start' }}>
                            {budgetPlan?.groups?.map((item) => {
                                const percent = Math.round(item.real_percentage * 100);
                                const limit = Math.round(item.limit_percentage * 100);
                                const progressColor =
                                    item.real_percentage > item.limit_percentage
                                        ? theme.coral
                                        : item.real_percentage > item.alert_threshold * item.limit_percentage
                                            ? theme.mustard
                                            : theme.mint;
                                return (
                                    <View 
                                        key={item.id.toString()}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent:'center'
                                        }}>
                                        <ProgressChart
                                            data={{ data: [Math.min(item.real_percentage / item.limit_percentage, 1)] }}
                                            width={80}
                                            height={64}
                                            radius={18}
                                            strokeWidth={7}
                                            hideLegend={true}
                                            chartConfig={{
                                                backgroundGradientFrom: theme.background,
                                                backgroundGradientTo: theme.background,
                                                color: (opacity = 1) => hexToRgba(progressColor, opacity),
                                                barPercentage: 1,
                                                useShadowColorFromDataset: false,
                                            }}
                                            style={{ marginRight: 1 }}
                                        />
                                        <View style={{}}>
                                            <Text style={styles.label}>
                                                {groupNames[item.name]}
                                            </Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Medium',
                                                    fontSize: 14,
                                                    color: progressColor,
                                                }}>
                                                    {percent}%
                                                </Text>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Regular',
                                                    fontSize: 12,
                                                    color: theme.text,
                                                    marginLeft: 4,
                                                }}>
                                                    / {limit}%
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Medium',
                                                    fontSize: 14,
                                                    color: theme.text,
                                                }}>
                                                    {formatCurrency(item.real_amount)}
                                                </Text>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Regular',
                                                    fontSize: 12,
                                                    color: theme.text,
                                                }}>
                                                    / {formatCurrency(item.target_amount)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
        </>
    );
}