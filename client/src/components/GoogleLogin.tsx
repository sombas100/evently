import React from "react";
import { Button } from "@mui/material";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleLogin } from "../features/auth/authSlice";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function GoogleLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const idToken = await resultsFromGoogle.user.getIdToken();
      console.log(resultsFromGoogle);
      if (idToken) {
        toast.success("User successfully logged in!");
        dispatch(googleLogin(idToken));
        navigate("/");
      } else {
        toast.error("Login failed. Please try again later");
      }
    } catch (err: any) {
      console.error("Google login failed", err);
    }
  };
  return (
    <>
      <Button
        onClick={handleGoogleClick}
        sx={{ marginTop: "12px" }}
        fullWidth
        type="button"
        color="secondary"
        variant="outlined"
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
      <ToastContainer />
    </>
  );
}

export default GoogleLogin;
