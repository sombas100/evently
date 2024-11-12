import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../config/axiosInstance";

interface Event {
    eventId: number;
    title: string;
    description: string;
    date: string;
    location: string;
}

interface EventState {
    events: Event[];
    loading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
}

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const res = await client.get('/api/event');
            const data = res.data;
            return data;
        } catch (err) {
            return rejectWithValue('Failed to fetch events');
        }
    }
);

export const registerForEvent = createAsyncThunk(
    'event/registerForEvent',
    async (eventId: number, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState() as { auth: { token: string } };
            await client.post('/api/registration', { eventId }, { headers: { Authorization: `Bearer ${auth.token}` } });
        } catch (err) {
            return rejectWithValue('Registration failed');
        }
    }
);

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
            state.events = action.payload;
            state.loading = false;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(registerForEvent.rejected, (state, action) => {
            state.error = action.payload as string;
        })
    }
})

export default eventSlice.reducer;