const { Review, Nft } = require('../../db.js')

const calculateNftStars = async (nftId) => {
    try {
        const reviews = await Review.findAll({
            where: { nftId },
        });
        const totalStars = reviews.reduce((sum, review) => sum + review.value, 0);
        const averageStars = totalStars / reviews.length;
        
        const nft = await Nft.findByPk(nftId)
        nft.stars = averageStars;
        await nft.save();
        
        return averageStars;
    } catch (error) {
        throw new Error(`Error calculating NFT stars: ${error.message}`);
    }
};

module.exports = {
    calculateNftStars
}