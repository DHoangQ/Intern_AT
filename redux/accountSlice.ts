import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Account {
  id: string;
  name: string;
  midName: string;
  userName: string;
  email: string;
  phone: string;
  passWord: string;
  avatar: string;
}

interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: [],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex((account) => account.id === action.payload.id);
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter((account) => account.id !== action.payload);
    },
  },
});

export const { setAccounts, addAccount, updateAccount, deleteAccount } = accountSlice.actions;
export default accountSlice.reducer;