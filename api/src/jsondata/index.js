const angryCat = require("../jsondata/angryCat.json")
const bloodCards = require("../jsondata/bloodCards.json")
const boki = require("../jsondata/Boki.json")
const boredy00tsAC = require("../jsondata/Bored-y00ts-AC.json")
const boredApeYacht = require("../jsondata/boredApeYacht.json")
const broadside = require("../jsondata/Broadside.json")
const c01OfficialCollection = require("../jsondata/C-01-Official-Collection.json")
const coolCats = require("../jsondata/coolCats.json")
const corntown = require("../jsondata/Corntown-wtf.json")
const creepz = require("../jsondata/Creepz-by-OVERLORD.json")
const cryptoMories = require("../jsondata/CryptoMories.json")
const cryptoPunks = require("../jsondata/cryptoPunks.json")
const dEGEN = require("../jsondata/DEGEN-TOONZ.json")
const dooplicator = require("../jsondata/Dooplicator.json")
const eNS = require("../jsondata/ENS-Maxis.json")
const evaverse = require("../jsondata/Evaverse.json")
const hAPE = require("../jsondata/HAPE-PRIME.json")
const kitaroWorld = require("../jsondata/Kitaro-World.json")
const lilPudgys = require("../jsondata/Lil-Pudgys.json")
const looksRare = require("../jsondata/LooksRare.json")
const lOSTPOETS = require("../jsondata/LOSTPOETS.json")
const mekaVerse = require("../jsondata/MekaVerse.json")
const moonbirds = require("../jsondata/moonbirds.json")
const mutantApeYachtClub = require("../jsondata/mutantApeYachtClub.json")
const myPetHooligan = require("../jsondata/My-Pet-Hooligan.json")
const phantaBear = require("../jsondata/PhantaBear.json")
const primeApePlanetPAP = require("../jsondata/Prime-Ape-Planet-PAP.json")
const regulars = require("../jsondata/Regulars.json")
const rENGA = require("../jsondata/RENGA.json")
const supDucks = require("../jsondata/SupDucks.json")
const theMV3Universe = require("../jsondata/The-MV3-Universe.json")
const tHEPLUTOALLIANCE = require("../jsondata/THE-PLUTO-ALLIANCE.json")
const toxicSkullsClub = require("../jsondata/Toxic-Skulls-Club.json")
const worldOfWomenGalaxy = require("../jsondata/World-of-Women-Galaxy.json")
const YuGiYn = require("../jsondata/YuGiYn.json")

const allNFTs = [ 
    ...angryCat,
    ...bloodCards,
    ...boki,
    ...boredy00tsAC,
    ...boredApeYacht,
    ...broadside,
    ...c01OfficialCollection,
    ...coolCats,
    ...corntown,
    ...creepz,
    ...cryptoMories,
    ...cryptoPunks,
    ...dEGEN,
    ...dooplicator,
    ...eNS,
    ...evaverse,
    ...hAPE,
    ...kitaroWorld,
    ...lilPudgys,
    ...looksRare,
    ...lOSTPOETS,
    ...mekaVerse,
    ...moonbirds,
    ...mutantApeYachtClub,
    ...myPetHooligan,
    ...phantaBear,
    ...primeApePlanetPAP,
    ...regulars,
    ...rENGA,
    ...supDucks,
    ...theMV3Universe,
    ...tHEPLUTOALLIANCE,
    ...toxicSkullsClub,
    ...worldOfWomenGalaxy,
    ...YuGiYn
];

console.log(allNFTs[0].market.floorAsk.price.amount.decimal);

module.exports = allNFTs