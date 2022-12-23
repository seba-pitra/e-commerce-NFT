import * as actions from "../../../redux/actions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Filtering.css";

export default function Filtering() {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedCategorySpecies, setSelectedCategorySpecies] = useState([]);
  const [selectedCategorySpecies2, setSelectedCategorySpecies2] = useState([]);
  const [selectedCategoryArt, setSelectedCategoryArt] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState([]);
  const [selectedCategoryStyle, setSelectedCategoryStyle] = useState([]);
  const [selectedCategoryRest, setSelectedCategoryRest] = useState([]);
  const [selectedCategoryBackg, setSelectedCategoryBackg] = useState([]);

  const dispatch = useDispatch();

  const nfts = useSelector((state) => state.nfts);
  const nfts2 = useSelector((state) => state.filteredNfts);
  const collections = useSelector((state) => state.collections);

  let category = { Species: [], Species2: [], Art: [], Type: [], Style: [], Rest: [], Backg: [] }

  nfts.map(n => {
    category.Species.push(n.category[0])
    category.Species2.push(n.category[1])
    category.Art.push(n.category[2])
    category.Type.push(n.category[3])
    category.Style.push(n.category[4])
    category.Rest.push(n.category[5])
    category.Backg.push(n.category[6])
  })

  category.Species = new Set(category.Species)
  category.Species = Array.from(category.Species)
  category.Species2 = new Set(category.Species2)
  category.Species2 = Array.from(category.Species2)
  category.Art = new Set(category.Art)
  category.Art = Array.from(category.Art)
  category.Type = new Set(category.Type)
  category.Type = Array.from(category.Type)
  category.Style = new Set(category.Style)
  category.Style = Array.from(category.Style)
  category.Rest = new Set(category.Rest)
  category.Rest = Array.from(category.Rest)
  category.Backg = new Set(category.Backg)
  category.Backg = Array.from(category.Backg)

  // console.log("allNfts")
  // console.log(category)

  let category2 = {
    Species: [],
    Species2: [],
    Art: [],
    Type: [],
    Style: [],
    Rest: [],
    Backg: []
  }

  nfts2.map(c => {
    category2.Species.push(c.category[0])
    category2.Species2.push(c.category[1])
    category2.Art.push(c.category[2])
    category2.Type.push(c.category[3])
    category2.Style.push(c.category[4])
    category2.Rest.push(c.category[5])
    category2.Backg.push(c.category[6])
  })

  category2.Species = new Set(category2.Species)
  category2.Species = Array.from(category2.Species)
  category2.Species2 = new Set(category2.Species2)
  category2.Species2 = Array.from(category2.Species2)
  category2.Art = new Set(category2.Art)
  category2.Art = Array.from(category2.Art)
  category2.Type = new Set(category2.Type)
  category2.Type = Array.from(category2.Type)
  category2.Style = new Set(category2.Style)
  category2.Style = Array.from(category2.Style)
  category2.Rest = new Set(category2.Rest)
  category2.Rest = Array.from(category2.Rest)
  category2.Backg = new Set(category2.Backg)
  category2.Backg = Array.from(category2.Backg)

  // console.log("FilteredNfts")
  // console.log(category2)

  const selectCollection = (e) => {
    setSelectedCollection(e.target.value);
    dispatch(actions.filterCollection(e.target.value));
  };

  const selectCategorySpecies = (e) => {
    if(selectedCategorySpecies.includes(e.target.value)) {
      let filtered = selectedCategorySpecies.filter(a => a !== e.target.value)
      setSelectedCategorySpecies(filtered)
    }
    else setSelectedCategorySpecies([...selectedCategorySpecies, e.target.value]);
    dispatch(actions.setCategorySpecies(selectedCategorySpecies));
    dispatch(actions.filterCategory());
  };

  const selectCategorySpecies2 = (e) => {
    if(selectedCategorySpecies2.includes(e.target.value)) {
      let filtered = selectedCategorySpecies2.filter(a => a !== e.target.value)
      setSelectedCategorySpecies2(filtered)
    }
    else setSelectedCategorySpecies2([...selectedCategorySpecies2, e.target.value]);
    dispatch(actions.setCategorySpecies2(selectedCategorySpecies2));
    dispatch(actions.filterCategory());
  };

  const selectCategoryArt = (e) => {
    if(selectedCategoryArt.includes(e.target.value)) {
      let filtered = selectedCategoryArt.filter(a => a !== e.target.value)
      setSelectedCategoryArt(filtered)
    }
    else setSelectedCategoryArt([...selectedCategoryArt, e.target.value]);
    dispatch(actions.setCategoryArt(selectedCategoryArt));
    dispatch(actions.filterCategory());
  };

  const selectCategoryType = (e) => {
    if(selectedCategoryType.includes(e.target.value)) {
      let filtered = selectedCategoryType.filter(a => a !== e.target.value)
      setSelectedCategoryType(filtered)
    }
    else setSelectedCategoryType([...selectedCategoryType, e.target.value]);
    dispatch(actions.setCategoryType(selectedCategoryType));
    dispatch(actions.filterCategory());
  };

  const selectCategoryStyle = (e) => {
    if(selectedCategoryStyle.includes(e.target.value)) {
      let filtered = selectedCategoryStyle.filter(a => a !== e.target.value)
      setSelectedCategoryStyle(filtered)
    }
    else setSelectedCategoryStyle([...selectedCategoryStyle, e.target.value]);
    dispatch(actions.setCategoryStyle(selectedCategoryStyle));
    dispatch(actions.filterCategory());
  };

  const selectCategoryRest = (e) => {
    if(selectedCategoryRest.includes(e.target.value)) {
      let filtered = selectedCategoryRest.filter(a => a !== e.target.value)
      setSelectedCategoryRest(filtered)
    }
    else setSelectedCategoryRest([...selectedCategoryRest, e.target.value]);
    dispatch(actions.setCategoryRest(selectedCategoryRest));
    dispatch(actions.filterCategory());
  };

  const selectCategoryBackg = (e) => {
    if(selectedCategoryBackg.includes(e.target.value)) {
      let filtered = selectedCategoryBackg.filter(a => a !== e.target.value)
      setSelectedCategoryBackg(filtered)
    }
    else setSelectedCategoryBackg([...selectedCategoryBackg, e.target.value]);
    dispatch(actions.setCategoryBackg(selectedCategoryBackg));
    dispatch(actions.filterCategory());
  };

  return (
    <>
      <div className="options-container">
        <label className="label" htmlFor="genres">
          Collections:{" "}
        </label>
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCollection(e);
            }}
          >
            <option hidden disabled selected>
              Select collection
            </option>
            {collections.map((collection) => {
              return (
                <option
                  key={collection.id}
                  value={collection.id}
                  className="option-btn btn-filter"
                >
                  {collection.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategorySpecies(e);
            }}
          >
            <option hidden disabled selected> Select Species </option>
            
            {
            category.Species?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategorySpecies2(e);
            }}
          >
            <option hidden disabled selected> Select Species 2 </option>
            
            {
            category.Species2?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategoryArt(e);
            }}
          >
            <option hidden disabled selected> Select Art </option>
            
            {
            category.Art?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategoryType(e);
            }}
          >
            <option hidden disabled selected> Select Type</option>
            
            {
            category.Type?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategoryStyle(e);
            }}
          >
            <option hidden disabled selected> Select Style </option>
            
            {
            category.Style?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategoryRest(e);
            }}
          >
            <option hidden disabled selected> Select Rest </option>
            
            {
            category.Rest?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="options-container">
        <div className="button-list" name="genres" id="">
          <select
            onChange={(e) => {
              selectCategoryBackg(e);
            }}
          >
            <option hidden disabled selected> Select Background </option>
            
            {
            category.Backg?.map((value) => {
              return (
                <option
                  key={value}
                  value={value}
                  className="option-btn btn-filter"
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      
    </>
  );
}
