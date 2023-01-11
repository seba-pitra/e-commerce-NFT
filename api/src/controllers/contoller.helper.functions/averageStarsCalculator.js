const { Review, Nft } = require('../../db.js')

const calculateNftStars = async (nftId) => {
    try {
        // Obtener todas las revisiones asociadas al NFT con el ID especificado
        const reviews = await Review.findAll({
            where: { nftId },
        });
        // Calcular el promedio de las estrellas de las revisiones
        const totalStars = reviews.reduce((sum, review) => sum + review.value, 0);
        const averageStars = totalStars / reviews.length;
        // actualizar el nft con el promedio calculado
        const nft = await Nft.findByPk(nftId)
        nft.stars = averageStars;
        await nft.save();
        // retornar el promedio calculado
        return averageStars;
    } catch (error) {
        throw new Error(`Error calculating NFT stars: ${error.message}`);
    }
};

module.exports = {
    calculateNftStars
}