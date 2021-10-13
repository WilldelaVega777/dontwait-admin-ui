//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import RestaurantsService       from '../../Services/Restaurants'
import IRestaurant              from '../../Models/Interfaces/IRestaurant'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface RestaurantState {
    restaurants: IRestaurant[]
    loading : boolean
    error   : string | undefined,
    message : string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: RestaurantState = {
    restaurants: [],
    loading: false,
    error: '',
    message: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getRestaurants = createAsyncThunk(
    'restaurants/getRestaurants',
    async () => {
        return ((await RestaurantsService.getRestaurants())
            .sort((prev: IRestaurant, next: IRestaurant) =>
                (
                    Date.parse(prev.createdAt as string)
                    -
                    Date.parse(next.createdAt as string)
                )
            ))
    }
)
//---------------------------------------------------------------------
export const addRestaurant = createAsyncThunk(
    'restaurants/addRestaurant',
    async (pNewRestaurant: IRestaurant, { dispatch }) => {
        try
        {
            await RestaurantsService.addRestaurant(pNewRestaurant)
            const action = await dispatch(getRestaurants())
            return action.payload
        }
        catch (e: any)
        {
            console.error(e)
        }
    }
)
//---------------------------------------------------------------------
export const updateRestaurant = createAsyncThunk(
    'restaurants/updateRestaurant',
    async (pUpdatedRestaurant: IRestaurant, { dispatch }) => {
        await RestaurantsService.updateRestaurant(pUpdatedRestaurant)
        const action = await dispatch(getRestaurants())
        return action.payload
    }
)
//---------------------------------------------------------------------
export const removeRestaurant = createAsyncThunk(
    'restaurants/removeRestaurant',
    async (id: string, { dispatch }) => {
        await RestaurantsService.removeRestaurant(id)
        const action = await dispatch(getRestaurants())
        return action.payload
    }
)


//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getRestaurants.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            getRestaurants.fulfilled,
            (state, { payload }) => {
                state.loading = false
                state.restaurants = payload
            }
        )
        builder.addCase(
            getRestaurants.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            addRestaurant.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            addRestaurant.fulfilled,
            (state,  action) => {
                state.loading = false
                state.restaurants.concat([action.payload as IRestaurant])
            }
        )
        builder.addCase(
            addRestaurant.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            updateRestaurant.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            updateRestaurant.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            updateRestaurant.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            removeRestaurant.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            removeRestaurant.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
                state.message = 'Record was removed'
            }
        )
        builder.addCase(
            removeRestaurant.rejected,
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
export const selectRestaurants = (state: RootState) => state.restaurants
export default restaurantSlice.reducer
