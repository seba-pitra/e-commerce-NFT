// useLoggedUser.js

import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedUser, logOutUser } from '../redux/actions';
import { useEffect } from 'react';

export function useLoggedUser() {
    // Accede al estado del usuario
    const loggedUser = useSelector(state => state.loggedUser);
    const loginStatus = useSelector(state => state.loginStatus);
    const dispatch = useDispatch();

    // Carga los datos del almacenamiento local al iniciar la aplicación
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('loggedUser'));
        if (storedData) {
            dispatch(updateLoggedUser(storedData));
        }
    }, [loginStatus, Object.keys(loggedUser).length]);

    // Actualiza el almacenamiento local cuando cambia el estado del usuario
    useEffect(() => {
        if (Object.keys(loggedUser).length !== 0) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        }
    }, [loginStatus, Object.keys(loggedUser).length]);

    // Función para limpiar el estado y almacenamiento local del usuario
    function handleLogOut() {
        localStorage.removeItem("loggedUser");
        dispatch(logOutUser());
    }
    //console.log("localStorage "+  localStorage.getItem('loggedUser'))
    //console.log([loggedUser, updateLoggedUser, handleLogOut])

    return [loggedUser, updateLoggedUser, handleLogOut];
}
