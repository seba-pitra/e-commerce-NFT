// useLoggedUser.js

import { useSelector, useDispatch } from 'react-redux';
import { updateLoggedUser, logOutUser } from './actions';
import { useEffect } from 'react';

export default function useLoggedUser() {
    // Accede al estado del usuario
    const loggedUser = useSelector(state => state.loggedUser);
    const dispatch = useDispatch();

    // Carga los datos del almacenamiento local al iniciar la aplicación
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('loggedUser'));
        if (storedData) {
        dispatch(updateLoggedUser(storedData));
        }
    }, []);

    // Actualiza el almacenamiento local cuando cambia el estado del usuario
    useEffect(() => {
        if (loggedUser) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        }
    }, [loggedUser]);

    // Función para limpiar el estado y almacenamiento local del usuario
    function handleLogOut() {
        localStorage.removeItem("loggedUser");
        dispatch(logOutUser());
    }

    return [loggedUser, updateLoggedUser, handleLogOut];
}