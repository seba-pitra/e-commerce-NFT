import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import useAuth  from '../customHooks/useAuth';

export const ProtectedRoute = ({ render: renderCallback, ...rest }) => {
    const { loginStatus } = useAuth();
    return loginStatus ? <Route {...rest} render={renderCallback} /> : null;
};
