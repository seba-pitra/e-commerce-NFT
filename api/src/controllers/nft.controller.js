const { Nft, Collection, User, Review, Transaction } = require("../db");


/*
// GET /nfts?pageSize=20&pageNumber=2&orderBy=createdAt&type=ASC&deleted=include
  Esta solicitud obtendría los NFTs en la segunda página (de 20 en 20), ordenados por la fecha de creación en orden ascendente, y incluyendo los eliminados suaves.
 */
// Devuelve todos los nfts de la base da datos junto con su coleccion asignada.
const getNfts = async (req, res) => {
  try {
    // Obtener parámetros de consulta de la solicitud
    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber
    const orderBy = req.query.orderBy
    const orderType = req.query.type
    // Crear opciones de consulta iniciales
    let options = {
      include: [
        { model: User },
        { model: Collection },
        { model: Review },
        { model: Transaction },
      ],
    };
    // Agregar ordenamiento si se especificaron los parámetros de ordenamiento en la solicitud
    if(orderBy && orderType) options.order = [[orderBy, orderType]]
    // Incluir eliminados suaves si se especificó en la solicitud
    if(req.query.deleted === "include") options.paranoid = false
    // Agregar límites y saltos si se especificaron los parámetros de paginación en la solicitud
    if (pageSize && pageNumber) {
      options.limit = pageSize;
      options.offset = (pageNumber - 1) * pageSize
    }

    // Obtener todos los NFTs utilizando las opciones de consulta
    const allNfts = await Nft.findAll(options)
    // Lanzar un error si no hay NFTs en la base de datos
    if (allNfts.length === 0) throw new Error("No NFTs on database");
    // Enviar respuesta con todos los NFTs
    res.status(200).send(allNfts);
  } catch (err) {
    // Enviar respuesta de error con el mensaje de error
    res.status(404).json({ error: err.message });
  }
};

const getNftQuantity = async (req, res) => {
  try {
    const column = req.query.column;
    const value = req.query.value;
    const paranoid = !(req.query.deleted === "include")
    let options = { paranoid: paranoid };
    if(column && value) options.where = { [column]: value };
    const nftQuantity = await Nft.count(options);
    res.status(200).json({ quantity : nftQuantity });
  }catch (error){
    res.status(400).json({error : error.message})
  }
}

// Devuelve el nft que busca mediante id.
const getNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNftFromDB = await Nft.findByPk(id, {
      include: [{ model: Collection }, { model: User }, { model: Review }, { model: Transaction } ],
    });
    if (foundNftFromDB) res.status(200).json(foundNftFromDB);
    else throw new Error(`No nft with id ${id}`);
  } catch (err) {
    res.status(404).json({
      message: err.message,
      error_detail: err
    });
  }
};

