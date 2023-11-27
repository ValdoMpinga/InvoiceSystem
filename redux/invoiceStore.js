import { createSlice } from '@reduxjs/toolkit'

const invoiceSlice = createSlice(
    {
        name: 'invoice',
        initialState:
        {
            testString: "Something",
            showCustomerModal: false,
            productQuantities: {},
            customers: {},
        },
        reducers: {
            setTestString(state, action)
            {
                state.testString = action.payload
            }, 
            setShowCustomerModal(state, action)
            {
                state.showCustomerModal = action.payload
            },
            setProductQuantities(state, action)
            {
                state.productQuantities = action.payload
            },
            setCustomers(state, action)
            {
                state.customers = action.payload
            },
        }
    }
)

export const { setTestString, setShowCustomerModal, setProductQuantities, setCustomers } = invoiceSlice.actions

export default invoiceSlice.reducer
