import { Text, View, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '../lib/utils';

export default function Transaction ({icon, description, account, amount, color}) {

  return (
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
      <Text style={styles.amount}>
        {formatCurrency(amount)}
      </Text>
    </View>
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
    opacity:.6
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
    padding:5,
    borderRadius:23,
    borderWidth: 2,
  },
  amount:{
    fontSize:17,
    fontFamily:'Montserrat-Bold, Segoe-UI, Sans-Serif',
    fontWeight:900
  }
});
