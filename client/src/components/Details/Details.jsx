import { useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import * as actions from '../../redux/actions'; 
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

function Details(props){
    //{image, name, id, owner, price, lastSale,viewsCount,SalesHistory}
    const { id } = props.match.params
    const nftDetail = useSelector(state => state.nftDetail)
    const isLoading = useSelector(state => state.isLoading)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.getNFTDetail(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return(
        <>
        {
            // si esta cargando muestra el componente de carga caso contrario muestra la el componente de detalle.
            isLoading ? <Loading/> : 
            <div className='details-container'>
                {/*link to go back to home*/}
                <Link
                    className='link'
                    to='/home'>
                    <button className='details-go-back-btn'>
                            &#x3c;
                    </button>
                </Link>

                {/*aca va la estructura del detalle del nft*/ }
                
            </div>
        }   
        </>
    )
}

export default Details;