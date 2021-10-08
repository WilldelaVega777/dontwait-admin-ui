//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'

import ITransaction             from '../../Models/Interfaces/ITransaction'


//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface TransactionState {
    transactions: ITransaction[]
    loading: boolean
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: TransactionState = {
    transactions: [],
    loading: false
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        const res = await fetch(
            'https://localhost:3002/posts'
        )
    return await (res.json()) as ITransaction[]
})

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
            (state, { payload }) => {
                state.loading = false
            }
        )
    }
})

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export const selectTransactions = (state: RootState) => state.transactions
export default transactionSlice.reducer
