import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    paddingTop: 20,
    padding: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold'
  },
  closeButton: {
    color: '#053547',
    fontFamily: 'Quicksand-Bold'
  },
  modalContent: {
    width: '100%'
  },
  filterSection: {
    marginBottom: 20,
    width: '100%'
  },
  filterLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 8
  },
  dateInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    width: '48%'
  },
  dateButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium'
  },
  picker: {
    width: '100%',
    height: 50,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Medium',
    borderColor: '#05354730',
    borderWidth: 1
  },
  modalFooter: {
    marginTop: 20,
    width: '100%'
  },
  buttonClose: {
    backgroundColor: '#053547'
  },
  textStyle: {
    color: "white",
    fontFamily: 'Quicksand-Bold'
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain'
  },
  logoText: {
    fontSize: 32, 
    color: '#e1523d', 
    fontFamily: 'Quicksand-Bold', 
    marginBottom: 20
  },
  title: {
    fontSize: 24, 
    fontFamily: 'Quicksand-Bold', 
    marginTop: 20
  },
  label: {
    fontSize: 16, 
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#05354730',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    color: '#444444',
    fontFamily: 'Montserrat-Medium',
  },
  button: {
    backgroundColor: '#053547',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', 
    fontFamily: 'Montserrat-SemiBold'
  },
  dateInput: {
    borderColor: '#05354730',
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Medium'
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },

  formSection: {
    width: '100%'
  },
  p:{
    fontFamily:'Montserrat-Regular',
    fontSize: 12,
  }
});