import { createSlice } from '@reduxjs/toolkit';

const initialState =
{
    account: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:
    {
        currentAccount(state, action)
        {
            state.account = action.payload;
        }
    }
});

export const { currentAccount } = authSlice.actions;
export default authSlice.reducer;
