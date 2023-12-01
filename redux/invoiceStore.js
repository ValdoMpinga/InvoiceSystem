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
            products: [],
            invoices: []
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
            setProducts(state, action)
            {
                state.products = action.payload
            },
            setInvoices(state, action)
            {
                state.invoices = action.payload
            },
        }
    }
)

export const { setTestString, setShowCustomerModal, setProductQuantities, setProducts, setCustomers, setInvoices } = invoiceSlice.actions

export default invoiceSlice.reducer
