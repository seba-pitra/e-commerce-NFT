import * as actions from '../../../redux/actions'
import { useSelector } from 'react-redux';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { collections } from '../../../collections.json'


export default function Filtering(){
    //aqui van los estados de filtado que se encuentran en redux/reducer.
    const [selectedCollection, setSelectedCollection] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedState, setSelectedState] = useState("")

    const dispatch = useDispatch();

    const nfts = useSelector(state => state.nfts);

    const collections = useSelector(state => state.collections);

    const arrCategories = nfts.map(e => e.category)
    const categories = []
    arrCategories.filter(e => { if ( categories.indexOf(e) === -1 ) categories.push(e) })
    const states = ['Buy Now', 'Auction', 'All']

    // console.log(selectedCategory)
    // console.log(selectedCollection)
    // console.log(selectedState)
    const selectCollection = (e) => {
        setSelectedCollection(e.target.value);
        dispatch(actions.filterCollection(e.target.value))
    }
    const selectCategory = (e) => {
        setSelectedCategory(e.target.value)
        dispatch(actions.filterCategory(e.target.value))
    }
    const selectState = (e) => {
        setSelectedState(e.target.value);
        dispatch(actions.filterState(e.target.value))
    }

    return (
        <>
        <div className='options-container'>
            <label className='label' htmlFor="genres">Collections: </label>
            <div className='button-list' name="genres" id="">
            <select onChange={(e)=>{selectCollection(e)}}>
                {collections.map(collection => {
                    return <option 
                    key={collection.id}
                    value={collection.id}
                    id={selectedCollection.includes(collection.id)? "selected" : ""} //esto es para cambiar el css depende de si lo seleccione cambia el css.
                    className="option-btn btn-filter"
                    >
                        {collection.id}
                    </option>
                })}
            </select>
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