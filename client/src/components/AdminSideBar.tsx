import { FaSignInAlt } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";

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
    <div className="absolute max-w-48 h-screen p-12 flex-grow shadow-lg text-black">
      <div className="items-center justify-center">
        <div className="py-3">
          <ul>
            <li
              className={location.pathname === "/admin" ? styles.textHover : ""}
            >
              <Link
                to="/admin"
                className="flex items-center justify-center mb-3 text-lg hover:text-sky-300 transition-all ease-in"
              >
                <MdAdminPanelSettings className="mx-2" />
                Admin
              </Link>
            </li>
            <li className={location.pathname === "/" ? styles.textHover : ""}>
              <Link
                to="/"
                className="flex items-center justify-center text-lg hover:text-sky-300 transition-all ease-in"
              >
                <IoHome className="mx-2" />
                Events
              </Link>
            </li>
          </ul>
        </div>
        {!isAuthenticated ? (
          <div className="py-2">
            <Link
              to="/login"
              className="flex items-center justify-center text-lg hover:text-sky-300 transition-all ease-in"
            >
              <FaSignInAlt className="mx-2" />
              Login
            </Link>
          </div>
        ) : (
          <div className="my-2">
            <Link
              to="/login"
              onClick={() => handleLogout}
              className="flex items-center justify-center text-lg hover:text-sky-300 transition-all ease-in"
            >
              <CgLogOut className="mx-1" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarNavigation;
