export function orderNFTByName(nfts, order){
    if (order === 'asc'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.name > nftB.name) {
                return 1;   
            }
            if (nftB.name > nftA.name) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'desc'){
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

export function orderNFTByRating(nfts, order){
    if (order === 'asc'){
        return nfts.sort((nftA, nftB) => {
            if (nftA.rating > nftB.rating) {
                return 1;   
            }
            if (nftB.rating > nftA.rating) {
                return -1;
            }
            return 0;
        });
    }else if(order === 'desc'){
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

//Filtro AND
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
}
