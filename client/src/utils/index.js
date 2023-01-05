import { ethers } from "ethers";

const NAME = "name";
const PRICE = "price";
const RARITY = "rarity";
const FAVS = "favs";
const STARS = "stars";
const LASTBUY = "lastbuy";
const CREATEDTS = "createdTs";

// recibe la base del ordenamiento, la direccion y los nft que va a ordernar;
export function orderNFTBy(orderOption, orderDirection, nftsToSort) {
  switch (orderOption) {
    case NAME:
      return orderNFTByName(orderDirection, nftsToSort);
    case PRICE:
      return orderNFTByPrice(orderDirection, nftsToSort);
    case RARITY:
      return orderNFTByRarity(orderDirection, nftsToSort);
    case FAVS:
      return orderNFTByFavs(orderDirection, nftsToSort);
    case STARS:
      return orderNFTByStars(orderDirection, nftsToSort);
    case LASTBUY:
      return orderNFTByLastBuy(orderDirection, nftsToSort);
    case CREATEDTS:
      return orderNFTByCreatedTs(orderDirection, nftsToSort);;
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
export function orderNFTByFavs(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.favs > nftB.favs) {
        return 1;
      }
      if (nftB.favs > nftA.favs) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.favs > nftB.favs) {
        return -1;
      }
      if (nftB.favs > nftA.favs) {
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
export function orderNFTByCreatedTs(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdTs > nftB.createdTs) {
        return 1;
      }
      if (nftB.createdTs > nftA.createdTs) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdTs > nftB.createdTs) {
        return -1;
      }
      if (nftB.createdTs > nftA.createdTs) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByStars(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.stars > nftB.stars) {
        return 1;
      }
      if (nftB.stars > nftA.stars) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.stars > nftB.stars) {
        return -1;
      }
      if (nftB.stars > nftA.stars) {
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

export function validate(input) {
  let errors = {
    name: "Name is required",
    price: "Pice is required",
  };

  if (!/([A-Z])/.test(input.name))
    errors = { ...errors, name: "Name cant contain special characters" };
  else errors = { ...errors, name: "Name is correct" };

  if (input.price <= 0)
    errors = { ...errors, price: "Price can not be 0 or less" };
  else errors = { ...errors, price: "Price is correct" };

  return errors;
}

export function validateUserData(errors, data) {
  errors.name = validateUserName(data.name)
  errors.last_name = validateUserLastName(data.last_name)
  console.log(data)





  return errors
}

function validateUserName(property) {
  if(!property) return "This field must be filled"
  if(property.length < 4) return "The name is too short"
  else return "False"
}

function validateUserLastName(property) {
  if(!property) return "This field must be filled"
  if(property.length < 4) return "The name is too short"
  else return "False"
}