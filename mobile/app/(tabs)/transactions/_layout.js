import { Stack } from 'expo-router';
import { TransactionsFiltersProvider} from '../../../contexts/FiltersContext'

export default function TransactionsLayout() {
  return (
  <TransactionsFiltersProvider>
    <Stack 
      screenOptions={{
          headerShown: false
      }}
    />
  </TransactionsFiltersProvider>
    );
}