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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ width: "250px", marginRight: "16px" }}>
        <SideBarNavigation />
      </div>

      <Grid container spacing={4} padding={4} style={{ flexGrow: 1 }}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.eventId}>
            <Card
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "8px",
                  }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#555",
                  }}
                >
                  <CgDetailsMore
                    style={{ marginRight: "8px", color: "#0077b6" }}
                  />
                  {event.description}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                    color: "#555",
                  }}
                >
                  <SlCalender
                    style={{ marginRight: "8px", color: "#2a9d8f" }}
                  />
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                    color: "#555",
                  }}
                >
                  <FaLocationDot
                    style={{ marginRight: "8px", color: "#e76f51" }}
                  />
                  {event.location}
                </Typography>
                <Link
                  to={`/${event.eventId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "16px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      padding: "8px 16px",
                    }}
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
