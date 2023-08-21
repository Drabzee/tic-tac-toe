import { TypedUseSelectorHook, useDispatch as useDispatchNative, useSelector as useSelectorNative } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useSelector:TypedUseSelectorHook<RootState> = useSelectorNative;
export const useDispatch = () => useDispatchNative<AppDispatch>();
