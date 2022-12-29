import {
  GET_ALL_NFTS,
  GET_ALL_COLLECTIONS,
  GET_ALL_USERS,
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
  FILTER_NFTS,
  SEARCH_NFT_NAME,
  RESET_FILTERS,
  ORDER_NFT_NAME,
  ORDER_NFT_PRICE,
  ORDER_NFT_RARITY,
  ORDER_NFT_FAVS,
  ORDER_NFT_STARS,
  ORDER_NFT_LASTBUY,
  ORDER_NFT_LASTBUYTS,
  GET_USER_BY_ID,
  GET_LOGGED_USER,
  REMOVE_LOGGED_USER,
  GET_ETH_PRICE,
  CHANGE_ORDER_DIRECTION,
  SELECT_PAGE,
  PREV_PAGE,
  NEXT_PAGE,
  SET_NFTS_PER_PAGE,
  ADD_NFT_ON_SHOOPING_CART,
  REMOVE_NFT_OF_SHOOPING_CART,
  BUY_NFT_ON_SHOOPING_CART,
  GET_ACTIVE_USER,
  LOCAL_STORAGE_CART,
  DELETE_NFT_ON_SIGNOUT,
  ADD_BUY_AT_HISTORY_BUYS,
  ADD_FAV,
} from "../actions";
import * as controllers from "../../utils";

const initialState = {
  nfts: [],
  filteredNfts: [],
  collections: [],
  setCollections: [],
  setCategorySpecies: [],
  setCategorySpecies2: [],
  setCategoryArt: [],
  setCategoryType: [],
  setCategoryStyle: [],
  setCategoryRest: [],
  setCategoryBackg: [],
  setNftsPrice: {},
  users: [],
  userNfts: [],
  nftDetail: {},
  userDetail: {},
  loggedUser: {},
  isLoading: false,
  orderDirection: "up-down",
  activePage: 1,
  nftsPerPage: 100,
  msj: "",
  ethPrice: {},
  activeUser: {},
  historyBuys: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };

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
      
    case GET_ALL_COLLECTIONS:
      return { ...state, collections: action.payload, isLoading: false };
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    case GET_USER_BY_ID:
      return { ...state, userDetail: action.payload };
    case GET_LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    case REMOVE_LOGGED_USER:
      return { ...state, loggedUser: {} };
    case GET_NFT_DETAIL:
      return { ...state, nftDetail: action.payload, isLoading: false };
    case CREATE_NFT:
      return { ...state, msj: action.payload };
    case DELETE_NFT:
      return { ...state, msj: action.payload };
    case UPDATE_NFT:
      return { ...state, msj: action.payload };
    case CREATE_COLLECTION:
      return { ...state, msj: action.payload };

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

    case SEARCH_NFT_NAME:
      let filterByName = [];
      filterByName = state.nfts.filter((e) =>
        e.name.toUpperCase().includes(action.payload.toUpperCase())
      );
      return { ...state, filteredNfts: filterByName };

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

    case ORDER_NFT_LASTBUYTS:
      let orderedbyLastBuyTs = controllers.orderNFTBy(
        "lastbuyts",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyLastBuyTs, activePage: 1 };

    // --- PAGINATION ---
    case SELECT_PAGE:
      return { ...state, activePage: action.payload };

    case SET_NFTS_PER_PAGE:
      return { ...state, gamesPerPage: action.payload, activePage: 1 };

    case NEXT_PAGE:
      return { ...state, activePage: state.activePage + 1 };

    case PREV_PAGE:
      return { ...state, activePage: state.activePage - 1 };

    // --- OTROS ---
    case GET_ETH_PRICE:
      return { ...state, ethPrice: action.payload };

    case ADD_NFT_ON_SHOOPING_CART:
      const foundNft = state.userNfts.find(
        (nft) => nft.id === action.payload.id
      );
      if (foundNft) return { ...state };

      return {
        ...state,
        userNfts: [...state.userNfts, action.payload],
      };

    case REMOVE_NFT_OF_SHOOPING_CART:
      return {
        ...state,
        userNfts: state.userNfts.filter((nft) => nft.id !== action.payload),
      };

    // --- LOCAL STORAGE ---
    case GET_ACTIVE_USER:
      return {
        ...state,
        // activeUser: action.payload,
      };

    case LOCAL_STORAGE_CART:
      return {
        ...state,
        userNfts: action.payload,
      };

    case DELETE_NFT_ON_SIGNOUT:
      return {
        ...state,
        userNfts: [],
      };

    // --- CART ---
    case BUY_NFT_ON_SHOOPING_CART:
      return {
        ...state,
        activeUser: action.payload,
      };

    // --- FAVS ---
    case ADD_FAV:
        console.log('Se Agrego a Favoritos..');
        return {
      ...state,   
        }

    case ADD_BUY_AT_HISTORY_BUYS:
      return {
        ...state,
        historyBuys: [...state.historyBuys, action.payload],
      };

    default:
      return { ...state };
  }


};

export default rootReducer;
