import { View, Pressable, FlatList, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native'
import styles from '../../../assets/uiStyles'
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AddTransactionModal from './addTransaction'
import FilterModal from '../../../components/filterModal'
import { getSpendingsTable, getAccounts, getCategories, getBudgetGroups } from '../../../lib/supabase/transactions';
import { useRouter } from 'expo-router';

import DateGroup from '../../../components/dateGroup';
import Transaction from '../../../components/transaction'

export default function Transactions() {
  const router = useRouter()
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      account: null,
      category: null,
      budget_group: null
    });
    const [groupedData, setGroupedData] = useState([])

    useEffect(() => {
      
      getSpendingsTable(filter.start_date, filter.end_date, filter.account, filter.category, filter.budget_group).then((transactions) => {
        const grouped = transactions.reduce((acc, transaction) => {
          const date = transaction.date; // Keep the original ISO format date
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(transaction);
          return acc;
        }, {});

        // Convert to array with original date for sorting
        const groupedArray = Object.entries(grouped).map(([date, transactions]) => ({
          date: new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
          }), // Convert to locale string for display
          originalDate: date, // Keep original ISO format for sorting
          transactions
        }));

        const sortedArray = groupedArray.sort((a, b) => {
          return new Date(b.originalDate) - new Date(a.originalDate);
        });

        setGroupedData(sortedArray);

        setData(transactions);
      });
    }, [filter, addModalVisible, filterModalVisible]);

    return (
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Pressable onPress={() => router.push('/(tabs)/transactions/addTransaction')}>
            <MaterialIcons name="add" size={24} color={'#c2bb00'} />
          </Pressable>
          <Pressable onPress={() => setFilterModalVisible(true)}>
            <MaterialIcons name="filter-alt" size={24} color={'#0c0c0c88'} />
          </Pressable>
        </View>

        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          filter={filter}
          setFilter={setFilter}
        />
        
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
                      id={transaction.id}
                      income={transaction.category_name === 'income'}
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