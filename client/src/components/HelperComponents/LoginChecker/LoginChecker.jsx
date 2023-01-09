import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { auth } from '../../../firebase';
import { logInUser } from '../../../redux/actions'

export default function LoginChecker() {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.loginStatus)

    useEffect(() => {
    if (!loginStatus) {
        history.push('/');
    } else {
        if (auth.currentUser) {
        dispatch(logInUser(auth.currentUser.uid))
        history.push('/home');
        }
    }
    }, [loginStatus]);
    
        return null;
    }