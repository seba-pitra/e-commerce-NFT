import { ethers } from "ethers";

const NAME = "name";
const PRICE = "price";
const RARITY = "rarity";
const RARITYRANK = "rarityrank";
const LASTBUY = "lastbuy";
const LASTBUYTS = "lastbuyts";
const AMOUNT = "amount";
const CREATION = "creationDate";
const RATING = "rating";

// recibe la base del ordenamiento, la direccion y los nft que va a ordernar;
export function orderNFTBy(orderOption, orderDirection, nftsToSort) {
  switch (orderOption) {
    case NAME:
      return orderNFTByName(orderDirection, nftsToSort);
    case PRICE:
      return orderNFTByPrice(orderDirection, nftsToSort);
    case RARITY:
      return orderNFTByRarity(orderDirection, nftsToSort);
    case RARITYRANK:
      return orderNFTByRarityRank(orderDirection, nftsToSort);
    case LASTBUY:
      return orderNFTByLastBuy(orderDirection, nftsToSort);
    case LASTBUYTS:
      return orderNFTByLastBuyTs(orderDirection, nftsToSort);
    case AMOUNT:
      return orderNFTByAmount(orderDirection, nftsToSort);
    case CREATION:
      return orderNFTByCreation(orderDirection, nftsToSort);
    case RATING:
      return orderNFTByRating(orderDirection, nftsToSort);
    default:
      return nftsToSort;
  }
}

export function orderNFTByName(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.name > nftB.name) {
        return 1;
      }
      if (nftB.name > nftA.name) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.name > nftB.name) {
        return -1;
      }
      if (nftB.name > nftA.name) {
        return 1;
      }
      return 0;
    });
  }
}
export function orderNFTByPrice(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.price > nftB.price) {
        return 1;
      }
      if (nftB.price > nftA.price) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.price > nftB.price) {
        return -1;
      }
      if (nftB.price > nftA.price) {
        return 1;
      }
      return 0;
    });
  }
}

// FALTA BOTON
export function orderNFTByRarity(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rarity > nftB.rarity) {
        return 1;
      }
      if (nftB.rarity > nftA.rarity) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rarity > nftB.rarity) {
        return -1;
      }
      if (nftB.rarity > nftA.rarity) {
        return 1;
      }
      return 0;
    });
  }
}

// FALTA BOTON
export function orderNFTByRarityRank(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rarityRank > nftB.rarityRank) {
        return 1;
      }
      if (nftB.rarityRank > nftA.rarityRank) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rarityRank > nftB.rarityRank) {
        return -1;
      }
      if (nftB.rarityRank > nftA.rarityRank) {
        return 1;
      }
      return 0;
    });
  }
}

// FALTA BOTON
export function orderNFTByLastBuy(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.lastBuyValue > nftB.lastBuyValue) {
        return 1;
      }
      if (nftB.lastBuyValue > nftA.lastBuyValue) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.lastBuyValue > nftB.lastBuyValue) {
        return -1;
      }
      if (nftB.lastBuyValue > nftA.lastBuyValue) {
        return 1;
      }
      return 0;
    });
  }
}

// FALTA BOTON
export function orderNFTByLastBuyTs(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.lastBuyTs > nftB.lastBuyTs) {
        return 1;
      }
      if (nftB.lastBuyTs > nftA.lastBuyTs) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.lastBuyTs > nftB.lastBuyTs) {
        return -1;
      }
      if (nftB.lastBuyTs > nftA.lastBuyTs) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByAmount(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.amount > nftB.amount) {
        return 1;
      }
      if (nftB.amount > nftA.amount) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.amount > nftB.amount) {
        return -1;
      }
      if (nftB.amount > nftA.amount) {
        return 1;
      }
      return 0;
    });
  }
}
export function orderNFTByCreation(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdAt > nftB.createdAt) {
        return 1;
      }
      if (nftB.createdAt > nftA.createdAt) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdAt > nftB.createdAt) {
        return -1;
      }
      if (nftB.createdAt > nftA.createdAt) {
        return 1;
      }
      return 0;
    });
  }
}
export function orderNFTByRating(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rating > nftB.rating) {
        return 1;
      }
      if (nftB.rating > nftA.rating) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rating > nftB.rating) {
        return -1;
      }
      if (nftB.rating > nftA.rating) {
        return 1;
      }
      return 0;
    });
  }
}

export const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No cripto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts"); //connect with metamask wallet

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    ethers.utils.getAddress(addr); //address validation

    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether), //can not pay with ethereum directly.We need to pass the ethereum to "wei"
    });

    setTxs(tx.hash);
    return tx;
  } catch (err) {
    setError(err.message);
    return err.message;
  }
};

/* //Filtro AND
export function filterGamesByGenreAND(gamesArray, selectedGenreArray){
    return gamesArray.filter(({genres}) => {
        return selectedGenreArray.every((selectedGenre)=>{
            return genres.find(({name})=>{
                return selectedGenre.includes(name);
            })
        })
    })
}


//Filtro AND
export function filterGamesByPlatformAND(gamesArray, selectedPlatformArray){
    return gamesArray.filter((game) => {
        if(game.platforms === null) return false;
        return selectedPlatformArray.every((selectedPlatform)=>{
            return game.platforms.find(({platform})=>{
                return selectedPlatform.includes(platform.name);
                })
            })
        }
    )
} */
