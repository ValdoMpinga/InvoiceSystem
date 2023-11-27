import { createSlice } from '@reduxjs/toolkit'

const invoiceSlice = createSlice(
    {
        name: 'invoice',
        initialState:
        {
            testString: "Something",
            showCustomerModal: false,
            productQuantities: {}
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
        }
    }
)

export const { setTestString, setShowCustomerModal, setProductQuantities } = invoiceSlice.actions

export default invoiceSlice.reducer
