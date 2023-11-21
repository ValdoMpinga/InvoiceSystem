import { createSlice } from '@reduxjs/toolkit'

const invoiceSlice = createSlice(
    {
        name: 'invoice',
        initialState:
        {
            testString: "Something",
        },
        reducers: {
            setTestString(state, action)
            {
                state.testString = action.payload
            },
        }
    }
)

export const { setTestString } = invoiceSlice.actions

export default invoiceSlice.reducer
