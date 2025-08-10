import { Text, View, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { deleteTransaction, getTransaction } from "../../../../lib/supabase/transactions";
import { useRouter } from "expo-router";

import globalStyles from "../../../../assets/uiStyles";
import { APP_COLORS } from "../../../../constants/colors";

import LabelWithText from "../../../../components/labelwithtext";
import { formatCurrency } from "../../../../lib/utils";
import OptionsMenu from "../../../../components/optionsmenu";

export default function TransactionDetails () {
    const router = useRouter()
    // {"id": "192", "income": "false"}
    const params = useLocalSearchParams()
    const income = params.income === 'true' ? true : false
    const id = Number(params.id)

    const [transactionData, setTransactionData] = useState(null)

    useEffect(() => {
        getTransaction(id, income).then((data) => {

            setTransactionData({ ... data, 
                date: new Date(data.date).toLocaleString("es-MX", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour12: true, // formato 24 horas
                    timeZone: "UTC" // ajusta si quieres tu zona local
                    }),
                created_at: new Date(data.created_at).toLocaleString("es-MX", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC"
                })
            })
        })
    }, [])

    const handleDeleteButton = () => {
            Alert.alert(
                "Delete transaction",
                `Are you sure you want to delete this ${income?'income':'spending'}? This action cannot be undone.`,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            const result = await deleteTransaction(id, income)
                            if (result === true) {
                                router.replace('/(tabs)/transactions')
                            }
                            if (result !== true) {
                                console.log(result)
                                Alert.alert(
                                    "Error",
                                    result.message,
                                    [
                                        {
                                            text: "OK",
                                            style: "cancel"
                                        }
                                    ],
                                    { cancelable: true }
                                )
                            }
                        },
                        style: "destructive"
                    }
                ],
                { cancelable: true }
            )
        }

    const handleEditButton = () => {
        router.push({
            pathname: `/transactions/edit/${id}`,
            params: { ... transactionData,
                type: income ? 'income' : 'spending'
            }
        })
    }

    return (
        <View style={[globalStyles.container, styles.container]}>
            <Text style={[globalStyles.title]}>{income ? 'Income' : 'Spending'}</Text>
            {transactionData && <View style={styles.container}>
                <OptionsMenu>
                    <OptionsMenu.Item icon="edit" color={APP_COLORS.GREEN} onPress={handleEditButton} />
                    <OptionsMenu.Item icon="delete" color={APP_COLORS.RED} onPress={handleDeleteButton} />
                </OptionsMenu>
                <LabelWithText label='Created at' text={transactionData?.created_at??'Loading'}/>
                <LabelWithText label='Date' text={transactionData?.date??'Loading'}/>
                <LabelWithText label='Description' text={transactionData?.description??'Loading'}/>
                <LabelWithText label='Amount' text={formatCurrency(transactionData?.amount??0)}/>
                <LabelWithText label='Account' text={transactionData?.account_id??'Loading'}/>
                {!income && <LabelWithText label='Category' text={transactionData?.category_id??'Empty'}/>}
                {transactionData?.deferred_id && <LabelWithText label='Deferred' text={transactionData?.deferred_id??'Loading'}/>}
            </View>}
            {!transactionData && <ActivityIndicator size="large" color={APP_COLORS.PRIMARY} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 22
    },
})