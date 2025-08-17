import { View, Pressable, Alert, Text, Image, FlatList } from 'react-native'
import { useBudget } from '../../hooks/useBudget'
import { useTheme } from '../../theme/useTheme'
import { makeStyles } from '../../assets/uiStyles'
import { useMemo } from 'react'

const period_types = {
    month: 'Monthly',
    week: 'Weekly',
    year: 'Yearly',
    custom: 'Custom'
}

export function BudgetPlans() {
    const { budgetPlans } = useBudget();
    const { theme } = useTheme();
        const styles = useMemo(() => makeStyles(theme), [theme]);

    return (
        <>
        <FlatList
            data={budgetPlans}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.toolCard}
                    onPress={() => Alert.alert(`Budget Plan: ${item.name}`)}
                >
                    <View style={styles.toolCardContent}>
                        <Image source={require("../../assets/icons/budget.png")} style={styles.toolIcon}/>
                        <Text style={styles.toolTitle}>{item.name}</Text>
                        <Text style={styles.toolSubtitle}>{period_types[item.period_type]}</Text>
                        <Text style={[styles.cardSubtitle, { color: theme.text }]}></Text>
                    </View>
                </Pressable>
            )}
        />
        </>
    );
}