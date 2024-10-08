import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, failingNavigator = "/login" }) => {
    if (!user) {
        return <Navigate to={failingNavigator} />;
    }
    return children;
};

export default ProtectedRoute;