//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { PayloadAction }        from '@reduxjs/toolkit'
import type { RootState }       from '../store'


//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface SystemState {
    showLoading: boolean
    showError: string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: SystemState = {
    showLoading: false,
    showError: ''
}

//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const systemSlice = createSlice({
    name: 'sytem',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.showLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.showError = action.payload
        },
        clearError: (state) => {
            state.showError = ''
        }
    }
})

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export const selectSystem = (state: RootState) => state.system
export const { setLoading, setError, clearError } = systemSlice.actions
export default systemSlice.reducer
