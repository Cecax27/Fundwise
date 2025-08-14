import React, { useState, useEffect, useMemo } from 'react';
import { View, Alert, ScrollView, TextInput, Text, TouchableOpacity, Switch, KeyboardAvoidingView, Platform } from 'react-native'
import { makeStyles } from '../../../assets/uiStyles'
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router'
import { getAccountsTypes, addAccount } from '../../../lib/supabase/transactions'
import { useTheme } from '../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { ACCOUNT_COLORS } from '../../../constants/colors';
import { ACCOUNT_ICONS } from '../../../constants/icons';

export default function NewAccount () {
    const { theme } = useTheme()
    const styles = useMemo(() => makeStyles(theme), [theme])

    const router = useRouter()
    const [accountsTypes, setAccountsTypes] = useState([])
    const [succesful, setSuccesful] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        account_type: 1,
        color: '#111827',
        icon: 'credit-card',
        cutoff_day: null,
        bank_name: null,
        is_primary_account: null,
        credit_limit: null,
        platform: null,
        initial_amount: null,
        estimated_return_rate: null,
        loan_amount: null,
        interest_rate: null
    })

    useEffect(() => {
        const fetchAccountsTypes = async () => {
            const accountsTypesData = await getAccountsTypes()
            setAccountsTypes(accountsTypesData)
        }
        fetchAccountsTypes()
    }, [])

    const onClose = () => {
        router.replace('/(tabs)/accounts')
    }

    useEffect(() => {
        if (succesful !== null) {
            if (succesful) {
                Alert.alert('Success', 'Account added successfully!')
                onClose()
            } else {
                Alert.alert('Error', 'A error occured trying add an account. Try it again.')
            }
        }
    }, [succesful])
    
    const handleSubmit = async () => {
        const response = await addAccount(formData)
        setSuccesful(response)
    }

    return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
            >
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>New Account</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.modalContent}
                    keyboardShouldPersistTaps='handled'
                >

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Account Name</Text>
                            <TextInput
                                placeholder='My super account'
                                value={formData.name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                style={styles.textInput}
                                placeholderTextColor={theme.subtext}
                            />
                        </View>
                        
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Bank Name</Text>
                            <TextInput
                                placeholder='Leave blank if you want'
                                value={formData.bank_name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, bank_name: text }))}
                                style={styles.textInput}
                                placeholderTextColor={theme.subtext}
                            />
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Color</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                            {ACCOUNT_COLORS.map(color => (
                                <TouchableOpacity
                                key={color}
                                onPress={() => setFormData(prev => ({ ...prev, color }))}
                                style={{ backgroundColor: color, width: 30, height: 30, margin: 5, borderRadius: 20 }}
                                />
                            ))}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Icon</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 25 }}>
                                {ACCOUNT_ICONS.map(icon => (
                                    <TouchableOpacity
                                        key={icon.name}
                                        onPress={() => setFormData(prev => ({ ...prev, icon: icon.name }))}
                                        style={{ 
                                            width: 40, 
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 30,
                                            backgroundColor: formData.icon === icon.name ? '#e3e3e3' : '#f5f5f5'
                                        }}
                                    >
                                        <Icon name={icon.name} size={24} color={formData.color} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Primary Account</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Switch 
                                    trackColor={{ false: theme.surface, true: theme.subtext }}
                                    thumbColor={theme.primary}
                                    ios_backgroundColor="#ccc"
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, is_primary_account: value }))}
                                    value={formData.is_primary_account}
                                    />
                                {formData.is_primary_account && 
                                <Text style={{ fontSize: 10, color: theme.subtext, fontVariant: 'italic'}}>
                                    If you have another primary account, it will be replaced.
                                </Text>}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Account Type</Text>
                            <View style={{ width: '100%' }}>
                                <Picker
                                    selectedValue={formData.account_type}
                                    onValueChange={(itemValue) => setFormData(prev => ({ ...prev, account_type: itemValue }))}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select account type" value={null} />
                                    {accountsTypes.map((accountType) => (
                                        <Picker.Item key={accountType.id} label={accountType.type.replace('_', ' ').replace(/\w/, c => c.toUpperCase())} value={accountType.id} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {formData.account_type === 2 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Cuttoff Day</Text>
                            <TextInput
                                placeholder='Cuttof Day'
                                value={formData.cutoff_day}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, cutoff_day: text }))}
                                keyboardType='numeric'
                                style={styles.textInput}
                            />
                        </View>)}

                        {formData.account_type === 2 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Credit Limit</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Icon name="attach-money" size={20} color="#666" />
                                <TextInput
                                    placeholder='$0.00'
                                    value={formData.credit_limit}
                                    onChangeText={(text) => {
                                        const cleanedText = text.replace(/[^0-9.]/g, '');
                                        const value = cleanedText.replace(/\.(?=.*\.)/g, '');
                                        setFormData(prev => ({ ...prev, credit_limit: value }));
                                    }}
                                    keyboardType='numeric'
                                    style={[styles.textInput, { flex: 1 }]}
                                />
                            </View>
                        </View>)}

                        {formData.account_type === 4 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Platform</Text>
                            <TextInput
                                placeholder='Where are you saving you money'
                                value={formData.platform}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, platform: text }))}
                                keyboardType='text'
                                style={styles.textInput}
                            />
                        </View>)}
                        
                        {formData.account_type === 4 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Initial Amount</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Icon name="attach-money" size={20} color="#666" />
                                <TextInput
                                    placeholder='How much money do you have now'
                                    value={formData.initial_amount}
                                    onChangeText={(text) => {
                                        const cleanedText = text.replace(/[^0-9.]/g, '');
                                        const value = cleanedText.replace(/\.(?=.*\.)/g, '');
                                        setFormData(prev => ({ ...prev, initial_amount: value }));
                                    }}
                                    keyboardType='numeric'
                                    style={[styles.textInput, { flex: 1 }]}
                                />
                            </View>
                        </View>)}

                        {formData.account_type === 4 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Estimated Return Date</Text>
                            <TextInput
                                placeholder='Percentage per year'
                                value={formData.estimated_return_rate}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, estimated_return_rate: text }))}
                                keyboardType='decimal-pad'
                                style={styles.textInput}
                            />
                        </View>)}

                        {formData.account_type === 5 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Loan Amount</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Icon name="attach-money" size={20} color="#666" />
                                <TextInput
                                    placeholder='How much money do you have now'
                                    value={formData.loan_amount}
                                    onChangeText={(text) => {
                                        const cleanedText = text.replace(/[^0-9.]/g, '');
                                        const value = cleanedText.replace(/\.(?=.*\.)/g, '');
                                        setFormData(prev => ({ ...prev, loan_amount: value }));
                                    }}
                                    keyboardType='numeric'
                                    style={[styles.textInput, { flex: 1 }]}
                                />
                            </View>
                        </View>)}

                        {formData.account_type === 5 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Loan Interest Rate</Text>
                            <TextInput
                                placeholder='Percentage per year'
                                value={formData.interest_rate}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, interest_rate: text }))}
                                keyboardType='decimal-pad'
                                style={styles.textInput}
                            />
                        </View>)}

                    </ScrollView>
                    
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.textStyle}>Add Account</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
    )
}