import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auths";

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn()); // Correctly use isLoggedIn as a function.
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
