import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

interface AccountItem {
  id: string;
  name: string;
  midName: string;
  userName: string;
  email: string;
  phone: string;
  passWord: string;
}

interface AccountState {
  accounts: AccountItem[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "account"));
      const accountList: AccountItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AccountItem[];
      return accountList;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAccount = createAsyncThunk(
  "account/addAccount",
  async (newAccount: Omit<AccountItem, "id">, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "account"), newAccount);
      return { id: docRef.id, ...newAccount };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async (updatedAccount: AccountItem, { rejectWithValue }) => {
    try {
      const { id, ...accountData } = updatedAccount; // Loại bỏ id khi cập nhật
      await updateDoc(doc(db, "account", id), accountData as Partial<AccountItem>);
      return updatedAccount;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "account", id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Lấy danh sách tài khoản**
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<AccountItem[]>) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // **Thêm tài khoản**
      .addCase(addAccount.fulfilled, (state, action: PayloadAction<AccountItem>) => {
        state.accounts.push(action.payload);
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // **Cập nhật tài khoản**
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<AccountItem>) => {
        const index = state.accounts.findIndex((acc) => acc.id === action.payload.id);
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // **Xóa tài khoản**
      .addCase(deleteAccount.fulfilled, (state, action: PayloadAction<string>) => {
        state.accounts = state.accounts.filter((acc) => acc.id !== action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default accountSlice.reducer;
