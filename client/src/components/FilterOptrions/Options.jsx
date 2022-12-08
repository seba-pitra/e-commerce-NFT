import * as actions from '../../redux/actions'
import Ordering from './Ordering/Ordering';
import Filtering from './Filtering/Filtering';
import PriceSelector from './PriceSelector/PriceSelector';
import NFTSPerPageSelector from './NFTSPerPageSelector/NFTSPerPageSelector';
import { useDispatch } from 'react-redux';

export default function Options(){
    const dispatch = useDispatch();

    return (
        <>
            <Ordering/>
            <Filtering/>
            <PriceSelector/>
            {/* <NFTSPerPageSelector/> */}

            <div className='options-container'>
                {/*boton de reseteo de filtros.*/}
            <button
                className='option-btn'
                onClick={()=>{/* dispatch(actions.resetFilters()) */}}
                >Reset Filters
            </button>
            </div>
        </>
    )

}