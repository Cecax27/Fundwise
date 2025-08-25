import { View, Text, KeyboardAvoidingView, Platform, TextInput, Pressable } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { makeStyles } from '../../../assets/uiStyles'
import { useTheme } from '../../../theme/useTheme'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../../../lib/supabase/client'
import DeviceInfo from 'react-native-device-info';

export default function BugReport(){
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const router = useRouter();
    const { t } = useTranslation();

    const [formData, setFormData]   = useState({})

    const handleSubmit = () =>{
        try {
            const deviceInfoJSON = {
                os:  DeviceInfo.getSystemName(),
                os_version: DeviceInfo.getSystemVersion(),
                brand: DeviceInfo.getBrand(),
                model: DeviceInfo.getModel(),
                build_number: DeviceInfo.getBuildNumber(),
            }
            supabase
                .from('reports')
                .insert([{
                    device_info:JSON.stringify(deviceInfoJSON),
                    app_version:DeviceInfo.getVersion(),
                    message:formData.message
                }])
                .select();
        } catch (error) {
            console.log(error);
        } finally {
            router.back();
            router.push('/configuration/bugreportconfirmation');
        }
    }

    return(
        <>
        <Stack.Screen 
        options={{
            title: t('configuration.bugreport.title'),
            headerRight:()=>(
                <Pressable onPress={handleSubmit}>
                        <Ionicons name="send" size={24} color={theme.text}/>
                </Pressable>
            )
        }}
        />
        <KeyboardAvoidingView 
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={100}
            >
            <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>{t('configuration.bugreport.messageLabel')}</Text>
                <TextInput
                placeholder={t('configuration.bugreport.messagePlaceholder')}
                value={formData.message}
                onChangeText={(text) => setFormData(prev => ({ ...prev, message: text }))}
                style={styles.textInput}
                placeholderTextColor={theme.subtext}
                multiline
                numberOfLines={10}
                />
            </View>
        </KeyboardAvoidingView>
        </>
    )
}