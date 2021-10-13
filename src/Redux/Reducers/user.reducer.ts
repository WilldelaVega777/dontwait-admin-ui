//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import UsersService             from '../../Services/Users'
import IUser                    from '../../Models/Interfaces/IUser'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface UserState {
    users: IUser[]
    loading : boolean
    error   : string | undefined,
    message : string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: UserState = {
    users: [],
    loading: false,
    error: '',
    message: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        return ((await UsersService.getUsers())
            .sort((prev: IUser, next: IUser) =>
                (
                    Date.parse(prev.createdAt as string)
                    -
                    Date.parse(next.createdAt as string)
                )
            ))
    }
)
//---------------------------------------------------------------------
export const addUser = createAsyncThunk(
    'users/addUser',
    async (pNewUser: IUser, { dispatch }) => {
        try
        {
            await UsersService.addUser(pNewUser)
            const action = await dispatch(getUsers())
            return action.payload
        }
        catch (e: any)
        {
            console.error(e)
        }
    }
)
//---------------------------------------------------------------------
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (pUpdatedUser: IUser, { dispatch }) => {
        await UsersService.updateUser(pUpdatedUser)
        const action = await dispatch(getUsers())
        return action.payload
    }
)
//---------------------------------------------------------------------
export const removeUser = createAsyncThunk(
    'users/removeUser',
    async (id: string, { dispatch }) => {
        await UsersService.removeUser(id)
        const action = await dispatch(getUsers())
        return action.payload
    }
)


//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getUsers.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            getUsers.fulfilled,
            (state, { payload }) => {
                state.loading = false
                state.users = payload
            }
        )
        builder.addCase(
            getUsers.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            addUser.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            addUser.fulfilled,
            (state,  action) => {
                state.loading = false
                state.users.concat([action.payload as IUser])
            }
        )
        builder.addCase(
            addUser.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            updateUser.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            updateUser.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            updateUser.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            removeUser.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            removeUser.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
                state.message = 'Record was removed'
            }
        )
        builder.addCase(
            removeUser.rejected,
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
export const selectUsers = (state: RootState) => state.users
export default userSlice.reducer
