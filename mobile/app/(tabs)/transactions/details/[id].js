import { Text, View, ActivityIndicator, Alert } from "react-native"
import { useState, useEffect, useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteTransaction, getTransaction } from "../../../../lib/supabase/transactions";
import { useTheme } from "../../../../theme/useTheme";

import { makeStyles } from "../../../../assets/uiStyles";
import { APP_COLORS } from "../../../../constants/colors";

import LabelWithText from "../../../../components/labelwithtext";
import { formatCurrency } from "../../../../lib/utils";
import OptionsMenu from "../../../../components/optionsmenu";

export default function TransactionDetails () {
    const { theme } = useTheme()
    const styles = useMemo(() => makeStyles(theme), [theme])

    const router = useRouter()
    // {"id": "192", "income": "false"}
    const params = useLocalSearchParams()

    
    const id = Number(params.id)
    
    const [type, setType]  = useState('spending')
    const [transactionData, setTransactionData] = useState(null)

    useEffect(() => {
        getTransaction(id, params.type)
            .then((data) => {
                if (!data) {
                    Alert.alert(
                        "Error",
                        "Transaction not found",
                        [
                            {
                                text: "OK",
                                style: "cancel"
                            }
                        ],
                        { cancelable: true }
                    )
                    router.replace('/(tabs)/transactions')
                }

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

                if (data.deferred_id) {
                    setType('deferred')
                } else {
                    setType(params.type)
                }
            })
            .catch((error) => {
                console.error("Error fetching transaction:", error);
                Alert.alert(
                    "Error",
                    "Failed to fetch transaction details",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ],
                    { cancelable: true }
                )
                router.replace('/(tabs)/transactions')
            })
    }, [])

    const handleReturn = (result) => {
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
    }

    const handleDeleteButton = () => {
            Alert.alert(
                "Delete transaction",
                `Are you sure you want to delete this ${type}? This action cannot be undone.`,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            if (type==='deferred') {
                                Alert.alert('Delete deferred spending',
                                    'Delete this spending will delete all the deferred payments associated with it. Are you sure you want to continue?',
                                    [{text: 'Cancel', style: 'cancel'},
                                        {
                                            text: 'Delete',
                                            onPress: async () => {
                                                await deleteTransaction(transactionData.deferred_id, 'deferred').then((result) => {
                                                handleReturn(result)})
                                            }
                                        }
                                    ]
                                )
                            } else {
                                await deleteTransaction(id, type).then((result) => {
                                handleReturn(result)})
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
                type
            }
        })
    }

    return (
        <View style={[styles.container, {
        flex: 1,
        gap: 22
    }]}>
            <Text style={[styles.title]}>{type}</Text>
            {transactionData && <View style={styles.container}>
                <OptionsMenu>
                    <OptionsMenu.Item icon="edit" color={APP_COLORS.GREEN} onPress={handleEditButton} />
                    <OptionsMenu.Item icon="delete" color={APP_COLORS.RED} onPress={handleDeleteButton} />
                </OptionsMenu>
                <LabelWithText label='Created at' text={transactionData?.created_at??'Loading'}/>
                <LabelWithText label='Date' text={transactionData?.date??'Loading'}/>
                <LabelWithText label='Description' text={transactionData?.description??'Loading'}/>
                <LabelWithText label='Amount' text={formatCurrency(transactionData?.amount??0)}/>
                {type!=='transfer' && <LabelWithText label='Account' text={transactionData?.account_id??'Loading'}/>}
                {type==='transfer' && <LabelWithText label='From account' text={transactionData?.from_account_id??'Loading'}/>}
                {type==='transfer' && <LabelWithText label='To account' text={transactionData?.to_account_id??'Loading'}/>}
                {(type==='spending' || type==='deferred') && <LabelWithText label='Category' text={transactionData?.category_id??'Empty'}/>}
                {type==='deferred' && <LabelWithText label='Deferred' text={transactionData?.deferred_id??'Loading'}/>}
            </View>}
            {!transactionData && <ActivityIndicator size="large" color={APP_COLORS.PRIMARY} />}
        </View>
    )
}