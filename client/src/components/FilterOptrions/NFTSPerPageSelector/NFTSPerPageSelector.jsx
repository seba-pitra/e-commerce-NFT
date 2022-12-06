import * as actions from '../../../redux/actions'
import { useDispatch } from "react-redux"

export default function NFTSPerPageSelector(){

    const validValues = [15, 20, 50];
    const dispatch = useDispatch()

    return (
        <div className='games-per-page-container'>
        <label className='gpp-label'htmlFor="gamesPerPage">Resultados Por Pagina:</label>
            {/*dropdown menu para seleccionar la cantidad de resultados que el usuario quiera ver por pagina.*/}
                <select 
                    onChange={(e)=> {/* dispatch(actions.setNftsPerPage(e.target.value)) */}} 
                    name="gamesPerPage" 
                    id="games-per-page-selector">
                    {validValues.map(value => {
                        return <option
                        key={value}
                        >
                            {value}
                        </option>
                    })}
                </select>
        </div>
    )
}