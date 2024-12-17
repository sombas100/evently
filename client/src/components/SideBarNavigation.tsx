import { FaSignInAlt } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SideBarNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
    textHover: "text-sky-700",
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className="sm:absolute sm:h-32 sm:w-screen"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "250px",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#1a1a2e",
        color: "#ffffff",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                textDecoration: "none",
                color: "#ffffff",
                padding: "10px 15px",
                borderRadius: "8px",
                transition: "background-color 0.3s",
              }}
              className="hover:bg-blue-600"
            >
              <MdAdminPanelSettings
                style={{ marginRight: "10px", fontSize: "20px" }}
              />
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                textDecoration: "none",
                color: "#ffffff",
                padding: "10px 15px",
                borderRadius: "8px",
                transition: "background-color 0.3s",
                backgroundColor:
                  location.pathname === "/" ? "#30475e" : "transparent",
              }}
              className="hover:bg-blue-600"
            >
              <IoHome style={{ marginRight: "10px", fontSize: "20px" }} />
              Events
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {!isAuthenticated ? (
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              textDecoration: "none",
              color: "#ffffff",
              padding: "10px 15px",
              borderRadius: "8px",
              transition: "background-color 0.3s",
            }}
            className="hover:bg-blue-600"
          >
            <FaSignInAlt style={{ marginRight: "10px", fontSize: "20px" }} />
            Login
          </Link>
        ) : (
          <Link
            to="/login"
            onClick={() => handleLogout()}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              textDecoration: "none",
              color: "#ffffff",
              padding: "10px 15px",
              borderRadius: "8px",
              transition: "background-color 0.3s",
            }}
            className="hover:bg-red-600"
          >
            <CgLogOut style={{ marginRight: "10px", fontSize: "20px" }} />
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBarNavigation;
