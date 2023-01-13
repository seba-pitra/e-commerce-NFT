import * as actions from "../../../redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PriceSelector from "../PriceSelector/PriceSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Offcanvas from "react-bootstrap/Offcanvas";
import SortIcon from "@mui/icons-material/Sort";

import styles from "./stylesheets/Filtering.module.css";

export default function Filtering() {
  // Checkbox filters
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [selectedCategorySpecies, setSelectedCategorySpecies] = useState([]);
  const [selectedCategorySpecies2, setSelectedCategorySpecies2] = useState([]);
  const [selectedCategoryArt, setSelectedCategoryArt] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState([]);
  const [selectedCategoryStyle, setSelectedCategoryStyle] = useState([]);
  const [selectedCategoryRest, setSelectedCategoryRest] = useState([]);
  const [selectedCategoryBackg, setSelectedCategoryBackg] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const  isDark  = useSelector((state) => state.activeThemeIsDark);

  const handleClose = () => setShowFilters(false);
  const handleShow = () => {
    setShowFilters(true);
  };

  const dispatch = useDispatch();

  const nfts = useSelector((state) => state.nfts);
  let collections = useSelector((state) => state.collections);
  collections = collections.sort((nftA, nftB) => {
    if (nftA.name.toUpperCase() > nftB.name.toUpperCase()) return 1;
    if (nftB.name.toUpperCase() > nftA.name.toUpperCase()) return -1;
    return 0;
  });

  useEffect(() => {
    dispatch(actions.setCollections(selectedCollection));
    dispatch(actions.setCategorySpecies(selectedCategorySpecies));
    dispatch(actions.setCategorySpecies2(selectedCategorySpecies2));
    dispatch(actions.setCategoryArt(selectedCategoryArt));
    dispatch(actions.setCategoryType(selectedCategoryType));
    dispatch(actions.setCategoryStyle(selectedCategoryStyle));
    dispatch(actions.setCategoryRest(selectedCategoryRest));
    dispatch(actions.setCategoryBackg(selectedCategoryBackg));
    dispatch(actions.filterNfts());
  }, [
    selectedCategorySpecies,
    selectedCategorySpecies2,
    selectedCategoryArt,
    selectedCategoryType,
    selectedCategoryStyle,
    selectedCategoryRest,
    selectedCategoryBackg,
    selectedCollection,
  ]);

  let category = {
    Species: [],
    Species2: [],
    Art: [],
    Type: [],
    Style: [],
    Rest: [],
    Backg: [],
  };

  nfts.forEach((n) => {
    category.Species.push(n.category[0]);
    category.Species2.push(n.category[1]);
    category.Art.push(n.category[2]);
    category.Type.push(n.category[3]);
    category.Style.push(n.category[4]);
    category.Rest.push(n.category[5]);
    category.Backg.push(n.category[6]);
  });

  category.Species = Array.from(new Set(category.Species)).sort();
  category.Species2 = Array.from(new Set(category.Species2)).sort();
  category.Art = Array.from(new Set(category.Art)).sort();
  category.Type = Array.from(new Set(category.Type)).sort();
  category.Style = Array.from(new Set(category.Style)).sort();
  category.Rest = Array.from(new Set(category.Rest)).sort();
  category.Backg = Array.from(new Set(category.Backg)).sort();

  const selectCollection = (e) => {
    if (selectedCollection.includes(e.target.value)) {
      let filtered = selectedCollection.filter((a) => a !== e.target.value);
      setSelectedCollection(filtered);
    } else setSelectedCollection([...selectedCollection, e.target.value]);
  };

  const selectCategorySpecies = (e) => {
    if (selectedCategorySpecies.includes(e.target.value)) {
      let filtered = selectedCategorySpecies.filter(
        (a) => a !== e.target.value
      );
      setSelectedCategorySpecies(filtered);
    } else
      setSelectedCategorySpecies([...selectedCategorySpecies, e.target.value]);
  };

  const selectCategorySpecies2 = (e) => {
    if (selectedCategorySpecies2.includes(e.target.value)) {
      let filtered = selectedCategorySpecies2.filter(
        (a) => a !== e.target.value
      );
      setSelectedCategorySpecies2(filtered);
    } else
      setSelectedCategorySpecies2([
        ...selectedCategorySpecies2,
        e.target.value,
      ]);
  };

  const selectCategoryArt = (e) => {
    if (selectedCategoryArt.includes(e.target.value)) {
      let filtered = selectedCategoryArt.filter((a) => a !== e.target.value);
      setSelectedCategoryArt(filtered);
    } else setSelectedCategoryArt([...selectedCategoryArt, e.target.value]);
  };

  const selectCategoryType = (e) => {
    if (selectedCategoryType.includes(e.target.value)) {
      let filtered = selectedCategoryType.filter((a) => a !== e.target.value);
      setSelectedCategoryType(filtered);
    } else setSelectedCategoryType([...selectedCategoryType, e.target.value]);
  };

  const selectCategoryStyle = (e) => {
    if (selectedCategoryStyle.includes(e.target.value)) {
      let filtered = selectedCategoryStyle.filter((a) => a !== e.target.value);
      setSelectedCategoryStyle(filtered);
    } else setSelectedCategoryStyle([...selectedCategoryStyle, e.target.value]);
  };

  const selectCategoryRest = (e) => {
    if (selectedCategoryRest.includes(e.target.value)) {
      let filtered = selectedCategoryRest.filter((a) => a !== e.target.value);
      setSelectedCategoryRest(filtered);
    } else setSelectedCategoryRest([...selectedCategoryRest, e.target.value]);
  };

  const selectCategoryBackg = (e) => {
    if (selectedCategoryBackg.includes(e.target.value)) {
      let filtered = selectedCategoryBackg.filter((a) => a !== e.target.value);
      setSelectedCategoryBackg(filtered);
    } else setSelectedCategoryBackg([...selectedCategoryBackg, e.target.value]);
  };

  // Inputs filters
  const [inputCollections, setInputCollections] = useState("");
  collections = collections.filter(item => item.name.toUpperCase().includes(inputCollections.toUpperCase()));

  // const [inputCategorySpecies, setInputCategorySpecies] = useState("");
  // category.Species = category.Species.filter(item => item.toUpperCase().includes(inputCategorySpecies.toUpperCase()));

  const [inputCategorySpecies2, setInputCategorySpecies2] = useState("");
  category.Species2 = category.Species2.filter(item => item.toUpperCase().includes(inputCategorySpecies2.toUpperCase()));

  // const [inputArt, setInputArt] = useState("");
  // category.Art = category.Art.filter(item => item.toUpperCase().includes(inputArt.toUpperCase()));

  // const [inputType, setInputType] = useState("");
  // category.Type = category.Type.filter(item => item.toUpperCase().includes(inputType.toUpperCase()));

  // const [inputStyle, setInputStyle] = useState("");
  // category.Style = category.Style.filter(item => item.toUpperCase().includes(inputStyle.toUpperCase()));

  // const [inputRest, setInputRest] = useState("");
  // category.Rest = category.Rest.filter(item => item.toUpperCase().includes(inputRest.toUpperCase()));

  // const [inputBackg, setInputBackg] = useState("");
  // category.Backg = category.Backg.filter(item => item.toUpperCase().includes(inputBackg.toUpperCase()));
 
  return (
    <div className={styles["filters-container"]}>
      <SortIcon  style={ isDark ? { color: "#fafafa" } :  { color: "#212121" } }
        className={styles["filter-icon"]}
        fontSize="large"
        onClick={handleShow}
      />
      <Offcanvas 
        show={showFilters}
        onHide={handleClose}
        placement={"start"}
        className={ isDark ? styles["offcanvas-container-dark"] : styles["offcanvas-container-light"] }
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className={styles["offcanvas-body"]} >

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Collections
              </label>
            </AccordionSummary>
            <AccordionDetails style={{  maxHeight: "600px",  overflowY: "scroll" }}>
              <input className={styles["search-input-filters"]} type="text" placeholder=" Search"
              value={inputCollections} onChange={(e) => setInputCollections(e.target.value)} />
              {collections.map((collection, index) => {
                let colName = collection.name.toLowerCase();
                colName = colName[0].toUpperCase() + colName.slice(1);
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={collection.id}>{colName}</label>
                    <input
                      type="checkbox"
                      key={collection.id}
                      value={collection.id}
                      defaultChecked = {selectedCollection.includes(collection.id)}
                      onClick={(e) => {
                        selectCollection(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select gender
              </label>
            </AccordionSummary>
            <AccordionDetails>
            {/* <input className={styles["search-input-filters"]} type="text" placeholder="Collections"
              value={inputCategorySpecies} onChange={(e) => setInputCategorySpecies(e.target.value)} /> */}
              {category.Species?.map((specie, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      defaultChecked = {selectedCategorySpecies.includes(specie)}
                      onClick={(e) => {
                        selectCategorySpecies(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Species
              </label>
            </AccordionSummary>
            <AccordionDetails style={{  maxHeight: "600px",  overflowY: "scroll" }}>
              <input className={styles["search-input-filters"]} type="text" placeholder=" Search"
              value={inputCategorySpecies2} onChange={(e) => setInputCategorySpecies2(e.target.value)} />
              {category.Species2?.map((specie, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={specie}>{specie}</label>
                    
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      defaultChecked = {selectedCategorySpecies2.includes(specie)}
                      onClick={(e) => {
                        selectCategorySpecies2(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Art
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {/* <input className={styles["search-input-filters"]} type="text" placeholder="Collections"
              value={inputArt} onChange={(e) => setInputArt(e.target.value)} /> */}
              {category.Art?.map((specie, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      defaultChecked = {selectedCategoryArt.includes(specie)}
                      onClick={(e) => {
                        selectCategoryArt(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Type
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {/* <input className={styles["search-input-filters"]} type="text" placeholder="Collections"
              value={inputType} onChange={(e) => setInputType(e.target.value)} /> */}
              {category.Type?.map((specie, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      defaultChecked = {selectedCategoryType.includes(specie)}
                      onClick={(e) => {
                        selectCategoryType(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Style
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {/* <input className={styles["search-input-filters"]} type="text" placeholder="Collections"
              value={inputStyle} onChange={(e) => setInputStyle(e.target.value)} /> */}
              {category.Style?.map((value, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={value}>{value}</label>
                    <input
                      type="checkbox"
                      key={value}
                      value={value}
                      defaultChecked = {selectedCategoryType.includes(value)}
                      onClick={(e) => {
                        selectCategoryStyle(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Rest
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {/* <input className={styles["search-input-filters"]} type="text" placeholder="Collections"
              value={inputRest} onChange={(e) => setInputRest(e.target.value)} /> */}
              {category.Rest?.map((value, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={value}>{value}</label>
                    <input
                      type="checkbox"
                      key={value}
                      value={value}
                      defaultChecked = {selectedCategoryRest.includes(value)}

                      onClick={(e) => {
                        selectCategoryRest(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Background
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {/* <input className={styles["search-input-filters"]} type="text" placeholder="Collections"
              value={inputBackg} onChange={(e) => setInputBackg(e.target.value)} /> */}
              {category.Backg?.map((value, index) => {
                return (
                  <div key={index} className={styles["input-checkbox"]}>
                    <label htmlFor={value}>{value}</label>
                    <input
                      type="checkbox"
                      key={value}
                      value={value}
                      defaultChecked = {selectedCategoryBackg.includes(value)}
                      onClick={(e) => {
                        selectCategoryBackg(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion style={ isDark ? { backgroundColor: "#757575", color: "#fafafa", fontWeight: "600", cursor: "pointer"} 
          : { backgroundColor: "#E0E0E0", color: "#212121", fontWeight: "600", cursor: "pointer" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Price Selector
              </label>
            </AccordionSummary>
            <AccordionDetails>
              <PriceSelector />
            </AccordionDetails>
          </Accordion>

          <button
            className={styles["reset-filters"]}
            onClick={() => {
              dispatch(actions.resetFilters());
            }}
          >
            Reset Filters
          </button>

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