//Actualiza el nft que busca mediante id.
const updateNft = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const foundNft = await Nft.findByPk(id);
    if (foundNft) {
      foundNft.set(dataToUpdate);
      await foundNft.save();
      return res.status(200).send(foundNft);
    } else {
      throw new Error(`No nft with id ${id}`);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const addViewsNft = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNft = await Nft.findByPk(id);
    if (foundNft) {
      foundNft.set({ favs: foundNft.favs + 1 });
      await foundNft.save();
      return res.status(200).send(foundNft);
    } else {
      throw new Error(`No nft with id ${id}`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//Crea el nuevo nft a partir de nombre, descripcion, imagen, contrato, id del token, precio, dueño e imagen.
const createNewNFT = async (req, res) => {
  try {
    const {
      userId,
      collectionId,
      name,
      description,
      image,
      price,
      categories,
    } = req.body;
    // recibe usuario, coleccion mediante id. nombre, descripcion, imagen en url, precio y lista de categorias.
    if (!userId || !name || !image || !price || !collectionId || !categories) {
      throw new Error(
        `Insufficient data provided
        received userId: ${userId}
        received name: ${name}
        received image: ${image}
        received price: ${price}
        received collectionId: ${collectionId}
        received categories: ${categories}`
      );
    } else {
      //se busca el usuario
      const userOwner = await User.findByPk(userId);
      //buscamos collecion correspondiente y la devolvemos con los nfts que contiene.
      const correspondingCollection = await Collection.findByPk(collectionId, {
        include: {
          model: Nft,
        },
      });
      //si encuentra la coleccion crea el nuevo nft
      if (correspondingCollection) {
        const tokenId = (correspondingCollection.nfts.length + 1); // el token id esta relacionado al numero de nfts que ya tiene la coleccion.
        const nftName = name + tokenId; // agregamos el tokenId al name.
        const newNFT = await Nft.create({
          name: nftName,
          description: description || "No description",
          image: image || "No image",
          contract: correspondingCollection.contract || "No available contract",
          category: categories || [
            "Other",
            "Other",
            "Other",
            "Other",
            "Other",
            "Normal",
            "Other",
          ],
          tokenId: tokenId,
          price: price,
          rarity: Math.floor(Math.random() * 20000 + 9000),
          favs: 0,
          stars: 0,
          lastBuyValue: null,
          lastBuyTs: null,
          createdTs: Date.now(),
          ownerName: userOwner.username || "Non Fungible Town",
          ownerIcon:
            userOwner.profile_pic ||
            "https://raw.githubusercontent.com/seba-pitra/e-commerce-NFT/main/client/src/images/logo/logo.png",
        });

        //si la encuentra la relaciona al nuevo nft.
        await newNFT.setCollection(correspondingCollection);
        await newNFT.setUser(userOwner);
        res.status(200).json(newNFT);
      } else {
        throw new Error(`No collection found with id  ${collectionId}`);
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borra el nft de la base de datos (Soft-delete)
const deleteNft = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNFT = await Nft.findByPk(id);
    if (deletedNFT) {
      await deletedNFT.destroy();
      return res.status(200).send(`${deletedNFT.name}  successfully deleted`);
    } else {
      throw new Error(`no NFT found with id: ${id}`);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Restaura el nft borrado previamente.
const restoreDeletedNft = async (req, res) => {
  try {
    const { id } = req.params;
    await Nft.restore({
      where: {
        id: id,
      },
    });
    const restoredNft = await Nft.findByPk(id);
    if (restoredNft) {
      return res.status(200).json({
        nft: restoredNft,
        message: `${restoredNft.name} successfully restored`,
      });
    } else {
      throw new Error(`No nft found with id ${id}`);
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const changeNftOwner = async (req, res) => {
  try {
    // Obtiene el nuevo ID del propietario de los parámetros de la solicitud
    const { newOwnerId } = req.params;
    // Obtiene la lista de IDs de NFT del cuerpo de la solicitud
    const { nftIds } = req.body;
    
    // Busca todos los NFTs con IDs especificados
    const nfts = await Nft.findAll({
      where : {
        id : nftIds
      }});
      
    // Si la cantidad de NFTs encontrados es menor a la cantidad de IDs especificados, lanza un error
    if (nfts.length < nftIds.length) throw new Error(`Some nfts were not found`);
    
    // Busca al nuevo propietario de acuerdo al ID especificado
    const newOwner = await User.findByPk(newOwnerId);
    // Si no se encuentra al propietario, lanza un error
    if (!newOwner) throw new Error(`No user found with id ${newOwnerId}`);
    
    // Para cada NFT encontrado...
    for(const nft of nfts) {
        // Obtiene al propietario anterior
        const oldOwner = await nft.getUser();
        // Remueve la relación del propietario anterior con el NFT
        await oldOwner.removeNfts(nft);
        
        // Actualiza la información del propietario del NFT
        nft.set({
          ownerName: newOwner.username,
          ownerIcon: newOwner.profile_pic,
        });
        // Guarda los cambios en la base de datos
        await nft.save();
    }
    
    // Agrega la relación entre el nuevo propietario y los NFTs
    await newOwner.addNfts(nfts);
    
    // Devuelve una respuesta exitosa
    res.json({ message: "Owner NFT changed succesfully" });
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola y devuelve una respuesta con el error
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getNfts,
  getNftById,
  updateNft,
  addViewsNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft,
  changeNftOwner,
  getNftQuantity
};
