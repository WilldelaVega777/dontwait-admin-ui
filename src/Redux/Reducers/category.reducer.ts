//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import CategoriesService        from '../../Services/Categories'
import ICategory                from '../../Models/Interfaces/ICategory'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface CategoryState {
    categories: ICategory[]
    loading : boolean
    error   : string | undefined,
    message : string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: '',
    message: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        return ((await CategoriesService.getCategories())
            .sort((prev: ICategory, next: ICategory) =>
                (
                    Date.parse(prev.createdAt as string)
                    -
                    Date.parse(next.createdAt as string)
                )
            ))
    }
)
//---------------------------------------------------------------------
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (pNewCategory: ICategory, { dispatch }) => {
        try
        {
            await CategoriesService.addCategory(pNewCategory)
            const action = await dispatch(getCategories())
            return action.payload
        }
        catch (e: any)
        {
            console.error(e)
        }
    }
)
//---------------------------------------------------------------------
export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (pUpdatedCategory: ICategory, { dispatch }) => {
        await CategoriesService.updateCategory(pUpdatedCategory)
        const action = await dispatch(getCategories())
        return action.payload
    }
)
//---------------------------------------------------------------------
export const removeCategory = createAsyncThunk(
    'categories/removeCategory',
    async (id: string, { dispatch }) => {
        await CategoriesService.removeCategory(id)
        const action = await dispatch(getCategories())
        return action.payload
    }
)


//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getCategories.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            getCategories.fulfilled,
            (state, { payload }) => {
                state.loading = false
                state.categories = payload
            }
        )
        builder.addCase(
            getCategories.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            addCategory.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            addCategory.fulfilled,
            (state,  action) => {
                state.loading = false
                state.categories.concat([action.payload as ICategory])
            }
        )
        builder.addCase(
            addCategory.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            updateCategory.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            updateCategory.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            updateCategory.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            removeCategory.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            removeCategory.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
                state.message = 'Record was removed'
            }
        )
        builder.addCase(
            removeCategory.rejected,
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
export const selectCategories = (state: RootState) => state.categories
export default categorySlice.reducer
