import { View, Pressable, Text, Image, FlatList } from 'react-native'
import { useBudget } from '../../hooks/useBudget'
import { useTheme } from '../../theme/useTheme'
import { makeStyles } from '../../assets/uiStyles'
import { useMemo, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { t } from 'i18next'

export function BudgetPlans() {
    const { budgetPlans, fetchBudgetPlans } = useBudget();
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const router = useRouter()

    useEffect(() => { fetchBudgetPlans(); }, [fetchBudgetPlans])

    return (
        <>
        <FlatList
            data={budgetPlans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.toolCard}
                    onPress={() => router.push(`/dashboard/budgetDetails/${item.id}`)}
                >
                    <View style={styles.toolCardContent}>
                        <Image source={require("../../assets/icons/budget.png")} style={styles.toolIcon}/>
                        <Text style={styles.toolTitle}>{item.name}</Text>
                        <Text style={styles.toolSubtitle}>{t(`budget.types.${item.period_type}`)}</Text>
                        <Text style={[styles.cardSubtitle, { color: theme.text }]}></Text>
                    </View>
                </Pressable>
            )}
        />
        </>
    );
}