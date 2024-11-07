import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../config/axiosInstance';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await client.post('/api/user/login', credentials);
            const data = res.data.token;
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder)  => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            state.loading = false; 
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;