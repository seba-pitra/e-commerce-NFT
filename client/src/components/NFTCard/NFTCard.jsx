import { Link } from 'react-router-dom';

export default function NFTCard(props){
    //{image name id owner price lastSale}
    //faltaria transformar precio eth a usd en el momento
    return(
        <div
            height="100px"
            width="100px"
            className='card-container' 
            >
                {/*coloque un link rodeando a todo el card para que cuando el usuario hace click en **la tarjeta... lo lleve al detalle del nft** */}
                
            <Link
                className='link'
                to={'ruta de detalle'}>

                {/*estructura de la tarjeta del nft*/}
                
                <img src={props.image} alt="nft-image" />
                <div>
                <h3>{props.name}</h3>
                <h4>{props.id}</h4>
                </div>
                <h4>{/* props.owner */}</h4>
                <h3>{props.price}</h3>
                <h3>Last sale: {/* {props.lastSale} */}</h3>
            </Link>
        </div>
        
    )
}