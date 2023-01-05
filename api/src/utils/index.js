module.exports = {
    nftNameCreatorFor : (nft) => {
        let nftName = nft.token.name || nft.token.collection.name + " #" + nft.token.tokenId;
        nftName = nftName.charAt(0) === "#" ? 
        nft.token.collection.name + " " + nftName
        : nftName;
        nftName = nftName.includes("#") ? 
        nftName
        : nftName + " #" + nft.token.tokenId;
        
        return nftName;
    },
    priceLastBuyCalculatorFor : (nft) => {
        let priceLastBuy = 0;
        if (nft.token.lastSell.value === null) {
        priceLastBuy =
            nft.market.floorAsk.price.amount.decimal -
            nft.market.floorAsk.price.amount.decimal * 0.1;
        } else priceLastBuy = nft.token.lastSell.value;
        return priceLastBuy;
    },
    nftObjectCreatorFrom : (nft, nftName, priceLastBuy) => {
        let nftToDB = {
            name: nftName,
            description: nft.token.description || "No description",
            image: nft.token.image || "No image",
            contract: nft.token.contract,
            category: nft.token.category || [
                "Other",
                "Other",
                "Other",
                "Other",
                "Other",
                "Other",
                "Other",
            ],
            tokenId: nft.token.tokenId,
            price: nft.market.floorAsk.price.amount.decimal,
            rarity:
                Math.floor(nft.token.rarity) ||
                Math.floor(Math.random() * 20000 + 9000),
            favs: 0,
            stars: null,
            lastBuyValue: priceLastBuy.toFixed(2),
            lastBuyTs: Math.floor(Math.random() * 28857600000 + 1640995200000), // enero 2022 - actual
            createdTs: Math.floor(Math.random() * 60000000000 + 1577836800000), // enero 2022 - enero 2022
            ownerName: nft.market.floorAsk.source.name || "Non Fungible Town",
            ownerIcon:
                nft.market.floorAsk.source.icon ||
                "https://raw.githubusercontent.com/seba-pitra/e-commerce-NFT/main/client/src/images/logo/logo.png",
        };
        return nftToDB
}
}