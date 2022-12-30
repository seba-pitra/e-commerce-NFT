export default function CategoriesSelector(){
    
    return(
        <>
            <div className="inputContainer">
                <h5>Category</h5>
                <p>
                    {" "}
                    Classify your nft from the following categories. You must select
                    all of them or you will not be able to create the nft{" "}
                </p>

                <button className="addCategory"></button>

                <select onChange={(e) => handleChangeSelect(e, 0)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Specie{" "}
                    </option>
                    {allCategories.species.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>

                <select onChange={(e) => handleChangeSelect(e, 1)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Subspecie{" "}
                    </option>
                    {allCategories.species2.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>

                <select onChange={(e) => handleChangeSelect(e, 2)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Art{" "}
                    </option>
                    {allCategories.art.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>

                <select onChange={(e) => handleChangeSelect(e, 3)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Type{" "}
                    </option>
                    {allCategories.type.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>

                <select onChange={(e) => handleChangeSelect(e, 4)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Style{" "}
                    </option>
                    {allCategories.style.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>

                <select onChange={(e) => handleChangeSelect(e, 5)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Restriccion{" "}
                    </option>
                    {allCategories.rest.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>

                <select onChange={(e) => handleChangeSelect(e, 6)} name="categories">
                    <option hidden disabled selected value>
                    {" "}
                    Select Background{" "}
                    </option>
                    {allCategories.flat.map((e) => (
                    <option value={e} name="categories" key={e}>
                        {" "}
                        {e}{" "}
                    </option>
                    ))}
                </select>
                </div>

                <div className="ilustration-validations">
                <input
                    className={
                    errors.name === "Name is correct" &&
                    errors.price === "Price is correct"
                        ? "submit"
                        : "errorSubmit"
                    }
                    type="submit"
                    value={"Create NFT"}
                    disabled={createdNft.categories.includes("")}
                    onClick={(e) => handleSubmit(e)}
                />
                </div>

                <div className="buttons-next-prev">
                <button onClick={back}> back</button>
                </div>
        </>
    )
}