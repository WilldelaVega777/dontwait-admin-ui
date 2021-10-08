//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { configureStore }       from '@reduxjs/toolkit'
import transactionReducer       from './Reducers/transaction.reducer'


//---------------------------------------------------------------------
// Configure Store Section
//---------------------------------------------------------------------
const store = configureStore({
    reducer: {
      transactions: transactionReducer
    }
})


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
