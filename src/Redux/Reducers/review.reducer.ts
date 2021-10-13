//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { createSlice }          from '@reduxjs/toolkit'
import { createAsyncThunk }     from '@reduxjs/toolkit'
import type { RootState }       from '../store'
import ReviewsService           from '../../Services/Reviews'
import IReview                  from '../../Models/Interfaces/IReview'

//---------------------------------------------------------------------
// Slice Interface Definition Section
//---------------------------------------------------------------------
interface ReviewState {
    reviews: IReview[]
    loading : boolean
    error   : string | undefined,
    message : string | undefined
}

//---------------------------------------------------------------------
// Initial State Section
//---------------------------------------------------------------------
// Define the initial state using that type
const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: '',
    message: ''
}

//---------------------------------------------------------------------
// Thunks Section
//---------------------------------------------------------------------
export const getReviews = createAsyncThunk(
    'reviews/getReviews',
    async () => {
        return ((await ReviewsService.getReviews())
            .sort((prev: IReview, next: IReview) =>
                (
                    Date.parse(prev.createdAt as string)
                    -
                    Date.parse(next.createdAt as string)
                )
            ))
    }
)
//---------------------------------------------------------------------
export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (pNewReview: IReview, { dispatch }) => {
        try
        {
            await ReviewsService.addReview(pNewReview)
            const action = await dispatch(getReviews())
            return action.payload
        }
        catch (e: any)
        {
            console.error(e)
        }
    }
)
//---------------------------------------------------------------------
export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async (pUpdatedReview: IReview, { dispatch }) => {
        await ReviewsService.updateReview(pUpdatedReview)
        const action = await dispatch(getReviews())
        return action.payload
    }
)
//---------------------------------------------------------------------
export const removeReview = createAsyncThunk(
    'reviews/removeReview',
    async (id: string, { dispatch }) => {
        await ReviewsService.removeReview(id)
        const action = await dispatch(getReviews())
        return action.payload
    }
)


//---------------------------------------------------------------------
// Slice Definition Section
//---------------------------------------------------------------------
export const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getReviews.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            getReviews.fulfilled,
            (state, { payload }) => {
                state.loading = false
                state.reviews = payload
            }
        )
        builder.addCase(
            getReviews.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            addReview.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            addReview.fulfilled,
            (state,  action) => {
                state.loading = false
                state.reviews.concat([action.payload as IReview])
            }
        )
        builder.addCase(
            addReview.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            updateReview.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            updateReview.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
            }
        )
        builder.addCase(
            updateReview.rejected,
            (state, action) => {
                state.loading = false
                state.error = (action.error.message)
            }
        )

        builder.addCase(
            removeReview.pending,
            (state, { payload }) => {
                state.loading = true
            }
        )
        builder.addCase(
            removeReview.fulfilled,
            (state,  { payload } ) => {
                state.loading = false
                state.message = 'Record was removed'
            }
        )
        builder.addCase(
            removeReview.rejected,
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
export const selectReview = (state: RootState) => state.reviews
export default reviewSlice.reducer
