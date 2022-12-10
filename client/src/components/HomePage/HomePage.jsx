import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'; 
import Pages from "../Pages/Pages";
import FilterOptions from '../FilterOptrions/Options';
import Loading from '../Loading/Loading';


function HomePage(){
    // eslint-disable-next-line
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();

    useEffect(() => dispatch(actions.getAllNfts()), [dispatch]); // <<-- only on Loading 
    useEffect(() => dispatch(actions.getAllCollections()), [dispatch])
    
    return(
        <>
        <div className='home-background'>
            <div className='home-container'>
                {/*si estoy haciendo todavia el fetch muestro el componente de carga sino muestro los componentes pertenecientes a la homepage*/}
	{/*    {isLoading ?    <<-- commented for Homepage testing only  */} 
            <Loading/> :      
                <>        
                <FilterOptions />
                <Pages />
                </>
	{/*    }    */}
            </div>
        </div>
        </>
    )
}

export default HomePage;
