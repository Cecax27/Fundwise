import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '../lib/utils';
import { useRouter } from 'expo-router';

export default function Transaction ({icon, description, account, amount, color, id, income = false}) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => {router.push({pathname: `/transactions/details/${id}`, params: {income : income}})}}>
    <View style={styles.container}>
      <MaterialIcons name={ icon } style={[styles.icon, { borderColor: color }]} size={28} color={color}/>
      <View style={styles.info}>
        <Text style={styles.description}>
          {description}
        </Text>
        <Text style={styles.account}>
          {account}
        </Text>
      </View>
      <Text style={[styles.amount, income ? styles.incomeText : styles.spendingText]}>
        {(income ? '+ ' : '- ' )+ formatCurrency(amount)}
      </Text>
    </View> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    marginBottom: 22,
  },
  description: {
    fontFamily: 'Montserrat, Segoe-UI, Sans-Serif',
    fontSize: 16,
    fontWeight: 'bold',
  },
  account: {
    fontFamily:'Montserrat, Segoe-UI, Sans-Serif',
    fontSize: 12,
    color:"#0c0c0c",
    opacity:.4
  },
  info: {
    justifyContent: 'center',
    flexGrow: 1,
    marginLeft:12 
  },
  icon: {
    height: 42,
    width: 42,
    resizeMode: 'center',
    backgroundColor: "#fff",
    padding:6,
  },
  amount:{
    fontSize:17,
    fontFamily:'Montserrat-Bold, Segoe-UI, Sans-Serif',
    fontWeight:900
  },
  incomeText: {
    color: '#C2BB00'
  },
  spendingText: {
    color: '#E1523D'
  }
});
