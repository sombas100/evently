import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { register } from "../features/auth/authSlice";
import {
  TextField,
  Button,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("user");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      register({ username, email, password, isAdmin: userRole === "admin" })
    );

    if (register.fulfilled.match(resultAction)) {
      toast.success("Registration successful");
      navigate("/");
    } else {
      toast.error("Registration failed!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center max-w-full text-5xl mt-7">
        <h1>
          Event<span className="text-blue-500">ly</span>
        </h1>
      </div>
      <div className="flex justify-center items-center max-w-full mt-48">
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <RadioGroup
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            row
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>

          <p className="my-3 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-400 hover:text-blue-700 hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Register;
