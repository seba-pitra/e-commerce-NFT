import {
  GET_ALL_NFTS,
  GET_ALL_COLLECTIONS,
  GET_ALL_USERS,
  GET_NFT_DETAIL,
  CREATE_NFT,
  DELETE_NFT,
  UPDATE_NFT,
  LOADING,
  RESET_FILTERS,
  FILTER_NFT_COLLECTION,
  SET_COLLECTIONS,
  SET_CATEGORY_SPECIES,
  SET_CATEGORY_SPECIES2,
  SET_CATEGORY_ART,
  SET_CATEGORY_TYPE,
  SET_CATEGORY_STYLE,
  SET_CATEGORY_REST,
  SET_CATEGORY_BACKG,
  FILTER_NFT_CATEGORY,
  FILTER_NFT_PRICE,
  FILTER_NFT_NAME,
  ORDER_NFT_NAME,
  ORDER_NFT_PRICE,
  ORDER_NFT_RARITY,
  ORDER_NFT_RARITYRANK,
  ORDER_NFT_LASTBUY,
  ORDER_NFT_LASTBUYTS,
  GET_USER_BY_ID,
  GET_ETH_PRICE,
  // ORDER_NFT_AMOUNT,
  // ORDER_NFT_CREATED_AT,
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
} from "../actions";
import * as controllers from "../../utils";

const initialState = {
  nfts: [],
  filteredNfts: [],
  collections: [],
  selectedCollections: [],
  categorySpecies: [],
  categorySpecies2: [],
  categoryArt: [],
  categoryType: [],
  categoryStyle: [],
  categoryRest: [],
  categoryBackg: [],
  users: [],
  userNfts: [],
  nftDetail: {},
  userDetail: {},
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
        categorySpecies: [],
        categorySpecies2: [],
        categoryArt: [],
        categoryType: [],
        categoryStyle: [],
        categoryRest: [],
        categoryBackg: [],
      };
    case GET_ALL_COLLECTIONS:
      return { ...state, collections: action.payload, isLoading: false };
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    case GET_USER_BY_ID:
      return { ...state, userDetail: action.payload };
    case GET_NFT_DETAIL:
      return { ...state, nftDetail: action.payload, isLoading: false };
    case CREATE_NFT:
      return { ...state, msj: action.payload };
    case DELETE_NFT:
      return { ...state, msj: action.payload };
    case UPDATE_NFT:
      return { ...state, msj: action.payload };

    // --- SETTERS ---
    case SET_COLLECTIONS:
      return { ...state, selectedCollections: action.payload };
    case SET_CATEGORY_SPECIES:
      return { ...state, categorySpecies: action.payload };
    case SET_CATEGORY_SPECIES2:
      return { ...state, categorySpecies2: action.payload };
    case SET_CATEGORY_ART:
      return { ...state, categoryArt: action.payload };
    case SET_CATEGORY_TYPE:
      return { ...state, categoryType: action.payload };
    case SET_CATEGORY_STYLE:
      return { ...state, categoryStyle: action.payload };
    case SET_CATEGORY_REST:
      return { ...state, categoryRest: action.payload };
    case SET_CATEGORY_BACKG:
      return { ...state, categoryBackg: action.payload };

    // --- FILTERS ---
    case FILTER_NFT_CATEGORY:
      let allAvailables = state.nfts;

      if (state.categorySpecies.length !== 0) {
        let results = [];
        let filtered = [];
        state.categorySpecies.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.categorySpecies2.length !== 0) {
        let results = [];
        let filtered = [];
        state.categorySpecies2.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.categoryArt.length !== 0) {
        let results = [];
        let filtered = [];
        state.categoryArt.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.categoryType.length !== 0) {
        let results = [];
        let filtered = [];
        state.categoryType.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.categoryStyle.length !== 0) {
        let results = [];
        let filtered = [];
        state.categoryStyle.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.categoryRest.length !== 0) {
        let results = [];
        let filtered = [];
        state.categoryRest.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      if (state.categoryBackg.length !== 0) {
        let results = [];
        let filtered = [];
        state.categoryBackg.filter((cat) => {
          filtered = allAvailables.filter((nft) => nft.category.includes(cat));
          results = results.concat(filtered);
        });
        allAvailables = results;
      }

      return { ...state, filteredNfts: allAvailables, activePage: 1 };

    case RESET_FILTERS:
      return {
        ...state,
        filteredNfts: state.nfts,
        categories: [],
        activePage: 1,
        categorySpecies: [],
        categorySpecies2: [],
        categoryArt: [],
        categoryType: [],
        categoryStyle: [],
        categoryRest: [],
        categoryBackg: [],
      };

    case FILTER_NFT_COLLECTION:
      let filterByCollection = state.nfts;
      if (state.selectedCollections.length !== 0) {
        let results = [];
        let filtered = [];
        state.selectedCollections.filter((cat) => {
          filtered = filterByCollection.filter(
            (nft) => nft.collectionId === cat
          );
          results = results.concat(filtered);
        });
        filterByCollection = results;
      }
      return { ...state, filteredNfts: filterByCollection, activePage: 1 };

    case FILTER_NFT_NAME:
      let filterByName = [];
      filterByName = state.nfts.filter((e) =>
        e.name.toUpperCase().includes(action.payload.toUpperCase())
      );
      return { ...state, filteredNfts: filterByName };

    case FILTER_NFT_PRICE:
      let filterByPrice = []; // enviar error if max < min front?
      filterByPrice = state.nfts.filter((e) => e.price !== 0); // sin max o min no filtra? resetea si se borra alguno?
      if (action.payload.currency === "ETH") {
        if (action.payload.min !== 0)
          filterByPrice = state.nfts.filter(
            (e) => e.price > action.payload.min
          );
        if (action.payload.max !== 0)
          filterByPrice = filterByPrice.filter(
            (e) => e.price < action.payload.max
          );
      } else if (action.payload.currency === "USD") {
        if (action.payload.min !== 0)
          filterByPrice = state.nfts.filter(
            (e) => e.price * state.ethPrice.USD > action.payload.min
          );
        if (action.payload.max !== 0)
          filterByPrice = filterByPrice.filter(
            (e) => e.price * state.ethPrice.USD < action.payload.max
          );
      } else {
        if (action.payload.min !== 0)
          filterByPrice = state.nfts.filter(
            (e) => e.price * state.ethPrice.ARS > action.payload.min
          );
        if (action.payload.max !== 0)
          filterByPrice = filterByPrice.filter(
            (e) => e.price * state.ethPrice.ARS < action.payload.max
          );
      }
      return { ...state, filteredNfts: filterByPrice, activePage: 1 };

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

    case ORDER_NFT_RARITYRANK:
      let orderedbyRarityRank = controllers.orderNFTBy(
        "rarityrank",
        state.orderDirection,
        state.filteredNfts
      );
      return { ...state, filteredNfts: orderedbyRarityRank, activePage: 1 };

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
        activeUser: action.payload,
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
      // ---
      return {
        ...state,
        activeUser: action.payload,
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
    // ---

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
