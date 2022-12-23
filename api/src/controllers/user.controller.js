const { User, Nft } = require("../db");
const { superUser } = require("../jsondata/superUserData.json")

const createUser = async (req, res) => {
  try {
    const foundUser = await User.create({
      ...req.body
    })
    res.status(200).send(foundUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: {
        model : Nft
      }
    })
    if (allUsers.length === 0) {
      throw new Error(`No users found on database`);
    }else{
      return res.status(200).json(allUsers)
    }
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
}

const updateUser = async (req, res) => {
  try{
    const { id } = req.params;
    const dataToUpdate = req.body;
    const userToUpdate = await User.findByPk(id)
    if(userToUpdate){
      const [updatedUser, created] = await User.upsert({
        id : id,
        ...dataToUpdate
      })
      res.status(200).send(updatedUser);
    }else{
      throw new Error(`No user found with id: ${id}`);
    }
  }catch(err){
    res.status(400).send({error : err.message});
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = User.findByPk(id, {
      include : {
        model : Nft
      }
    })
    if(foundUser){
      return res.status(200).json(foundUser)
    }else{
      throw new Error(`No user found with id: ${id}`)
    }
  } catch (error) {
    return res.status(200).json({error : error.message})
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByPk({
      where: {
        id: id,
      }
    })
    if (deletedUser) {
      await Nft.destroy({
        where : {
          id: id,
        }
      });
      return res.status(200).send(`${deletedUser.name}  successfully deleted`);
    }else {
      throw new Error(`no NFT found with id: ${id}`)
    }
  }catch (err) {
    return res.status(400).json({error : err.message})
  }
};

const restoreDeletedUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.restore({
      where : {
        id : id,
      }
    })
    const restoredUser = await Nft.findByPk({
      where : {
        id : id,
      }
    })
    if(restoredUser){
      return res.status(200).json({
        nft : restoredUser,
        message : `${restoredUser.name} successfully restored`
      })
    }else{
      throw new Error(`No nft found with id ${id}`)
    }
  }catch(err){
    return res.status(400).json({err : err.message})
  }
}

const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { dni } = req.body;
    const user = await User.findByPk(id)
    if(user){
      const [updatedUser, created] = await User.upsert({
        id : id,
        dni : dni
      })
      return res.status(200).json({
        user : updatedUser,
        dni : updatedUser.dni
      })
    }else{
      throw new Error(`No user found with id ${id}`)
    }
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}
/*
* Super user data
*/
const createSuperUser = async () => {
  try {
    let response = await User.findOne({
      where: {
        id : superUser.id
      }
    })
    if(!response){
      response = await User.create(superUser)
    }
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  restoreDeletedUser,
  verifyUser,
  createSuperUser
};
