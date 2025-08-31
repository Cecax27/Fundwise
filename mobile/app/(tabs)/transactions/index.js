import { View, Pressable, FlatList, RefreshControl, Text } from 'react-native'
import {makeStyles} from '../../../assets/uiStyles'
import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useEffect, useState, useContext } from 'react';
import FilterModal from '../../../components/filterModal'
import { getSpendingsTable } from '../../../lib/supabase/transactions';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { TransactionsFiltersContext } from '../../../contexts/FiltersContext';
import { useTranslation } from 'react-i18next';
import DateGroup from '../../../components/dateGroup';
import Transaction from '../../../components/transaction'

export default function Transactions() {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { i18n } = useTranslation();
  const router = useRouter()
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const { filter, setFilter } = useContext(TransactionsFiltersContext)

  const [groupedData, setGroupedData] = useState([])

  const fetchTransactions = () => {
    getSpendingsTable(filter.start_date, filter.end_date, filter.account, filter.category, filter.budget_group).then((transactions) => {
      const grouped = transactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      }, {});

      const groupedArray = Object.entries(grouped).map(([date, transactions]) => ({
        date: new Date(date).toLocaleDateString(i18n.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        }), 
        originalDate: date, 
        transactions
      }));

      const sortedArray = groupedArray.sort((a, b) => {
        return new Date(b.originalDate) - new Date(a.originalDate);
      });

      sortedArray.forEach(group => {if(group.deferred_id) group.transaction_type = 'deferred'});

      setGroupedData(sortedArray);

      setData(transactions);
    });
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
  }

  useEffect(() => {
    setRefreshing(false);
  }, [data]);

  useEffect(() => {
    fetchTransactions();
  }, [filter, filterModalVisible]);

    return (
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <Pressable onPress={() => router.push('/(tabs)/transactions/addTransaction')}>
            <MaterialIcons name="add" size={24} color={'#c2bb00'} />
          </Pressable>
          <Pressable onPress={() => setFilterModalVisible(true)}>
            <MaterialIcons name="filter-alt" size={24} color={theme.text} />
          </Pressable>
        </View>

        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          filter={filter}
          setFilter={setFilter}
        />

        {data.length === 0 && <View style={[styles.container, {alignItems:'center', gap:20}]}>
            <MaterialIcons name="search-off" size={64} color={theme.subtext}/>
            <Text style={[styles.p, {textAlign:'center', color:theme.subtext}]}>
              {t('transactions.noTransactions')}
            </Text>
          </View>}
        
        {data.length !== 0 && <FlatList
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
                      type={transaction.transaction_type}
                      to_account={transaction.to_account??null}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </DateGroup>
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />}
      </View>
    )
}