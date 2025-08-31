import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Alert, ScrollView, TextInput, Text, TouchableOpacity, Switch, KeyboardAvoidingView, Platform } from 'react-native'
import { makeStyles } from '../../../assets/uiStyles'
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router'
import { getAccountsTypes, addAccount } from '../../../lib/supabase/transactions'
import { useTheme } from '../../../theme/useTheme';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ColorPicker from '../../../components/colorPicker';
import IconPicker from '../../../components/iconPicker';

export default function NewAccount () {
    const { theme } = useTheme()
    const { t } = useTranslation()
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

    const onClose = useCallback(() => {
        router.replace('/(tabs)/accounts')
    }, [router])

    useEffect(() => {
        if (succesful !== null) {
            if (succesful) {
                Alert.alert(t('newAccount.success.title'), t('newAccount.success.message'))
                onClose()
            } else {
                Alert.alert(t('newAccount.error.title'), t('newAccount.error.message'))
            }
        }
    }, [succesful, onClose, t])
    
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
                    <Text style={styles.modalTitle}>{t('newAccount.title')}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.modalContent}
                    keyboardShouldPersistTaps='handled'
                >

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.accountName')}</Text>
                            <TextInput
                                placeholder={t('newAccount.accountNamePlaceholder')}
                                value={formData.name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                style={styles.textInput}
                                placeholderTextColor={theme.subtext}
                            />
                        </View>
                        
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.bankName')}</Text>
                            <TextInput
                                placeholder={t('newAccount.bankNamePlaceholder')}
                                value={formData.bank_name}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, bank_name: text }))}
                                style={styles.textInput}
                                placeholderTextColor={theme.subtext}
                            />
                        </View>

                        <ColorPicker value={formData.color} onPress={(color) => setFormData(prev => ({ ...prev, color }))} />

                        <IconPicker value={formData.icon} onPress={(icon)=>setFormData(prev => ({ ...prev, icon }))} activeColor={formData.color} />


                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.primaryAccount')}</Text>
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
                                    {t('newAccount.primaryAccountWarning')}
                                </Text>}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.accountType')}</Text>
                            <View style={{ width: '100%' }}>
                                <Picker
                                    selectedValue={formData.account_type}
                                    onValueChange={(itemValue) => setFormData(prev => ({ ...prev, account_type: itemValue }))}
                                    style={styles.picker}
                                    dropdownIconColor={theme.text}
                                >
                                    <Picker.Item label={t('newAccount.selectAccountType')} value={null} />
                                    {accountsTypes.map((accountType) => (
                                        <Picker.Item key={accountType.id} label={t(`accounts.types.${accountType.type}`)} value={accountType.id} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {formData.account_type === 2 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.cutoffDay')}</Text>
                            <TextInput
                                placeholder={t('newAccount.cutoffDayPlaceholder')}
                                value={formData.cutoff_day}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, cutoff_day: text }))}
                                keyboardType='numeric'
                                style={styles.textInput}
                            />
                        </View>)}

                        {formData.account_type === 2 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.creditLimit')}</Text>
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
                            <Text style={styles.filterLabel}>{t('newAccount.platform')}</Text>
                            <TextInput
                                placeholder={t('newAccount.platformPlaceholder')}
                                value={formData.platform}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, platform: text }))}
                                keyboardType='text'
                                style={styles.textInput}
                            />
                        </View>)}
                        
                        {formData.account_type === 4 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.initialAmount')}</Text>
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
                            <Text style={styles.filterLabel}>{t('newAccount.estimatedReturnRate')}</Text>
                            <TextInput
                                placeholder={t('newAccount.returnRatePlaceholder')}
                                value={formData.estimated_return_rate}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, estimated_return_rate: text }))}
                                keyboardType='decimal-pad'
                                style={styles.textInput}
                            />
                        </View>)}

                        {formData.account_type === 5 && (
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>{t('newAccount.loanAmount')}</Text>
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
                            <Text style={styles.filterLabel}>{t('newAccount.loanInterestRate')}</Text>
                            <TextInput
                                placeholder={t('newAccount.returnRatePlaceholder')}
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
                            <Text style={styles.textStyle}>{t('newAccount.addAccountButton')}</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
    )
}