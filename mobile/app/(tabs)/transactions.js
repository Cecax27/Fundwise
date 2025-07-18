import { View, Pressable, Alert, FlatList, Text, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from '../../assets/uiStyles'
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { getSpendingsTable, getAccounts, getCategories, getBudgetGroups } from '../../lib/supabase/transactions';

import DateGroup from '../../components/dateGroup';
import Transaction from '../../components/transaction'
import { Picker } from '@react-native-picker/picker';


export default function Transactions() {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      account: null,
      category: null,
      budget_group: null
    });
    const [startDateVisible, setStartDateVisible] = useState(false);
    const [endDateVisible, setEndDateVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])
    const [budgetGroups, setBudgetGroups] = useState([])

    // Initialize dates when component mounts
    useEffect(() => {
      getAccounts().then((accounts) => {
        setAccounts(accounts)
      })
      getCategories().then((categories) => {
        setCategories(categories)
      })
      getBudgetGroups().then((budgetGroups) => {
        setBudgetGroups(budgetGroups)
      })
    }, []);

    const handleStartDateConfirm = ({ type }, date) => {
      if (type === 'set') {
        setSelectedStartDate(date);
        setFilter(prev => ({ ...prev, start_date: date }));
        setStartDateVisible(false);
      } else {
        toggleStartDatepicker()
      }
    };

    const handleEndDateConfirm = ({ type }, date) => {
      if (type === 'set'){
        setSelectedEndDate(date);
        setFilter(prev => ({ ...prev, end_date: date }));
        setEndDateVisible(false);
      } else {
        toggleEndDatepicker()
      }
    };

    const toggleStartDatepicker = () => {
      setStartDateVisible(!startDateVisible);
    }

    const toggleEndDatepicker = () => {
      setEndDateVisible(!endDateVisible)
    }

    const [groupedData, setGroupedData] = useState([])

    useEffect(() => {
      setSelectedStartDate(new Date(filter.start_date));
      setSelectedEndDate(new Date(filter.end_date));
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
            day: 'numeric'
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
    }, [filter]);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="filter-alt" size={32} />
        </TouchableOpacity>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Transactions</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalContent}>
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Date Range</Text>
                  <View style={styles.dateInputs}>
                    {startDateVisible && (
                      <DateTimePicker 
                        mode='date'
                        display='spinner'
                        value={selectedStartDate}
                        onChange={handleStartDateConfirm}
                      />
                    )}
                    <Pressable onPress={toggleStartDatepicker}>
                      <TextInput 
                        placeholder='Start date'
                        value={selectedStartDate.toLocaleDateString()}
                        onChangeText={(text) => setSelectedStartDate(new Date(text))}
                        placeholderTextColor="#11182744"
                        style={styles.dateInput}
                        editable={false}
                      />  
                    </Pressable>
                    <Text>-</Text>
                    {endDateVisible && (
                      <DateTimePicker 
                        mode='date'
                        display='spinner'
                        value={selectedEndDate}
                        onChange={handleEndDateConfirm}
                      />
                    )}
                    <Pressable onPress={toggleEndDatepicker}>
                      <TextInput 
                        placeholder='End date'
                        value={selectedEndDate.toLocaleDateString()}
                        onChangeText={(text) => setSelectedEndDate(new Date(text))}
                        placeholderTextColor="#11182744"
                        style={styles.dateInput}
                        editable={false}
                      />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Account</Text>
                  <Picker
                    selectedValue={filter.account}
                    onValueChange={(itemValue) => setFilter(prev => ({ ...prev, account: itemValue }))}
                    style={styles.picker}
                  >
                    <Picker.Item label="All Accounts" value={null} />
                    {accounts.map((account) => (
                      <Picker.Item key={account.id} label={account.name} value={account.id} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Category</Text>
                  <Picker
                    selectedValue={filter.category}
                    onValueChange={(itemValue) => setFilter(prev => ({ ...prev, category: itemValue }))}
                    style={styles.picker}
                  >
                    <Picker.Item label="All Categories" value={null} />
                    {categories.map((item) => (
                      <Picker.Item key={item.id} label={item.name.replace('_', ' ').replace(/\w/, c => c.toUpperCase())} value={item.id} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Budget Group</Text>
                  <Picker
                    selectedValue={filter.budget_group}
                    onValueChange={(itemValue) => setFilter(prev => ({ ...prev, budget_group: itemValue }))}
                    style={styles.picker}
                  >
                    <Picker.Item label="All Budget Groups" value={null} />
                    {budgetGroups.map((item) => (
                      <Picker.Item key={item.id} label={item.name.replace('_', ' ').replace(/\w/, c => c.toUpperCase())} value={item.id} />
                    ))}
                  </Picker>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textStyle}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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