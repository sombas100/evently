import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
} from "../features/event/eventSlice";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid2,
  Divider,
  CircularProgress,
} from "@mui/material";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.event
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = () => {
    if (editingEventId) {
      dispatch(updateEvent({ ...formData, eventId: editingEventId }));
    } else {
      dispatch(createEvent(formData));
    }
    setFormData({ title: "", description: "", date: "", location: "" });
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEdit = (event: {
    eventId: number;
    title: string;
    description: string;
    date: string;
    location: string;
  }) => {
    setFormData(event);
    setEditingEventId(event.eventId);
  };

  const handleDelete = (eventId: number) => {
    dispatch(deleteEvent(eventId));
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  return (
    <div className="max-w-5xl w-screen mx-auto mt-10">
      <Typography variant="h4">Admin Dashboard</Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateOrUpdate();
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {editingEventId ? "Update Event" : "Create Event"}
        </Button>
      </form>

      <Divider style={{ margin: "70px 0" }} />

      <Typography variant="h5">Current Events</Typography>
      <Grid2 container spacing={3} style={{ marginTop: "10px" }}>
        {events.map((event) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={event.eventId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{event.title}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2">
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">{event.location}</Typography>
                <Button
                  onClick={() => handleEdit(event)}
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(event.eventId)}
                  variant="contained"
                  color="error"
                  style={{ marginTop: "10px", marginLeft: "5px" }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default AdminDashboard;
