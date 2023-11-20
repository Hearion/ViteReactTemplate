import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    isLoading: false
}

export const appSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    updateState
} = appSlice.actions

export default appSlice.reducer
