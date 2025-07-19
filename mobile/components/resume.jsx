import { View, Text, Alert} from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/client";
import styles from "../assets/uiStyles"
import { StyleSheet } from "react-native";
import { getMonthlyBalance, getMonthlyIncomes, getMonthlySpendings } from '../lib/supabase/transactions'


export default function Resume() {
    const [session, setSession] = useState(null)
    const [monthBalance, setMonthBalance] = useState(0.0)
    const [incomes, setIncomes] = useState(0.0)
    const [spendings, setSpendings] = useState(0.0)
    const [percentage, setPercentage] = useState(0.0)
    
    useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
              setSession(session)
            })
            supabase.auth.onAuthStateChange((_event, session) => {
              setSession(session)
            })
            const getData = async () => {
                
                getMonthlyBalance().then(({ data, error }) => {
                  if (error) Alert.alert(error.message)
                  else {
                    setMonthBalance(data)
                  }
                })
                getMonthlyIncomes().then(({ data, error }) => {
                  if (error) Alert.alert(error.message)
                  else {
                    setIncomes(data)
                  }
                })
                getMonthlySpendings().then(({ data, error }) => {
                  if (error) Alert.alert(error.message)
                  else {
                    setSpendings(data)
                  }
                })
            }
            getData().then(setPercentage((incomes - spendings) / incomes * 100))
            
          }, []);

    useEffect(() => {
        setPercentage((incomes - spendings) / incomes * 100)
    }, [incomes, spendings])
      
    return (
        <View style={resumeStyles.resumeContainer}>
            <Text style={resumeStyles.monthBalance}>
                ${monthBalance?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </Text>
            <Text style={resumeStyles.percentage}>
                {percentage.toFixed(1)}% left
            </Text>
            <View style={resumeStyles.detailsContainer}>
                <View style={resumeStyles.detailContainer}>
                    <Text style={resumeStyles.label}>
                        Incomes
                    </Text>
                    <Text style={resumeStyles.incomes}>
                        ${incomes?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </Text>
                </View>
                <View>
                    <Text style={resumeStyles.label}>
                        Spendings
                    </Text>
                    <Text style={resumeStyles.spendings}>
                        ${spendings?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const resumeStyles = StyleSheet.create({
    resumeContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthBalance:{
        fontSize: 48,
        fontFamily: 'Montserrat-SemiBold'
    }, 
    percentage:{
        fontSize: 18,
        color: "#c2bb00"
    },
    incomes:{
        fontSize: 24, 
        fontFamily: 'Montserrat-SemiBold'
    },
    spendings:{
        fontSize: 24,
        fontFamily: 'Montserrat-SemiBold'
    },
    detailsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailContainer:{
        width: '50%',

    },
    label:{
        fontSize: 18,
        color:"#003447",
        opacity:.4
    }
})