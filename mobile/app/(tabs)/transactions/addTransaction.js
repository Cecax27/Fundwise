import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Pressable, Alert, ScrollView, TextInput, Text, TouchableOpacity, Platform, Switch } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { makeStyles } from '../../../assets/uiStyles'
import { getAccounts, getCategories, addTransaction, addIncome, addTransfer, addDeferred } from '../../../lib/supabase/transactions';
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '../../../theme/useTheme';
import Snackbar from '../../../components/Snackbar';
import { useTranslation } from 'react-i18next';
import FButton from '../../../components/fbutton'

export default function AddTransaction() {
    const router = useRouter()
    const { t } = useTranslation();
    
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const [type, setType] = useState('spending')
    const [dateVisible, setDateVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        date: new Date(),
        description: '',
        amount: '',
        account_id: null,
        category_id: null,
        to_account_id: null,
        months: null
    })

    useEffect(() => {
        fetchOptions()
    }, [])

    const fetchOptions = async () => {
       getAccounts().then((accounts) => {
            if (accounts.length === 0) {
                Alert.alert(t('common.error'), t('transactions.error.noAccounts'))
                router.replace('/(tabs)/accounts/newaccount')
            }
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
            const { date, amount, description, account_id, category_id, months } = formData
            const formattedDate = date.toISOString().slice(0, 10)
            const parsedAmount = parseFloat(amount)
            let result = {}

            if (!account_id){
                Alert.alert(t('common.error'), t('transactions.error.noAccountSelected'))
                return
            }

            if (type === 'spending') {
                result = await addTransaction({date: formattedDate, amount: parsedAmount, description, category_id, account_id})
            } else if (type === 'deferred') {
                result = await addDeferred({date: formattedDate, amount: parsedAmount, description, category_id, account_id, months})
            } else if (type === 'income') {
                result = await addIncome({date: formattedDate, amount: parsedAmount, description, account_id})
            } else if (type === 'transfer') {
                const { to_account_id, account_id} = formData
                result = await addTransfer({date: formattedDate, amount: parsedAmount, description, from_account_id: account_id, to_account_id})
            }
            if (result !== true) {
                Alert.alert(t('transactions.error.title'), t('transactions.error.message') + (result?.message ? ` (${result.message})` : ''))
            }
            global.showSnackbar(t('transactions.success'))
            onClose()
        } catch (error) {
            Alert.alert(t('transactions.error.title'), t('transactions.error.addFailed'))
            console.error('Error adding transaction:', error)
        }
    }

    const onClose = () => {
        router.replace('/(tabs)/transactions')
    }

    return (
        <View style={styles.container}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('transactions.addTransaction')}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Icon name="arrow-back" size={20} color={theme.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
                <View style={[styles.filterSection, transactionStyles.typeButtons]}>
                    <FButton text={t('transactions.types.spending')} onPress={() => setType('spending')} active={(type==='spending' || type==='deferred') ? true : false}/>
                    <FButton text={t('transactions.types.income')} onPress={() => setType('income')} active={type==='income' ? true : false}/>
                    <FButton text={t('transactions.types.transfer')} onPress={() => setType('transfer')} active={type==='transfer' ? true : false}/>
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={styles.filterLabel}>{t('transactions.date')}</Text>
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
                                placeholder={t('transactions.date')}
                                value={selectedDate.toLocaleDateString()}
                                style={[styles.dateInput, { color: theme.text }]}
                                editable={false}
                            />  
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={styles.filterLabel}>{t('transactions.description')}</Text>
                    <TextInput
                        placeholder={t('transactions.descriptionPlaceholder')}
                        value={formData.description}
                        placeholderTextColor={theme.subtext}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                        style={[styles.textInput]}
                    />
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={styles.filterLabel}>{t('transactions.amount')}</Text>
                    <TextInput
                        placeholder={t('transactions.amountPlaceholder')}
                        value={formData.amount}
                        placeholderTextColor={theme.subtext}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
                        keyboardType='numeric'
                        style={[styles.textInput]}
                    />
                </View>

                <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={styles.filterLabel}>{type==='transfer' ? t('transactions.fromAccount') : t('transactions.account')}</Text>
                    <View>
                        <Picker
                            selectedValue={formData.account_id}
                            onValueChange={(itemValue) => setFormData(prev => ({ ...prev, account_id: itemValue }))}
                            style={styles.picker}
                            dropdownIconColor={theme.text}
                        >
                            <Picker.Item label={t('transactions.selectAccount')} value={null} />
                            {accounts.map((account) => (
                                <Picker.Item key={account.id} label={account.name} value={account.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                {type==='transfer' && <View style={[styles.filterSection, { marginBottom: 16 }]}>
                    <Text style={styles.filterLabel}>{t('transactions.toAccount')}</Text>
                    <View style={{ width: '100%'}}>
                        <Picker
                            selectedValue={formData.to_account_id}
                            onValueChange={(itemValue) => setFormData(prev => ({ ...prev, to_account_id: itemValue }))}
                            style={styles.picker}
                            dropdownIconColor={theme.text}
                        >
                            <Picker.Item label={t('transactions.selectAccount')} value={null} />
                            {accounts.map((account) => (
                                <Picker.Item key={account.id} label={account.name} value={account.id} />
                            ))}
                        </Picker>
                    </View>
                </View>}

                {(type==='spending' || type==='deferred') && <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>{t('transactions.category')}</Text>
                    <View style={{ width: '100%' }}>
                        <Picker
                            selectedValue={formData.category_id}
                            onValueChange={(itemValue) => setFormData(prev => ({ ...prev, category_id: itemValue }))}
                            style={styles.picker}
                            dropdownIconColor={theme.text}
                        >
                            <Picker.Item label={t('transactions.selectCategory')} value={null} />
                            {categories.map((category) => (
                                <Picker.Item key={category.id} label={t(`transactions.categories.${category.name}`)} value={category.id} />
                            ))}
                        </Picker>
                    </View>
                </View>}

                {(type==='spending' || type==='deferred') && <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>{t('transactions.deferredSpending')}</Text>
                        <Switch 
                            value={type==='deferred'}
                            onValueChange={(value) => setType(value ? 'deferred' : 'spending')}
                            trackColor={{ false: theme.surface, true: theme.subtext }}
                            thumbColor={theme.primary}
                        />
                </View>}

                {type==='deferred' && <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>{t('transactions.months')}</Text>
                        <TextInput
                        placeholder="12"
                        value={formData.months}
                        placeholderTextColor={theme.subtext}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, months: text }))}
                        keyboardType='numeric'
                        style={[styles.textInput]}
                    />
                </View>}
            </ScrollView>
            
            <View style={styles.modalFooter}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.textStyle}>{t('transactions.add')} {t(`transactions.types.${type}`)}</Text>
                </TouchableOpacity>
            </View>
            <Snackbar />
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