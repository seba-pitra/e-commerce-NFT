const NAME = 'name';
const PRICE = 'price';
const AMOUNT = 'amount';
const CREATION = 'creationDate';
const RATING = 'rating';

// recibe la base del ordenamiento, la direccion y los nft que va a ordernar;
export function orderNFTBy(orderOption, orderDirection, nftsToSort){
    switch(orderOption) {
        case NAME:
            return orderNFTByName(orderDirection, nftsToSort)
        case PRICE:
            return orderNFTByPrice(orderDirection, nftsToSort)
        case AMOUNT:
            return orderNFTByAmount(orderDirection, nftsToSort)
        case CREATION:
            return orderNFTByCreation(orderDirection, nftsToSort)
        case RATING:
            return orderNFTByRating(orderDirection, nftsToSort)
    }
}


export function orderNFTByName(order, nfts){
    if (order === 'up-down'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.name > nftB.name) {
                return 1;   
            }
            if (nftB.name > nftA.name) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'down-up'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.name > nftB.name) {
                return -1;
            }
            if (nftB.name > nftA.name) {
                return 1;
            }
            return 0;
        })
    }
}
export function orderNFTByPrice(order, nfts){
    if (order === 'up-down'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.price > nftB.price) {
                return 1;   
            }
            if (nftB.price > nftA.price) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'down-up'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.price > nftB.price) {
                return -1;
            }
            if (nftB.price > nftA.price) {
                return 1;
            }
            return 0;
        })
    }
}
export function orderNFTByAmount(order, nfts){
    if (order === 'up-down'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.amount > nftB.amount) {
                return 1;   
            }
            if (nftB.amount > nftA.amount) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'down-up'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.amount > nftB.amount) {
                return -1;
            }
            if (nftB.amount > nftA.amount) {
                return 1;
            }
            return 0;
        })
    }
}
export function orderNFTByCreation(order, nfts){
    if (order === 'up-down'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.createdAt > nftB.createdAt) {
                return 1;   
            }
            if (nftB.createdAt > nftA.createdAt) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'down-up'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.createdAt > nftB.createdAt) {
                return -1;
            }
            if (nftB.createdAt > nftA.createdAt) {
                return 1;
            }
            return 0;
        })
    }
}
export function orderNFTByRating(order, nfts){
    if (order === 'up-down'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.rating > nftB.rating) {
                return 1;   
            }
            if (nftB.rating > nftA.rating) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'down-up'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.rating > nftB.rating) {
                return -1;
            }
            if (nftB.rating > nftA.rating) {
                return 1;
            }
            return 0;
        })
    }
}



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
