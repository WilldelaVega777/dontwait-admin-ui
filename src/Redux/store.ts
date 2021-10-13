//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { configureStore }       from '@reduxjs/toolkit'
import transactionReducer       from './Reducers/transaction.reducer'
import categoryReducer          from './Reducers/category.reducer'
import menuItemReducer          from './Reducers/menuItem.reducer'
import reviewReducer            from './Reducers/review.reducer'
import restaurantReducer        from './Reducers/restaurant.reducer'
import userReducer              from './Reducers/user.reducer'
import systemReducer            from './Reducers/system.reducer'


//---------------------------------------------------------------------
// Configure Store Section
//---------------------------------------------------------------------
const store = configureStore({
    reducer: {
        transactions    : transactionReducer,
        categories      : categoryReducer,
        menuItems       : menuItemReducer,
        reviews         : reviewReducer,
        restaurants     : restaurantReducer,
        users           : userReducer,
        system          : systemReducer
    }
})


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
