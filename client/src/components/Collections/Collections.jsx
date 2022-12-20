import * as actions from '../../redux/actions'
import { useSelector } from "react-redux";
import { useEffect } from 'react'; 
import { useDispatch } from "react-redux";
import Loading from '../Loading/Loading';
import { Link } from "react-router-dom";
import "./Collections.css"
import VerifiedIcon from '@mui/icons-material/Verified';

function Collections(){

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllNfts())
    dispatch(actions.getAllCollections())
  },[dispatch]);

  const nfts = useSelector((state) => state.nfts);
  const collections = useSelector((state) => state.collections);

  // let filterCollection = [], count = 0;
  // collections.forEach(e => {
  //   count = 0;
  //   nfts.forEach(nft => { if (nft.collectionId === e.id) count = count + 1 } )
  //   if (count > 1) filterCollection.push(e) 
  // })

  const isLoading = useSelector(state => state.isLoading);

  console.log(collections)

  const collectionsCards = collections.map((e) => {
    let x = false;
    return (
      <Link to={`/collections/${e.id}`}>
        <div className='collections-conteiner'>
          <img className='collections-img-main' src={e.image} alt="img-collections" />
          <div className='img-name-conteiner'>
            { 
              nfts.map(a => {
                if (a.collectionId === e.id) {
                  if (x === false) {
                    x = true;
                    return <img className='collections-img-owner' src={a.image} alt="img-collections" />
                  }  
                }
              })
            }
            <div className='collection-name-conteiner'>             
            <VerifiedIcon/>
            <h3 className='collections-name'> {e.name} </h3>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  
  return(
    <div className='conteiner-main-collections'>
      { 
        isLoading ? <Loading/> : collectionsCards
      }
    </div>
  )
}

export default Collections;