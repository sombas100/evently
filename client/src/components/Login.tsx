import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { login } from "../features/auth/authSlice";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(login({ username, email, password }));

    if (login.fulfilled.match(resultAction)) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error("Login failed!");
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
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <p className="my-3 text-sm">
            Don't have a evently account?{" "}
            <Link to="/register">
              <span className="text-blue-400 hover:text-blue-700 hover:cursor-pointer">
                Register here
              </span>
            </Link>
          </p>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Login;
