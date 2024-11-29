import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { Typography, Container, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { registerForEvent } from "../features/event/eventSlice";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { CgDetailsMore } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id ?? "0", 10);
  const dispatch = useDispatch<AppDispatch>();
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const event = useSelector((state: RootState) =>
    state.event.events.find((event) => event.eventId === eventId)
  );

  if (!event) {
    return <Typography>No event found</Typography>;
  }

  const handleRegister = (eventId: number) => {
    dispatch(registerForEvent(eventId))
      .unwrap()
      .then(() => {
        toast.success("Successfully registered for the event!");
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Registration failed");
      });
  };
  return (
    <Container
      maxWidth="md"
      className="flex justify-center items-center relative min-h-screen bg-gray-50 p-8 rounded-lg shadow-lg"
      style={{
        backgroundColor: "#f9fafb", // Light gray background
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="p-6"
        style={{
          backgroundColor: "#ffffff", // White card background
          borderRadius: "8px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          className="my-4 font-bold"
          variant="h4"
          style={{ color: "#333333" }} // Darker text
        >
          {event.title}
        </Typography>
        <Typography
          className="flex items-start my-2"
          variant="body1"
          style={{ color: "#555555" }} // Softer text color for description
        >
          <CgDetailsMore className="mx-2 my-1" style={{ color: "#4A90E2" }} />
          {event.description}
        </Typography>
        <Typography
          className="flex items-center my-2"
          variant="body2"
          style={{ color: "#888888" }}
        >
          <SlCalender
            className="mx-2 my-1"
            style={{ color: "#FF9800", fontSize: "18px" }}
          />
          {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography
          className="flex items-center my-2"
          variant="body2"
          style={{ color: "#888888" }}
        >
          <FaLocationDot
            className="mx-2 my-2"
            style={{ color: "#E91E63", fontSize: "18px" }}
          />
          {event.location}
        </Typography>
        <Button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontWeight: "bold",
            backgroundColor: isRegistered ? "#4CAF50" : "#3f51b5", // Green when registered
            color: "#ffffff",
          }}
          variant="contained"
          onClick={() => handleRegister(event.eventId)}
          disabled={isRegistered}
        >
          {isRegistered ? "Registered" : "Register"}
        </Button>
        <Button
          style={{
            marginTop: "20px",
            marginLeft: "12px",
            padding: "12px 24px",
            fontWeight: "bold",
          }}
          variant="contained"
          color="error"
          onClick={() => navigate("/")}
        >
          Main Menu
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default EventDetails;
