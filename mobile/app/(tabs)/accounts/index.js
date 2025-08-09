import { View, Text, Alert, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { debounce } from 'lodash'
import styles from '../../../assets/uiStyles'
import Resume from '../../../components/resume'
import { useState, useEffect } from 'react'
import { getAccounts, getAccountsTypes, getCreditCardSpendings, deleteAccount } from '../../../lib/supabase/transactions'
import { useRouter, Link } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {Account} from '../../../components/account'
import {AddAccountCard} from '../../../components/addAccountCard'
import { formatMoney } from '../../../lib/utils/formatMoney'
import OptionsMenu from '../../../components/optionsmenu'

const ITEM_SIZE = 193;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_PADDING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

export default function HomeScreen() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [accounts, setAccounts] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [accountTypes, setAccountTypes] = useState([])
    const [loadingTypes, setLoadingTypes] = useState(true)
    const [creditCardSpendings, setCreditCardSpendings] = useState(null)

    useEffect(() => {
        // Fetch accounts
        getAccounts().then((data) => { 
            setAccounts(data) 
            setLoading(false)
        })

        // Fetch account types
        getAccountsTypes().then(data => {
            setAccountTypes(data)
            setLoadingTypes(false)
        })
    }, [])

    const handleScroll = (event) => {
        event.persist();
        const offsetX = event.nativeEvent.contentOffset.x
        const index = Math.round(offsetX / ITEM_SIZE)
        if (index !== selectedIndex) {
            setSelectedIndex(index)
            setCreditCardSpendings(null)
            if (accountsWithAddCard[index].account_type === 2) {
                getCreditCardSpendings(accountsWithAddCard[index].id, new Date().getFullYear(), new Date().getMonth()).then((data) => {
                    setCreditCardSpendings(data.reduce((acc, item) => acc + item.amount, 0))
                })
            }
        }
    };

    const accountsWithAddCard = [
        ...accounts,
        { id: 'add', name: 'Agregar Cuenta', isAddButton: true },
    ]

    const handleDeleteButton = () => {
        Alert.alert(
            "Delete account",
            "Are you sure you want to delete the account " + accountsWithAddCard[selectedIndex].name + "? All the account transactions will be delete too.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        const result = await deleteAccount(accountsWithAddCard[selectedIndex].id)
                        if (result === true) {
                            router.reload()
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

    return (
        <View style={accountsStyle.cardContainer}>
            
            <FlatList
                data={accountsWithAddCard}
                renderItem={({ item }) => {
                    if (item.isAddButton) {
                        return <AddAccountCard onClick={() => router.push('/(tabs)/accounts/newaccount')} />;
                    }
                    return <Account account={item} isSelected={item.id === accountsWithAddCard[selectedIndex].id} />;
                }}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={accountsStyle.listContent}
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={handleScroll}
                />
            {!loading && !loadingTypes && accountsWithAddCard[selectedIndex] && !accountsWithAddCard[selectedIndex].isAddButton &&
            <View style={accountsStyle.infoContainer}>
                <OptionsMenu>
                    <Link href={'/accounts/editaccount/' + accountsWithAddCard[selectedIndex].id} asChild>
                        <OptionsMenu.Item icon='edit' color="#c2bb00"/>
                    </Link>
                    <OptionsMenu.Item icon='delete' color="#e1523d" onPress={handleDeleteButton}/>
                </OptionsMenu>
                <View style={accountsStyle.propertyView}>
                    <Text style={accountsStyle.label}>Account type</Text>
                    <Text style={accountsStyle.data}>{accountTypes.find(type => type.id === accountsWithAddCard[selectedIndex].account_type).type.replace('_', ' ').replace(/\w/, c => c.toUpperCase())}</Text>
                </View>
                {2 === accountsWithAddCard[selectedIndex].account_type &&
                <View style={accountsStyle.propertyView}>
                    <Text style={accountsStyle.label}>Cuttof date</Text>
                    <Text style={accountsStyle.data}>{accountsWithAddCard[selectedIndex].cutt_off_day??'N/A'}</Text>
                </View>
                }
                {2 === accountsWithAddCard[selectedIndex].account_type &&
                <View style={accountsStyle.propertyView}>
                    <Text style={accountsStyle.label}>Minimum payment</Text>
                    <Text style={accountsStyle.data}>{creditCardSpendings?formatMoney(creditCardSpendings??0):'Loading'}</Text>
                </View>
                }
            </View>
            }
        </View>
    )
}

const accountsStyle = StyleSheet.create({
    cardContainer: {
        paddingVertical: 8,
        gap:20,
        backgroundColor: 'transparent',
        flexDirection: 'column'
    },
    infoContainer: {
        padding: 17,
        backgroundColor: '#fff',
        flexDirection: 'column',
        gap: 20
    },
    listContent: {
        gap: 20,
        backgroundColor: 'transparent',
        paddingHorizontal: SIDE_PADDING,
    },
    propertyView: {
        gap: 2
    },
    optionsMenu: {
        gap: 15,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    label: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },
    data: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    }
})