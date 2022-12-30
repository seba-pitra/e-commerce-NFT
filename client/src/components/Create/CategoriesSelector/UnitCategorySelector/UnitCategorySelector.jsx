import { allCategories } from "../../../../constants/categories.json"

export default function UnitCategorySelector(props) {

    const handleChangeSelect = (e, index) => {
        e.preventDefault();
        let auxCats = props.createdNft.categories;
        auxCats[index] = e.target.value;
        props.setCreatedNft((prev) => ({
            ...prev,
            categories: auxCats,
        }));
    };

    return (
        <>
        <select 
            onChange={(e) => handleChangeSelect(e, props.index)}
            name="categories"
            value={"Select " + props.categoryName}    
                >
                    <option hidden disabled value>
                        Select {props.categoryName}
                    </option>
                        {allCategories[props.categoryType].map((category) => (
                        <option 
                            value={category} 
                            name="categories"
                            key={category}>
                            {category}
                        </option>
                    ))}
                </select>
        </>
    );
}