import { createSlice } from '@reduxjs/toolkit'

const invoiceSlice = createSlice(
    {
        name: 'invoice',
        initialState:
        {
            testString: "Something",
            showCustomerModal: false
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
        }
    }
)

export const { setTestString, setShowCustomerModal } = invoiceSlice.actions

export default invoiceSlice.reducer
