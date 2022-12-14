import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; 
import Pages from "../Pages/Pages";
import FilterOptions from '../FilterOptrions/Options';
import Loading from '../Loading/Loading';
import "./HomePage.css"


function HomePage(){
    const order = useSelector(state => state.orderDirection)
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAllNfts());
        dispatch(actions.getAllCollections())
    },[dispatch]);

    useEffect(()=> {}, [order])
    return(
        <>
        <div className='home-background'>
            <div className='home-container'>
            { isLoading ? <Loading/> : 
                <div className='container_mainpage'>
                <div className='test'>        
                    <FilterOptions />
                </div>
                <Pages/>
                </div>     
            }
            </div>
        </div>
        </>
    )
}

export default HomePage;
