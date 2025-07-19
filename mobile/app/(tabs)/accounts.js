import { View, Pressable, Alert, FlatList, StyleSheet } from 'react-native'
import styles from '../../assets/uiStyles'
import Resume from '../../components/resume'
import { useState, useEffect } from 'react'

import { getAccounts } from '../../lib/supabase/transactions'

import {Account} from '../../components/account'
import {AddAccountCard} from '../../components/addAccountCard'

export default function Accounts() {
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        getAccounts().then((data) => { setAccounts(data) })
    }, [])

    return (
        <View style={accountsStyle.cardContainer}>
            <AddAccountCard />
            <FlatList
                data={accounts}
                renderItem={({ item }) => <Account account={item} />}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={accountsStyle.listContent}
            />
        </View>
    )
}

const accountsStyle = StyleSheet.create({
    cardContainer: {
        paddingVertical: 8,
        gap:20,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    listContent: {
        gap: 20,
        backgroundColor: 'transparent'
    }
})