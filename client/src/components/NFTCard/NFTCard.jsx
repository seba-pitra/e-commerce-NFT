import { Link } from 'react-router-dom';

export default function NFTCard(props){
    return(
        <div
            className='card-container' 
            >
                {/*coloque un link rodeando a todo el card para que cuando el usuario hace click en **la tarjeta... lo lleve al detalle del nft** */}
            <Link
                className='link'
                to={'ruta de detalle'}>

                {/*estructura de la tarjeta del nft*/}
                MockCard
            </Link>
        </div>
    )
}