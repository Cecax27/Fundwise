import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Alert, ScrollView, TextInput, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from '../../../../assets/uiStyles'
import { getAccounts, getCategories, addTransaction, addIncome, updateTransaction } from '../../../../lib/supabase/transactions';
import { Picker } from '@react-native-picker/picker'
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'

import FButton from '../../../../components/fbutton'

export default function EditTransaction() {
    const router = useRouter()
    
    const params = useLocalSearchParams()

    const id = parseInt(params.id)
    const type = params.type
    const [day, month, year] = params.date.split('/')

    console.log(params)

    const [spending, setSpending] = useState(type === 'spending' ? true : false)
    const [dateVisible, setDateVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date(year, month - 1, day))
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        ... params,
        date: new Date(year, month - 1, day),
        account_id: params.account_id ? parseInt(params.account_id) : null,
        category_id: params.category_id ? parseInt(params.category_id) : null,
    })

    useEffect(() => {
        fetchOptions()
    }, [])

    const fetchOptions = async () => {
       getAccounts().then((accounts) => {
            setAccounts(accounts)
        })
        getCategories().then((categories) => {
            setCategories(categories)
        })
    }

    const handleDateConfirm = ({ type }, date) => {
        if (type === 'set') {
            setSelectedDate(date)
            setFormData(prev => ({ ...prev, date: date }))
            setDateVisible(false)
        } else {
            toggleDatepicker()
        }
    }

    const toggleDatepicker = () => {
        setDateVisible(!dateVisible)
    }

    const handleSubmit = async () => {
        try {
            const { date, amount, description, account_id, category_id } = formData
            const formattedDate = date.toISOString().slice(0, 10)
            const parsedAmount = parseFloat(amount)

            const params = {
                id,
                date: formattedDate,
                amount: parsedAmount,
                description,
                account_id,
                ... (type === 'spending' ? { category_id } : {})
            }

            const result = await updateTransaction(id, spending ? 'spendings' : 'incomes', params)
            if (result === true) {
                Alert.alert('Success', 'Transaction updated successfully!')
            } else {
                Alert.alert('Error', 'Failed to update transaction: ' + result.message)
            }
            onClose()
        } catch (error) {
            Alert.alert('Error', 'Failed to add transaction')
            console.error('Error adding transaction:', error)
        }
    }

    const onClose = () => {
        router.replace('/(tabs)/transactions')
    }

    return (
        <View style={styles.container}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit {type}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Icon name="arrow-back" size={20} color="#c2bb00" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={[styles.filterLabel, { marginBottom: 8 }]}>Date</Text>
                    <View style={{ position: 'relative' }}>
                        {dateVisible && (
                            <DateTimePicker 
                                mode='date'
                                display={Platform.OS === 'ios' ? 'default' : 'spinner'}
                                value={selectedDate}
                                onChange={handleDateConfirm}
                                style={{ width: '100%' }}
                            />
                        )}
                        <Pressable 
                            onPress={toggleDatepicker}
                            style={[styles.dateInputContainer]}
                        >
                            <TextInput 
                                placeholder='Select date'
                                value={selectedDate.toLocaleDateString()}
                                placeholderTextColor="#6b7280"
                                style={[styles.dateInput, { color: '#111827' }]}
                                editable={false}
                            />  
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={[styles.filterLabel, { marginBottom: 8 }]}>Description</Text>
                    <TextInput
                        placeholder='Enter description'
                        value={formData.description}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                        style={[styles.textInput]}
                    />
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={[styles.filterLabel, { marginBottom: 8 }]}>Amount</Text>
                    <TextInput
                        placeholder='Enter amount'
                        value={formData.amount}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
                        keyboardType='numeric'
                        style={[styles.textInput]}
                    />
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={[styles.filterLabel, { marginBottom: 8 }]}>Account</Text>
                    <View style={{ width: '100%' }}>
                        <Picker
                            selectedValue={formData.account_id}
                            onValueChange={(itemValue) => setFormData(prev => ({ ...prev, account_id: itemValue }))}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select account" value={null} />
                            {accounts.map((account) => (
                                <Picker.Item key={account.id} label={account.name} value={account.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                {spending && <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>Category</Text>
                    <View style={{ width: '100%' }}>
                        <Picker
                            selectedValue={formData.category_id}
                            onValueChange={(itemValue) => setFormData(prev => ({ ...prev, category_id: itemValue }))}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select category" value={null} />
                            {categories.map((category) => (
                                <Picker.Item key={category.id} label={category.name.replace('_', ' ').replace(/\w/, c => c.toUpperCase())} value={category.id} />
                            ))}
                        </Picker>
                    </View>
                </View>}
            </ScrollView>
            
            <View style={styles.modalFooter}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.textStyle}>Update {type}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const transactionStyles = StyleSheet.create({
    typeButtons: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16
    },
    typeButton: {
        flexGrow: 1,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#053547',
        alignItems: 'center',
        justifyContent: 'center',
    }
})