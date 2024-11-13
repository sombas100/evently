import { FaSignInAlt } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SideBarNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex max-w-48 h-screen p-12 flex-grow shadow-lg text-black">
      <div className="items-center justify-center">
        <div className="py-3">
          <Link
            to="/"
            className="flex items-center justify-center text-lg hover:text-sky-300 transition-all ease-in"
          >
            <IoHome className="mx-2" />
            Events
          </Link>
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
