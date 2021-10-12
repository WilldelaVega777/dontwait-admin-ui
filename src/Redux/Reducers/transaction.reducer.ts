//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import TransactionsService      from '../../Services/Transactions'
import ITransaction             from '../../Models/Interfaces/ITransaction'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface TransactionState {
    transactions: ITransaction[]
    loading : boolean
    error   : string | undefined,
    message : string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: '',
    message: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        return ((await TransactionsService.getTransactions())
            .sort((prev: ITransaction, next: ITransaction) =>
                (
                    Date.parse(prev.createdAt as string)
                    -
                    Date.parse(next.createdAt as string)
                )
            ))
    }
)
//---------------------------------------------------------------------
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (pNewTransaction: ITransaction, { dispatch }) => {
        try
        {
            await TransactionsService.addTransaction(pNewTransaction)
            const action = await dispatch(getTransactions())
            return action.payload
        }
        catch (e: any)
        {
            console.error(e)
        }
    }
)
//---------------------------------------------------------------------
export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (pUpdatedTransaction: ITransaction) => {
        return await TransactionsService.updateTransaction(pUpdatedTransaction)
    }
)
//---------------------------------------------------------------------
export const removeTransaction = createAsyncThunk(
    'transactions/removeTransaction',
    async (id: string) => {
        return await TransactionsService.removeTransaction(id)
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

        builder.addCase(
            addTransaction.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            addTransaction.fulfilled,
            (state,  { payload: ITransaction } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            addTransaction.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
                state.transactions.concat([action.payload as ITransaction])
            }
        )

        builder.addCase(
            updateTransaction.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            updateTransaction.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            updateTransaction.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            removeTransaction.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            removeTransaction.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
                state.message = payload
            }
        )
        builder.addCase(
            removeTransaction.rejected,
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
