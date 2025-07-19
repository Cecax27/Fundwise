import React, { useState, useEffect } from 'react';
import { Modal, View, Pressable, Alert, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from '../assets/uiStyles'
import { getAccounts, getCategories } from '../lib/supabase/transactions';
import { addTransaction } from '../lib/supabase/transactions'
import { Picker } from '@react-native-picker/picker'

export default function AddTransactionModal({ visible, onClose }) {
    const [dateVisible, setDateVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        date: new Date(),
        description: '',
        amount: '',
        account_id: null,
        category_id: null
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

            await addTransaction({date: formattedDate, amount: parsedAmount, description, category_id, account_id})
            Alert.alert('Success', 'Transaction added successfully!')
            onClose()
        } catch (error) {
            Alert.alert('Error', 'Failed to add transaction')
            console.error('Error adding transaction:', error)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add Transaction</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalContent}>
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Date</Text>
                            <View >
                                <View style={styles.dateInputs}>
                                {dateVisible && (
                                    <DateTimePicker 
                                        mode='date'
                                        display='spinner'
                                        value={selectedDate}
                                        onChange={handleDateConfirm}
                                    />
                                )}
                            </View>
                                <Pressable onPress={toggleDatepicker}>
                                    <TextInput 
                                        placeholder='Select date'
                                        value={selectedDate.toLocaleDateString()}
                                        placeholderTextColor="#11182744"
                                        style={styles.dateInput}
                                        editable={false}
                                    />  
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Description</Text>
                            <TextInput
                                placeholder='Enter description'
                                value={formData.description}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Amount</Text>
                            <TextInput
                                placeholder='Enter amount'
                                value={formData.amount}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
                                keyboardType='numeric'
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Account</Text>
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

                        <View style={styles.filterSection}>
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
                        </View>
                    </ScrollView>
                    
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.textStyle}>Add Transaction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
