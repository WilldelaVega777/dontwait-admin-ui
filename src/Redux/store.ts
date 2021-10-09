//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { configureStore }       from '@reduxjs/toolkit'
import transactionReducer       from './Reducers/transaction.reducer'
import systemReducer            from './Reducers/system.reducer'


//---------------------------------------------------------------------
// Configure Store Section
//---------------------------------------------------------------------
const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        system: systemReducer
    }
})


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
