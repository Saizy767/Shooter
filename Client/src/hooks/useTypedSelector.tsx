import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../redux/rootReducer'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector