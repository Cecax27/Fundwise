import { View, Pressable, Alert, FlatList, Text } from 'react-native'
import styles from '../../assets/uiStyles'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { getSpendingsTable } from '../../lib/supabase/transactions';

import DateGroup from '../../components/dateGroup';
import Transaction from '../../components/transaction'
import { color } from '@rneui/themed/dist/config';


export default function Transactions() {

    const [data, setData] = useState([])
    const [filter, setFilter] = useState({
      start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
      end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
      account: null,
      category: null,
      budget_group: null
    })
    const [groupedData, setGroupedData] = useState([])

    useEffect(() => {
      getSpendingsTable(filter.start_date, filter.end_date, filter.account, filter.category, filter.budget_group).then((transactions) => {
        const grouped = transactions.reduce((acc, transaction) => {
          const date = new Date(transaction.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(transaction);
          return acc;
        }, {});

        // Convert the object to an array of objects with date and transactions
        const groupedArray = Object.entries(grouped).map(([date, transactions]) => ({
          date,
          transactions
        }));

        setGroupedData(groupedArray);
        setData(transactions);
      });
    }, [filter]);

    return (
      <View style={styles.container}>
        <MaterialIcons name="filter-alt" size={32} />
        <FlatList
          data={groupedData}
          renderItem={({item}) => (
              <DateGroup date={item.date} >
                <FlatList
                  data={item.transactions}
                  renderItem={({item: transaction}) => (
                    <Transaction 
                      icon={transaction.category_icon}
                      description={transaction.description}
                      account={transaction.account_name}
                      amount={transaction.amount}
                      color={transaction.account_color}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </DateGroup>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
}