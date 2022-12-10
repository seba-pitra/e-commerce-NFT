import * as actions from '../../../redux/actions'
import { useState } from 'react'
import { useDispatch } from "react-redux";

import './Ordering.css'

export default function Ordering(){
    const [nameOrderUp, setNameOrderUp] = useState(true);
    const [priceOrderUp, setPriceOrderUp] = useState(true);
    const [amountOrderUp, setAmountOrderUp] = useState(true);
    const [releaseOrderUp, setReleaseOrderUp] = useState(true);

    const dispatch = useDispatch();

    const orderByName = (e) => {
        setNameOrderUp(!nameOrderUp)
        dispatch(actions.orderName(e.target.value))
    }

    const orderByPrice = (e) => {
        setPriceOrderUp(!priceOrderUp)
        dispatch(actions.orderPrice(e.target.value))
    }

    const orderByAmount = (e) => {
        setAmountOrderUp(!amountOrderUp)
        dispatch(actions.orderAmount(e.target.value))
    }

    const orderByRelease  = (e) => {
        setReleaseOrderUp(!releaseOrderUp)
        dispatch(actions.orderCreatedAt(e.target.value))
    }

    return (
        <div className='options-container'>
            <label id="order-by-label" className='label' htmlFor="order">Ordenar Por: </label>
            <div className='button-list'>
                {/*Boton para elegir orden alfabetico*/ }
                <button 
                    id='name-option'
                    className={nameOrderUp ? 'btn-order-up' : 'btn-order-down'}
                    value={nameOrderUp ? "a-z" : "z-a"}
                    onClick={(e)=> orderByName(e)}
                    >Name</button>
                {/*boton para elegir orden por rating*/}
                <button
                    id='price-option'
                    className={priceOrderUp ? 'btn-order-up' : 'btn-order-down'}
                    value={priceOrderUp ? "up-down" : "down-up"}
                    onClick={(e)=> orderByPrice(e)}
                    >Price</button>
                <button
                    id='amount-option'
                    className={amountOrderUp ? 'btn-order-up' : 'btn-order-down'}
                    value={amountOrderUp ? "up-down" : "down-up"}
                    onChange={(e)=> console.log("changed value" + e.target.value)}
                    onClick={(e)=> orderByAmount(e)}
                    >Amount</button>
                <button
                    id='releasedate-option'
                    className={releaseOrderUp ? 'btn-order-up' : 'btn-order-down'}
                    value={releaseOrderUp ? "up-down" : "down-up"}
                    onClick={(e)=> orderByRelease(e)}
                    >Release date</button>
                {/*boton para cambiar de orden descendente a ascendente y visceversa*/}
                {/* <button 
                    className='option-btn button-order'
                    dangerouslySetInnerHTML={{ __html: currentArrowState ? '&#8648;' : '&#8650;'}} 
                    onClick={(e)=> reverseAndOrder(e)}></button> */}
            </div>
        </div>
    )
}