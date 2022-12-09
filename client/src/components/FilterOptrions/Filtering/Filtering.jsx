import * as actions from '../../../redux/actions'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { collections } from '../../../collections.json'


export default function Filtering(){
    //aqui van los estados de filtado que se encuentran en redux/reducer.
    const [selectedCollection, setSelectedCollection] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedState, setSelectedState] = useState("")

    const dispatch = useDispatch();

    const categories = ['Cars', 'Monkeys', 'Dogs', 'People']
    const states = ['Buy Now', 'Auction', 'All']

    console.log(selectedCategory)
    console.log(selectedCollection)
    console.log(selectedState)
    const selectCollection = (e) => {
        setSelectedCollection(e.target.value);
        dispatch(actions.filterCollection(e.target.value))
    }
    const selectCategory = (e) => {
        setSelectedCategory(e.target.value)
        dispatch(actions.filterCategory(e.target.value))
    }
    const selectState = (e) => {
        setSelectedState(selectedState);
        dispatch(actions.filterState(e.target.value))
    }

    return (
        <>
        <div className='options-container'>
            <label className='label' htmlFor="genres">Collections: </label>
            <div className='button-list' name="genres" id="">
                {collections.map(collection => {
                    return <button 
                    key={collection.name}
                    value={collection.name}
                    onClick={(e)=>{selectCollection(e)}}
                    id={selectedCollection.includes(collection.name)? "selected" : ""} //esto es para cambiar el css depende de si lo seleccione cambia el css.
                    className="option-btn btn-filter"
                    >
                        {collection.name}
                    </button>
                })}
            </div>
        </div>
        <div className='options-container'>
            <label className='label' htmlFor="genres">Categories: </label>
            <div className='button-list' name="genres" id="">
                {categories.map(category => {
                    return <button 
                    key={category}
                    value={category}
                    onClick={(e)=>{selectCategory(e)}}
                    id={selectedCategory.includes(category)? "selected" : ""} //esto es para cambiar el css depende de si lo seleccione cambia el css.
                    className="option-btn btn-filter"
                    >
                        {category}
                    </button>
                })}
            </div>
        </div>
        <div className='options-container'>
            <label className='label' htmlFor="genres">State: </label>
            <div className='button-list' name="genres" id="">
                {/*mapeo los botones que activarian los filtros.*/}
                {states.map(state => {
                    return <button 
                    key={state}
                    value={state}
                    onClick={(e)=>{selectState(e)}}
                    id={selectedState.includes(state)? "selected" : ""} //esto es para cambiar el css depende de si lo seleccione cambia el css.
                    className="option-btn btn-filter"
                    >
                        {state}
                    </button>
                })}
            </div>
        </div>
        </>
    )
}