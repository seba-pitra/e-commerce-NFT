import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../../../redux/actions"


export default function UserCollectionsSelector({user, styles, selectCollection, createdNft}) {
    const dispatch = useDispatch();
    const shouldUpdate = useSelector(state => state.shouldUpdate)


    useEffect(()=> {
        dispatch(actions.logInUser(user.id))
    }, [shouldUpdate])
    
    const userCollectionsChecks = user.collections?.map((collection) => (
        <div className={styles["created-collections"]}>
        <label htmlFor={collection.id}>
            <b>{collection.name}</b>
        </label>
        <input
            type="checkbox"
            value={collection.id}
            dafaultChecked={createdNft.collectionId === collection.id}
            onClick={(e) => {
                selectCollection(e);
            }}
            className={styles["option-btn btn-filter"]}
            // className="option-btn btn-filter" SE VA A ROMPER CUANDO FUNCIONE EL CREATE. ES DE OTRO ARCHIVO
            />
        </div>
    ))

    return (
        <>
            {userCollectionsChecks}
        </>
    )
}