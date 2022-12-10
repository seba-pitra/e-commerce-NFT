import { GET_ALL_NFTS, GET_ALL_COLLECTIONS, GET_ALL_USERS, GET_NFT_DETAIL, CREATE_NFT, DELETE_NFT, UPDATE_NFT, LOADING, RESET_FILTERS, FILTER_NFT_COLLECTION, FILTER_NFT_CATEGORY, FILTER_NFT_STATE, FILTER_NFT_PRICE, ORDER_NFT_NAME, ORDER_NFT_PRICE, ORDER_NFT_AMOUNT, ORDER_NFT_CREATED_AT} from "../actions";
//  SEARCH_NFT, SELECT_PAGE, SET_NFTS_PER_PAGE, NEXT_PAGE, PREV_PAGE

const initialState = {
  nfts: [], 
  filteredNfts: [],
  collections: [],
  users: [],
  nftDetail: {}, 
  isLoading: false,
  msj: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading : true } // loading mientras carga la info
    case GET_ALL_NFTS:
      console.log(action.payload)
      return { ...state, nfts: action.payload, filteredNfts: action.payload, nftDetail: {}, isLoading: false } // reset all
    case GET_ALL_COLLECTIONS:
      return { ...state, collections: action.payload }
    case GET_ALL_USERS:
      return { ...state, users: action.payload }
    case GET_NFT_DETAIL:
      return { ...state, nftDetail: action.payload, isLoading : false }
    case CREATE_NFT:
      return { ...state, msj: action.payload }
    case DELETE_NFT:
      return { ...state, msj: action.payload }
    case UPDATE_NFT:
      return { ...state, msj: action.payload }
    case RESET_FILTERS:
      return { ...state, filteredNfts: state.nfts }
    case FILTER_NFT_COLLECTION:
      let filterByCollectionId = [];
      let filterByCollection = [];
      console.log(action.payload)
      console.log(state.collections) // vacio, falta ruta del back
      state.collections.map(e => { // probando de a una
        if(action.payload === e.name) filterByCollectionId.push(e.id)
        console.log("aaa")
        console.log(filterByCollectionId)
        filterByCollection = state.filteredNfts.filter(e => e.collectionId === filterByCollectionId)
      })
      return {...state, filteredNfts: filterByCollection}
    case FILTER_NFT_CATEGORY:
      let filterByCategory = []; // funciona de a una, err > si elijo 2, se acumulan, no se puede desseleecionar
      const categories = []
      categories.push(action.payload)
      categories.map ( e => {
        filterByCategory = state.filteredNfts.filter (nft => nft.category === e)
      })
      return {...state, filteredNfts: filterByCategory}
    case FILTER_NFT_PRICE:
      let filterByPrice = []; // enviar error if max < min front?
      filterByPrice = state.nfts.filter(e => e.price !== 0) // sin max o min no filtra? resetea si se borra alguno?
      if (action.payload.min !== 0) filterByPrice = state.nfts.filter(e => e.price > action.payload.min)
      else if (action.payload.max !== 0) filterByPrice = state.nfts.filter(e => e.price < action.payload.max) 
      return {...state, filteredNfts: filterByPrice}
    case FILTER_NFT_STATE:
      let filterByState = [];
      if (action.payload === "auction") filterByState = state.nfts.filter(e => e.type === "auction")
      else if (action.payload === "buynow") filterByState = state.nfts.filter(e => e.type === "buynow")
      else filterByState = state.nfts.filter(e => e.type === "buynow" || e.type === "auction")  // boton all que elimine este filtrado > funcionara?
      return {...state, filteredNfts: filterByState}
    case ORDER_NFT_NAME:
      let orderByName = [];
      if (action.payload === "a-z") orderByName = state.nfts.sort((a,b) => a.name.toUpperCase() > b.name.toUpperCase() ?  1 : -1)
      else orderByName = state.nfts.sort((a,b) => a.name.toUpperCase() < b.name.toUpperCase() ?  1 : -1)
      return {...state, filteredNfts: orderByName}
    case ORDER_NFT_PRICE:
      let orderByPrice = [];
      if (action.payload === "up-down") orderByPrice = state.nfts.sort((a,b) => a.price > b.price ?  -1 : 1)
      else orderByPrice = state.nfts.sort((a,b) => a.price < b.price ?  1 : -1)
      return {...state, filteredNfts: orderByPrice}
    case ORDER_NFT_AMOUNT:
      return { ...state } // no hace nada actualmente
    case ORDER_NFT_CREATED_AT:
      return { ...state } // no hace nada actualmente
    default:
      return {...state}
  }
};

export default rootReducer;



// const initialState = {
//   searchResults: [], //los resultados de la busqueda
//   activePage : 1, //pagina activa, default pagina inicial
//   nftsPërPage : 15, //nfts por pagina.
// };

//   //aplica la logica de busqueda y resetea la la pagina activa e indica que ya no esta cargando.
// case SEARCH_NFT:
//     /*Logica de busqueda */
//   return {
//     ...state,
//     activePage: 1,
//     isLoading : false
//   }
//   //selecciona cambia el valor de la pagina activa.
// case SELECT_PAGE:
//   return {
//     ...state,
//     activePage : action.payload
//   }
//   //cambia la cantidad de tarjetas que se muestran en pantalla y resetea la pagina a 1
// case SET_NFTS_PER_PAGE:
//   return {
//     ...state,
//     gamesPerPage : action.payload,
//     activePage : 1
//   }
//   //cambia la pagina activa a la pagina siguiente
// case NEXT_PAGE:
//   return {
//     ...state,
//     activePage : state.activePage + 1
//   }
//   //cambia la pagina activa a la pagina anterior.
// case PREV_PAGE:
//   return {
//     ...state,
//     activePage : state.activePage - 1
//   }