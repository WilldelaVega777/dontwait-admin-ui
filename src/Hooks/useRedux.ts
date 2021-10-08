//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { TypedUseSelectorHook }     from 'react-redux'
import { useSelector }              from 'react-redux'
import { useDispatch }              from 'react-redux'
import type { RootState }           from '../Redux/store'
import type { AppDispatch }         from '../Redux/store'


//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
