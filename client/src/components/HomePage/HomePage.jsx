import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; 
import Pages from "../Pages/Pages";
import FilterOptions from '../FilterOptrions/Options';
import Loading from '../Loading/Loading';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';


function HomePage(){
    // eslint-disable-next-line

    const orderType = useSelector(state => state.orderType);
    // eslint-disable-next-line
    const order = useSelector(state => state.order);
    const isLoading = useSelector(state => state.isLoading);

    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(actions.getAllNfts());
    }, [dispatch]); // <<-- only on Loading 
    
    return(
        <>
        <div className='home-background'>
            <div className='home-container'>
                {/*si estoy haciendo todavia el fetch muestro el componente de carga sino muestro los componentes pertenecientes a la homepage*/}
	{/*    {isLoading ?    <<-- commented for Homepage testing only  */} 
            <Loading/> :      
                <>        
                <FilterOptions/>
                <Pages />
		<Footer />
                </>
	{/*    }    */}
            </div>
        </div>
        </>
    )
}

export default HomePage;
