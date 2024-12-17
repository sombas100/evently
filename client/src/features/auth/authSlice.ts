import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../../config/axiosInstance';
import { jwtDecode, JwtPayload } from 'jwt-decode';


interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
}

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (idToken: string, { rejectWithValue, dispatch }) => {
      try {
        const res = await client.post('/api/auth/verify-token',  idToken);
        const { token } = res.data;
  
        dispatch(setAuthToken(token))
        return token;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Google login failed');
      }
    }
  );

  export const setAuthToken = (token: string) => ({
    type: 'auth/setAuthToken',
    payload: token,
  })

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string, email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await client.post('/api/user/login', credentials);
            const data = res.data.token;

            const decodedToken: JwtPayload = jwtDecode(data);
            const expirationTime = decodedToken.exp! * 1000;

            localStorage.setItem('token', data);
            localStorage.setItem('tokenExpiration', expirationTime.toString());
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { username: string, email: string, password: string, isAdmin: boolean }, { rejectWithValue }) => {
        try {
            const res = await client.post('/api/user/register', credentials);
            const data = res.data.token;

            const decodedToken: JwtPayload = jwtDecode(data);
            const expirationTime = decodedToken.exp! * 1000;

            localStorage.setItem('token', data);
            localStorage.setItem('tokenExpiration', expirationTime.toString());
            return data;
        } catch (err:any) {
            return rejectWithValue(err.response?.data || 'Registration failed');
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
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
            localStorage.setItem('token', action.payload);
            state.isAuthenticated = true;
            state.loading = false; 
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(googleLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;