// useLoggedUser.js

import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedUser, logOutUser } from '../redux/actions';
import { useEffect } from 'react';

export function useLoggedUser() {
    const loggedUser = useSelector(state => state.loggedUser);
    const loginStatus = useSelector(state => state.loginStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('loggedUser'));
        if (storedData) {
            dispatch(updateLoggedUser(storedData));
        }
    }, [loginStatus, Object.keys(loggedUser).length]);

    useEffect(() => {
        if (Object.keys(loggedUser).length !== 0) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        }
    }, [loginStatus, Object.keys(loggedUser).length]);

    function handleLogOut() {
        localStorage.removeItem("loggedUser");
        dispatch(logOutUser());
    }
    return [loggedUser, updateLoggedUser, handleLogOut];
}
