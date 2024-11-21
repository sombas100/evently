import React from "react";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { Typography, Container, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { registerForEvent } from "../features/event/eventSlice";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { CgDetailsMore } from "react-icons/cg";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id ?? "0", 10);
  const dispatch = useDispatch<AppDispatch>();

  const event = useSelector((state: RootState) =>
    state.event.events.find((event) => event.eventId === eventId)
  );

  if (!event) {
    return <Typography>No event found</Typography>;
  }

  const handleRegister = (eventId: number) => {
    dispatch(registerForEvent(eventId));
  };

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center items-center relative max-w-full h-screen"
    >
      <div className="justify-center items-center border p-5 flex-">
        <Typography className="my-4" variant="h4">
          {event.title}
        </Typography>
        <Typography className="flex items-start" variant="body1">
          <CgDetailsMore className="mx-2 my-1" /> {event.description}
        </Typography>
        <Typography className="flex items-center" variant="body2">
          <SlCalender className="mx-2 my-1" />{" "}
          {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography className="flex items-center" variant="body2">
          <FaLocationDot className="mx-2 my-2" /> {event.location}
        </Typography>
        <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          onClick={() => handleRegister(event.eventId)}
        >
          Register
        </Button>
      </div>
    </Container>
  );
};

export default EventDetails;
