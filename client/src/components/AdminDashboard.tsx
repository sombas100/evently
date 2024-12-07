import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
} from "../features/event/eventSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { CgDetailsMore } from "react-icons/cg";

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

  const handleCreate = async () => {
    try {
      await dispatch(createEvent(formData)).unwrap();
      setFormData({ title: "", description: "", date: "", location: "" });
      toast.success("Event was successfully created");
    } catch (error: any) {
      toast.error(error || "An error occured while creating the event");
    }
  };

  const handleUpdate = () => {
    if (editingEventId) {
      try {
        dispatch(updateEvent({ ...formData, eventId: editingEventId }));
        setFormData({ title: "", description: "", date: "", location: "" });
        toast.success("The event has been successfully updated");
        handleClose();
      } catch (error: any) {
        toast.error(error || "An error occured while updating the event");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = (eventId: number) => {
    dispatch(deleteEvent(eventId));
    toast.success("The event was successfully deleted");

    if (!eventId) {
      return toast.error("There was an issue deleting the event");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  return (
    <div className="max-w-5xl h-auto w-screen mx-auto pt-8">
      <Typography variant="h4" className="mb-6">
        Admin Dashboard
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        className="bg-gray-100 p-6 rounded shadow-md"
      >
        <Typography variant="h6" className="mb-4">
          Create New Event
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Event
        </Button>
      </form>

      <Divider className="my-10" />

      <Typography variant="h5" className="bg-zinc-100 p-3 rounded shadow-md">
        Current Events
      </Typography>
      <Grid2 container spacing={3} className="mt-5">
        {events.map((event) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={event.eventId}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" className="mb-4">
                  {event.title}
                </Typography>
                <Typography variant="body2" className="flex items-start mb-2">
                  <CgDetailsMore className="mr-2 text-lg" />
                  {event.description}
                </Typography>
                <Typography variant="body2" className="flex items-center mb-2">
                  <SlCalender className="mr-2 text-lg" />
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" className="flex items-center">
                  <FaLocationDot className="mr-2 text-lg" />
                  {event.location}
                </Typography>
              </CardContent>
              <div className="p-3 flex justify-center space-x-3">
                <Button
                  onClick={() => handleOpen(event)}
                  variant="outlined"
                  color="secondary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(event.eventId)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle} className="p-6 bg-white rounded shadow-lg">
          <Typography variant="h6" className="mb-4">
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
          <div className="mt-4 flex justify-end space-x-3">
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Update
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
