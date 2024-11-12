import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function TokenExpirationChecker() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = () => {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      if (tokenExpiration) {
        const currentTime = new Date().getTime();
        if (currentTime > parseInt(tokenExpiration)) {
          dispatch(logout());
          navigate("/login");
        }
      }
    };
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 6000);
    return () => clearInterval(interval);
  }, [dispatch, navigate]);
}

export default TokenExpirationChecker;
