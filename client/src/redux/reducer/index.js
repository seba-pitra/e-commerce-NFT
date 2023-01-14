import {
  GET_ALL_NFTS,
  GET_ALL_ADMIN_NFTS,
  GET_ALL_COLLECTIONS,
  GET_COLLECTION_DETAIL,
  GET_ALL_USERS,
  GET_ALL_ADMIN_USERS,
  GET_NFT_DETAIL,
  CREATE_NFT,
  DELETE_NFT,
  UPDATE_NFT,
  CREATE_COLLECTION,
  LOADING,
  SET_COLLECTIONS,
  SET_CATEGORY_SPECIES,
  SET_CATEGORY_SPECIES2,
  SET_CATEGORY_ART,
  SET_CATEGORY_TYPE,
  SET_CATEGORY_STYLE,
  SET_CATEGORY_REST,
  SET_CATEGORY_BACKG,
  SET_NFTS_PRICE,
  SET_VIEW_CARDS,
  FILTER_NFTS,
  SEARCH_NFT_NAME,
  SEARCH_COLLECTION_NAME,
  RESET_FILTERS,
  ORDER_NFT_NAME,
  ORDER_NFT_PRICE,
  ORDER_NFT_RARITY,
  ORDER_NFT_FAVS,
  ORDER_NFT_STARS,
  ORDER_NFT_LASTBUY,
  ORDER_NFT_CREATEDTS,
  GET_USER_BY_ID,
  GET_ETH_PRICE,
  CHANGE_ORDER_DIRECTION,
  SELECT_PAGE,
  PREV_PAGE,
  NEXT_PAGE,
  SET_NFTS_PER_PAGE,
  ADD_NFT_ON_SHOOPING_CART,
  REMOVE_NFT_OF_SHOOPING_CART,
  LOCAL_STORAGE_CART,
  LOCAL_STORAGE_FAVS,
  DELETE_NFT_ON_SIGNOUT,
  ADD_BUY_AT_HISTORY_BUYS,
  ADD_FAV,
  DEL_FAV,
  SIGN_IN_WITH_GOOGLE,
  LOG_IN,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  REGISTER_USER,
  ASKED_FOR_VERIFICATION,
  TOGGLE_THEME,
  DELETE_FAVS_ON_SIGN_OUT,
  REMOVE_FROM_FAVS,
  LOCAL_STORAGE_THEME,
  SHOULD_UPDATE,
  UPDATE_LOGGED_USER
} from "../actions";
import * as controllers from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as utils from "../../utils";

const initialState = {
  nfts: [], //ok
  filteredNfts: [], // ok
  collections: [], // ok
  filteredCollections: [], // ok
  collectionDetail: [],

  adminNfts: [], //incluye deleted

  // estos son todos filtros
  setCollections: [],
  setCategorySpecies: [],
  setCategorySpecies2: [],
  setCategoryArt: [],
  setCategoryType: [],
  setCategoryStyle: [],
  setCategoryRest: [],
  setCategoryBackg: [],
  setNftsPrice: {},
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^	

  viewCards: "info", //Vista de las cards

  adminUsers: [], //todos los usuarios para que los vea el admin

  shoppingCartContents: [], // carrito de compras
  userFavsNfts: [],	// favoritos del usuario
  userFavs: [], //favoritos del usuario

  nftDetail: {}, //detale del nft seleccionado

  userDetail: {}, // userDetail para el admin

  loggedUser: {}, // el estado mas importante... datos del usuario loggueado

  loginStatus: false, // estado del login, esta es la llave

  isLoading: false, // estado de la carga de datos para mostrar animacion de carga

  orderDirection: "up-down", // ordenamiento... REVISAR
  activePage: 1, //PAGINA ACTIVA
  nftsPerPage: 100, // CANTIDAD DE NFTS POR PAGINA
  ethPrice: {}, //para calcular los precios en ars y usd

  historyBuys: [], //historial de compras.
  activeThemeIsDark: false,

  shouldUpdate: false,
};


const rootReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };

    case SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate : !state.shouldUpdate
      }
    // --- GETTERS ---
    case GET_ALL_NFTS:
      return {
        ...state,
        nfts: action.payload,
        filteredNfts: action.payload,
        nftDetail: {},
        isLoading: false,
        setCategorySpecies: [],
        setCategorySpecies2: [],
        setCategoryArt: [],
        setCategoryType: [],
        setCategoryStyle: [],
        setCategoryRest: [],
        setCategoryBackg: [],
      };
    case REGISTER_USER: 
      return { ...state}
    case GET_ALL_ADMIN_NFTS:
      return { ...state, adminNfts: action.payload };
    case GET_ALL_COLLECTIONS:
      return { ...state, collections: action.payload, filteredCollections: action.payload ,isLoading: false };

    // Este case no lo esta usando nadie.
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    case SIGN_IN_WITH_GOOGLE: 
      return {
        ...state,
        loggedUser: action.payload,
      };
    case UPDATE_LOGGED_USER:
     // console.log(action.payload);
    // Actualiza el estado con los nuevos datos del usuario
      return { ...state, loggedUser: action.payload };
    case LOG_IN:
      return { ...state, loggedUser: action.payload };
    case LOG_IN_SUCCESS:
      return { ...state, loginStatus: true }
    case LOG_OUT_SUCCESS: 
      return {
        ...state, loginStatus : false
      }
    case LOG_OUT:
        return { ...state, 
          loggedUser: {},
          loginStatus: false
      };
    case ASKED_FOR_VERIFICATION:
        return { ...state }
    // Trae incluso los deleted.
    case GET_ALL_ADMIN_USERS:
      return { ...state, adminUsers: action.payload };
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
      };
    case GET_NFT_DETAIL:
      return { ...state, nftDetail: action.payload, isLoading: false };
    case GET_COLLECTION_DETAIL:
      return { ...state, collectionDetail: action.payload };

    // estos hay que revisar la logica, en este momento no coinciden back con front,
    // saque lo del msj para revisarlo bien despues
    case CREATE_NFT:
      return { ...state };
    case DELETE_NFT:
      return { ...state };
    case UPDATE_NFT:
      return { ...state } ;
    case CREATE_COLLECTION:
      return { ...state };
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // --- SETTERS ---
    case SET_COLLECTIONS:
      return { ...state, setCollections: action.payload };
    case SET_CATEGORY_SPECIES:
      return { ...state, setCategorySpecies: action.payload };
    case SET_CATEGORY_SPECIES2:
      return { ...state, setCategorySpecies2: action.payload };
    case SET_CATEGORY_ART:
      return { ...state, setCategoryArt: action.payload };
    case SET_CATEGORY_TYPE:
      return { ...state, setCategoryType: action.payload };
    case SET_CATEGORY_STYLE:
      return { ...state, setCategoryStyle: action.payload };
    case SET_CATEGORY_REST:
      return { ...state, setCategoryRest: action.payload };
    case SET_CATEGORY_BACKG:
      return { ...state, setCategoryBackg: action.payload };
    case SET_NFTS_PRICE:
      return { ...state, setNftsPrice: action.payload };
    case SET_VIEW_CARDS:
      return { ...state, viewCards: action.payload };

    // --- FILTERS ---
    case FILTER_NFTS:
      let allAvailables = state.nfts;

      if (state.setCategorySpecies.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategorySpecies.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCategorySpecies2.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategorySpecies2.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCategoryArt.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategoryArt.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCategoryType.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategoryType.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCategoryStyle.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategoryStyle.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCategoryRest.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategoryRest.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCategoryBackg.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCategoryBackg.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.setCollections.length !== 0) {
        let results = [];
        let filtered = [];
        state.setCollections.filter((col) => {
          filtered = allAvailables.filter((nft) => nft.collectionId === col);
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (Object.entries(state.setNftsPrice).length !== 0) {
        // noanda
        if (state.setNftsPrice.currency === "ETH") {
          if (state.setNftsPrice.min !== 0)
            allAvailables = allAvailables.filter(
              (e) => e.price > state.setNftsPrice.min
            );
          if (state.setNftsPrice.max !== 0)
            allAvailables = allAvailables.filter(
              (e) => e.price < state.setNftsPrice.max
            );
        } else if (state.setNftsPrice.currency === "USD") {
          if (state.setNftsPrice.min !== 0)
            allAvailables = allAvailables.filter(
              (e) => e.price * state.ethPrice.USD > state.setNftsPrice.min
            );
          if (state.setNftsPrice.max !== 0)
            allAvailables = allAvailables.filter(
              (e) => e.price * state.ethPrice.USD < state.setNftsPrice.max
            );
        } else {
          if (state.setNftsPrice.min !== 0)
            allAvailables = allAvailables.filter(
              (e) => e.price * state.ethPrice.ARS > state.setNftsPrice.min
            );
          if (state.setNftsPrice.max !== 0)
            allAvailables = allAvailables.filter(
              (e) => e.price * state.ethPrice.ARS < state.setNftsPrice.max
            );
        }
      }

      return { ...state, filteredNfts: allAvailables, activePage: 1 };

    case RESET_FILTERS:
      return {
        ...state,
        filteredNfts: state.nfts,
        categories: [],
        activePage: 1,
        setCategorySpecies: [],
        setCategorySpecies2: [],
        setCategoryArt: [],
        setCategoryType: [],
        setCategoryStyle: [],
        setCategoryRest: [],
        setCategoryBackg: [],
      };

    // La logica de busqueda solo incluye nombres.
    // Y modifica el estado de los filtered permanentemente hasta que
    // se haga un RESET_FILTERS o se recargue...
    // no se pueden hacer dos busquedas consecutivas con esta logica
    case SEARCH_NFT_NAME:
      let filterByName = [];
      filterByName = state.nfts.filter((e) =>
        e.name.toUpperCase().includes(action.payload.toUpperCase())
      );
      return { ...state, filteredNfts: filterByName };

    case SEARCH_COLLECTION_NAME:
      let filterByCollections = [];
      filterByCollections = state.collections.filter((e) =>
        e.name.toUpperCase().includes(action.payload.toUpperCase())
      );
      return { ...state, filteredCollections: filterByCollections };

    // --- ORDERS ---
    case CHANGE_ORDER_DIRECTION:
      let newOrder;
      if (state.orderDirection === "up-down") newOrder = "down-up";
      else if (state.orderDirection === "down-up") newOrder = "up-down";
      return { ...state, orderDirection: newOrder, activePage: 1 };

    case ORDER_NFT_NAME:
      let orderedByName = controllers.orderNFTBy(
        "name",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedByName, activePage: 1 };

    case ORDER_NFT_PRICE:
      let orderedbyPrice = controllers.orderNFTBy(
        "price",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyPrice, activePage: 1 };

    case ORDER_NFT_RARITY:
      let orderedbyRarity = controllers.orderNFTBy(
        "rarity",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyRarity, activePage: 1 };

    case ORDER_NFT_FAVS:
      let orderedbyFavs = controllers.orderNFTBy(
        "favs",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyFavs, activePage: 1 };

    case ORDER_NFT_STARS:
      let orderedbyStars = controllers.orderNFTBy(
        "stars",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyStars, activePage: 1 };

    case ORDER_NFT_LASTBUY:
      let orderedbyLastBuy = controllers.orderNFTBy(
        "lastbuy",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyLastBuy, activePage: 1 };

    case ORDER_NFT_CREATEDTS:
      let orderedbyCreatedTs = controllers.orderNFTBy(
        "createdTs",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyCreatedTs, activePage: 1 };

    // --- PAGINATION ---
    case SELECT_PAGE:
      return { ...state, activePage: action.payload };

    case SET_NFTS_PER_PAGE:
      return { ...state, nftsPerPage: action.payload, activePage: 1 };

    case NEXT_PAGE:
      return { ...state, activePage: state.activePage + 1 };

    case PREV_PAGE:
      return { ...state, activePage: state.activePage - 1 };

    // --- OTHERS ---
    case GET_ETH_PRICE:
      return { ...state, ethPrice: action.payload };

    // -- SHOPPING CART
    case ADD_NFT_ON_SHOOPING_CART:
      const foundNft = state.shoppingCartContents.find(
        (nft) => nft.id === action.payload.id
      );

      if (foundNft) {
        toast.error("This NFT is already in your shopping cart", {
          position: "bottom-left",
        });
        return { ...state };
      }
      // crea un nuevo "carrito de compras" con el nft agregado.
      const newShoppingCartContent = [...state.shoppingCartContents, action.payload];
      // lo guarda el el local storage
      utils.saveCartLocalStorage(newShoppingCartContent, state.loggedUser.email);
      //responde que fue exitoso.
      toast.success("NFT added to shopping cart successfully", {
        position: "bottom-left",
      });
      // modifica el estado.
      return {
        ...state,
        shoppingCartContents: newShoppingCartContent,
      };

    case REMOVE_NFT_OF_SHOOPING_CART:
      // remueve el nft del carrito de compras.
      const newShoppingCartContentRemoved = state.shoppingCartContents.filter(
        (nft) => nft.id !== action.payload
        );

      toast.success("NFT removed to shopping cart successfully", {
        theme: "dark",
        position: "bottom-left",
      });

      //guarda el nuevo carrito
      utils.saveCartLocalStorage(newShoppingCartContentRemoved, state.loggedUser.email);
      // modifica el estado
      return {
        ...state,
        shoppingCartContents: newShoppingCartContentRemoved,
      };

    case LOCAL_STORAGE_CART:
      //carga lo que esta en el local storage en el carrito.
      return {
        ...state,
        shoppingCartContents: action.payload,
      };

    case DELETE_NFT_ON_SIGNOUT:
      return {
        ...state,
        shoppingCartContents: [],
      };
    // -- THEME --
    case TOGGLE_THEME:
      return {
      ...state,
        activeThemeIsDark: !state.activeThemeIsDark,
      }

      case LOCAL_STORAGE_THEME:
        return {
          ...state,
          activeThemeIsDark: action.payload
        }


    // --- FAVS ---
    case LOCAL_STORAGE_FAVS:
      //carga lo que esta en el local storage en los favoritos del usuario.
      return {
        ...state,
        userFavs: action.payload,
      };
    case ADD_FAV:
        //verifica que no este ya en el estado.
        const SelectedNft = state.userFavs.find(
          (nft) => nft.id === action.payload.id
        );
        
        // devuelve mensaje y no modifica el estado si es asi
        if (SelectedNft) {
          toast.error("This NFT is already in your Favorites", {
            position: "bottom-left",
          });
          return { ...state };
        }
        //crea un nuevo listado de favoritos.
        const newFavs = [...state.userFavs, action.payload]
        // guarda el estado usando el mail del usuario como tag

        utils.saveFavsLocalStorage(newFavs, state.loggedUser.email)

        toast.success("NFT added to your Favorites List successfully", {
          position: "bottom-left",
        });

        // modifica el estado.
        return {
          ...state,
          userFavs: newFavs
        };
    case DELETE_FAVS_ON_SIGN_OUT:
      return {
        ...state,
        userFavs: [],
      };
    case REMOVE_FROM_FAVS:
      // remueve el nft de los favoritos.
      const newFavsRemoved = state.userFavs.filter(
        (nft) => nft.id !== action.payload
        );

      toast.success("NFT removed to favs successfully", {
        theme: "dark",
        position: "bottom-left",
      });

      //guarda el nuevo carrito
      utils.saveFavsLocalStorage(newFavsRemoved, state.loggedUser.email);
      // modifica el estado
      return {
        ...state,
        userFavs: newFavsRemoved,
      };

     case DEL_FAV:
 	const NftsToRemove = state.userFavs.filter((nft) => nft.id !== action.payload);	
 	return {
		...state,
		userFavs: NftsToRemove,
	};
    // ------------

    case ADD_BUY_AT_HISTORY_BUYS:
      return {
        ...state,
        historyBuys: [...state.historyBuys, action.payload],
      };

    // -- THEME --
    case TOGGLE_THEME:
      return {
      ...state,
        activeThemeIsDark: !state.activeThemeIsDark,
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
