import * as actions from '../../../redux/actions'

export default function Filtering(){
    //aqui van los estados de filtado que se encuentran en redux/reducer.

    return (
        <>
        <div className='options-container'>
            <label className='label' htmlFor="">Tipo: </label>
            
            <div className='button-list'>
                <button
                    className='option-btn'
                    value="db"
                    onClick={(e)=>{/**/}}
                    >filtro 1</button>
                <button
                    className='option-btn'
                    value="api"
                    onClick={(e)=>{filterByOwner(e)}}
                    >filtro 2
                </button>
                <button
                    className='option-btn'
                    value="all"
                    onClick={(e)=>{filterByOwner(e)}}
                    >filtro 3
                </button>
            </div>
        </div>
        <div className='options-container'>
            <label className='label' htmlFor="genres">Categorias: </label>
            <div className='button-list' name="genres" id="">
                {/*mapeo los botones que activarian los filtros.*/}
                {categories.map(category => {
                    return <button 
                    onClick={(e)=>{/*despacho funcion de filtrado*/}}
                    id={selectedFilter.includes(category) ? "selected" : ""} //esto es para cambiar el css depende de si lo seleccione cambia el css.
                    className="option-btn btn-filter"
                    >
                        {category}
                    </button>
                })}
            </div>
        </div>
        </>
    )
}