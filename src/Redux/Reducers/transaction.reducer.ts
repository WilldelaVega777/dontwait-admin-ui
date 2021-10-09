//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { PayloadAction }        from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import TransactionsService      from '../../Services/Transactions'
import ITransaction             from '../../Models/Interfaces/ITransaction'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface TransactionState {
    transactions: ITransaction[]
    loading: boolean
    error: string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        return await TransactionsService.getTransactions()
    }
)

//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getTransactions.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            getTransactions.fulfilled,
            (state, { payload }) => {
                state.loading = false
                state.transactions = payload
            }
        )
        builder.addCase(
            getTransactions.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )
    }
})

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export const selectTransactions = (state: RootState) => state.transactions
export default transactionSlice.reducer
