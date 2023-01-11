import { useDispatch, useSelector} from 'react-redux';
import * as actions from '../redux/actions'
import { useEffect, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


export default function useAuth() {
    const loggedUser = useSelector(state => state.loggedUser);
    const loginStatus = useSelector(state => state.loginStatus);
    const dispatch = useDispatch();
    const history = useHistory();

    
    return { loggedUser, loginStatus };
}