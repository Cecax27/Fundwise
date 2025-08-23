import { StyleSheet } from 'react-native';

export const makeTransactionDetailsStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    color: theme.text,
    flex: 1,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  amountLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: theme.textSecondary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontFamily: 'Quicksand-Bold',
  },
  amountIncome: {
    color: '#10B981', // Green for income
  },
  amountExpense: {
    color: '#EF4444', // Red for expense
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: theme.textSecondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: theme.text,
    textAlign: 'right',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: theme.primary,
    marginRight: 12,
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginLeft: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
  },
  deleteButtonText: {
    color: '#DC2626',
  },
  icon: {
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: theme.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  transactionTypeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionTypeIconIncome: {
    backgroundColor: '#D1FAE5',
  },
  transactionTypeIconExpense: {
    backgroundColor: '#FEE2E2',
  },
  transactionTypeIconTransfer: {
    backgroundColor: '#E0F2FE',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
