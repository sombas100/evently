import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { login } from "../features/auth/authSlice";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(
        "Login attempt failed. Please check your credentials and try again."
      );
    }
  }, [loading, error]);
  return (
    <div className="flex justify-center items-center max-w-full mt-48">
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          margin="normal"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
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
  );
};

export default Login;
