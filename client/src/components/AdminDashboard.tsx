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
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.event
  );

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (event: {
    eventId: number;
    title: string;
    description: string;
    date: string;
    location: string;
  }) => {
    setFormData(event);
    setEditingEventId(event.eventId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormData({ title: "", description: "", date: "", location: "" });
    setEditingEventId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    dispatch(createEvent(formData));
    setFormData({ title: "", description: "", date: "", location: "" });
  };

  const handleUpdate = () => {
    if (editingEventId) {
      dispatch(updateEvent({ ...formData, eventId: editingEventId }));
      setFormData({ title: "", description: "", date: "", location: "" });
    }
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
          handleCreate();
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
          Create Event
        </Button>
      </form>

      <Divider style={{ margin: "70px 0" }} />

      <Typography className="bg-zinc-100 p-2" variant="h5">
        Current Events
      </Typography>
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
                  onClick={() => handleOpen(event)}
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

      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Update Event
          </Typography>
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
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Update Event
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
