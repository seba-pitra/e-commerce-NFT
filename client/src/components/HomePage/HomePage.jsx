import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'; 
import Pages from "../Pages/Pages";
import FilterOptions from '../FilterOptrions/Options';
import Loading from '../Loading/Loading';


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
	{isLoading 
        ?
        <Loading/> :      
        <>        
        <FilterOptions />
        <Pages/>
        </>
    }
            </div>
        </div>
        </>
    )
}

export default HomePage;
