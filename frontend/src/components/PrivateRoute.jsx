import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const accessToken = useSelector((state) => state.vedic.accessToken);

    return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 