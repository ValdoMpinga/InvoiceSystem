import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceStore'


export default configureStore({
    reducer:
    {
        invoice: invoiceReducer,
    },
});
