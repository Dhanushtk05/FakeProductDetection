import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute ({children ,isAdmin}) {
    const { isAuthenticated , user} = useSelector(state => state.authState)

    if(!isAuthenticated) {
        return <Navigate to="/" />
    }

    if(isAuthenticated) {
        if(isAdmin === true  && user.role !== "admin") {
            return <Navigate to="/home" />
        }
        return children;
    }
}