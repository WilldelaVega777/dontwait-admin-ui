//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import MenuItemsService         from '../../Services/MenuItems'
import IMenuItem                from '../../Models/Interfaces/IMenuItem'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface MenuItemState {
    menuItems: IMenuItem[]
    loading : boolean
    error   : string | undefined,
    message : string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: MenuItemState = {
    menuItems: [],
    loading: false,
    error: '',
    message: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getMenuItems = createAsyncThunk(
    'menuItems/getMenuItems',
    async () => {
        return ((await MenuItemsService.getMenuItems())
            .sort((prev: IMenuItem, next: IMenuItem) =>
                (
                    Date.parse(prev.createdAt as string)
                    -
                    Date.parse(next.createdAt as string)
                )
            ))
    }
)
//---------------------------------------------------------------------
export const addMenuItem = createAsyncThunk(
    'menuItems/addMenuItem',
    async (pNewMenuItem: IMenuItem, { dispatch }) => {
        try
        {
            await MenuItemsService.addMenuItem(pNewMenuItem)
            const action = await dispatch(getMenuItems())
            return action.payload
        }
        catch (e: any)
        {
            console.error(e)
        }
    }
)
//---------------------------------------------------------------------
export const updateMenuItem = createAsyncThunk(
    'menuItems/updateMenuItem',
    async (pUpdatedMenuItem: IMenuItem, { dispatch }) => {
        await MenuItemsService.updateMenuItem(pUpdatedMenuItem)
        const action = await dispatch(getMenuItems())
        return action.payload
    }
)
//---------------------------------------------------------------------
export const removeMenuItem = createAsyncThunk(
    'menuItems/removeMenuItem',
    async (id: string, { dispatch }) => {
        await MenuItemsService.removeMenuItem(id)
        const action = await dispatch(getMenuItems())
        return action.payload
    }
)


//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const menuItemSlice = createSlice({
    name: 'menuItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getMenuItems.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            getMenuItems.fulfilled,
            (state, { payload }) => {
                state.loading = false
                state.menuItems = payload
            }
        )
        builder.addCase(
            getMenuItems.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            addMenuItem.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            addMenuItem.fulfilled,
            (state,  action ) => {
                state.loading = false
                state.menuItems.concat([action.payload as IMenuItem])
            }
        )
        builder.addCase(
            addMenuItem.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            updateMenuItem.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            updateMenuItem.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            updateMenuItem.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            removeMenuItem.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            removeMenuItem.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
                state.message = 'Record was removed'
            }
        )
        builder.addCase(
            removeMenuItem.rejected,
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
export const selectMenuItems = (state: RootState) => state.menuItems
export default menuItemSlice.reducer
