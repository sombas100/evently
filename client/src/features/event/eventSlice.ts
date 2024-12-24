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
            await client.post('/api/registration', eventId , { headers: { Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
             }, 
            });
        } catch (err) {
            return rejectWithValue('Registration failed');
        }
    }
);

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (eventData: Omit<Event, 'eventId'>, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState() as { auth: { token: string } };
            const res = await client.post('/api/event', eventData, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            const data = res.data;
            return data;
        } catch (err: any) {
            if (err.res && err.res.status === 403) {
                return rejectWithValue('You are not authorized to create events');
            }
            return rejectWithValue('Failed to create event');
        }
    }
);

export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async (eventData: Event, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState() as { auth: { token: string } };

            if (!eventData.eventId) {
                throw new Error('Invalid event ID');
            }
            console.log(eventData)
            const res = await client.put(`/api/event/${eventData.eventId}`, eventData, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            const data = res.data;
            return data;
        } catch (err: any) {
            console.error(err.response?.data || err.message);
            return rejectWithValue('Failed to update event');
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (eventId: number, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState() as { auth: { token: string } };
             await client.delete(`/api/event/${eventId}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            return eventId;
        } catch (error) {
            return rejectWithValue('Failed to delete event')
        }
    }
)

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
        .addCase(registerForEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerForEvent.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(registerForEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.events.push(action.payload);
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            const index = state.events.findIndex((e) => e.eventId === action.payload.eventId);
            if (index !== 1) {
                state.events[index] = action.payload;
            }
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.events = state.events.filter((e) => e.eventId !== action.payload)
        })
    }
})

export default eventSlice.reducer;