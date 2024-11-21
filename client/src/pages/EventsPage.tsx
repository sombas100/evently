import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchEvents } from "../features/event/eventSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { CgDetailsMore } from "react-icons/cg";
import SideBarNavigation from "../components/SideBarNavigation";
import { Link } from "react-router-dom";

const EventsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "250px", marginRight: "16px" }}>
        <SideBarNavigation />
      </div>

      <Grid container spacing={4} padding={4}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.eventId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{event.title}</Typography>
                <Typography className="flex items-center mx-5" variant="body2">
                  <CgDetailsMore className="mx-2 my-2" /> {event.description}
                </Typography>
                <Typography className="flex items-center mx-5" variant="body2">
                  <SlCalender className="mx-2 my-1" />{" "}
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography className="flex items-center" variant="body2">
                  <FaLocationDot className="mx-2 my-1" /> {event.location}
                </Typography>
                <Link to={`/${event.eventId}`}>
                  <Button
                    style={{ marginTop: "16px" }}
                    variant="contained"
                    color="primary"
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EventsPage;
