import * as actions from '../../../redux/actions'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import './Ordering.css'

export default function Ordering(){
    //dos estados uno el estado de la flecha que indica si el orden es ascendente o descendente y otro, global, que hace referencia al orden si es alfabetico o por rating.
    const [currentArrowState, setCurrentArrowState] = useState(true);
    const currentOrder = useSelector(state => state.order);

    const dispatch = useDispatch();

    //funcion para revertir el orden de las tarjetas y cambiar la direccion de la flecha.
    const reverseAndOrder = () => {
        setCurrentArrowState(!currentArrowState);
        dispatch(actions.reverseOrder(currentOrder))
        dispatch(actions.orderNfts())
    }
    //ordernar por alfabetico
    const orderByName = () => {
        dispatch(actions.setOrderType('abc'))
        dispatch(actions.orderNfts())
    }
    //ordernar Por Rating
    const orderByRating = () => {
        dispatch(actions.setOrderType('rating'))
        dispatch(actions.orderNfts())
    }

    return (
        <div className='options-container'>
            <label id="order-by-label" className='label' htmlFor="order">Ordenar Por: </label>
            <div className='button-list'>
                {/*Boton para elegir orden alfabetico*/ }
                <button 
                    id='abc-option'
                    className='option-btn button-order'
                    value="abc" 
                    onClick={()=> orderByName()}
                    >Alfabetico</button>
                {/*boton para elegir orden por rating*/}
                <button
                    id='rating-option'
                    className='option-btn button-order'
                    value="rating"
                    onClick={()=> orderByRating()}
                    >Rating</button>
                    {/*boton para cambiar de orden descendente a ascendente y visceversa*/}
                <button 
                    className='option-btn button-order'
                    dangerouslySetInnerHTML={{ __html: currentArrowState ? '&#8648;' : '&#8650;'}} 
                    onClick={()=> reverseAndOrder()}></button>
            </div>
        </div>
    )
}