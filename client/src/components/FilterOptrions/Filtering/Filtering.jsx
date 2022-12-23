import * as actions from "../../../redux/actions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import "./Filtering.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const collections = useSelector((state) => state.collections);

  let category = { Species: [], Species2: [], Art: [], Type: [], Style: [], Rest: [], Backg: [] }

  nfts.forEach(n => {
    category.Species.push(n.category[0])
    category.Species2.push(n.category[1])
    category.Art.push(n.category[2])
    category.Type.push(n.category[3])
    category.Style.push(n.category[4])
    category.Rest.push(n.category[5])
    category.Backg.push(n.category[6])
  })

  category.Species = Array.from(new Set(category.Species))
  category.Species2 = Array.from(new Set(category.Species2))
  category.Art = Array.from(new Set(category.Art))
  category.Type = Array.from(new Set(category.Type))
  category.Style = Array.from(new Set(category.Style))
  category.Rest = Array.from(new Set(category.Rest))
  category.Backg = Array.from(new Set(category.Backg))
  
  let category2 = {
    Species: [],
    Species2: [],
    Art: [],
    Type: [],
    Style: [],
    Rest: [],
    Backg: []
  }

  filteredNfts.forEach(c => {
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Collections:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {collections.map((collection) => {
                return (
                  <>
                    <label htmlFor={collection.id}>{collection.name}</label>
                    <input
                    type="checkbox"
                    key={collection.id}
                    value={collection.id}
                    onClick={(e) => {selectCollection(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Specie:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Species?.map((specie) => {
                return (
                  <>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                    type="checkbox"
                    key={specie}
                    value={specie}
                    onClick={(e) => {selectCategorySpecies(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Species 2:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Species2?.map((specie) => {
                return (
                  <>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                    type="checkbox"
                    key={specie}
                    value={specie}
                    onClick={(e) => {selectCategorySpecies2(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Art:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Art?.map((specie) => {
                return (
                  <>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                    type="checkbox"
                    key={specie}
                    value={specie}
                    onClick={(e) => {selectCategoryArt(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Type:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Type?.map((specie) => {
                return (
                  <>
                    <label htmlFor={specie}>{specie}</label>
                    <input
                    type="checkbox"
                    key={specie}
                    value={specie}
                    onClick={(e) => {selectCategoryType(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Style:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Style?.map((value) => {
                return (
                  <>
                    <label htmlFor={value}>{value}</label>
                    <input
                    type="checkbox"
                    key={value}
                    value={value}
                    onClick={(e) => {selectCategoryStyle(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Rest:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Rest?.map((value) => {
                return (
                  <>
                    <label htmlFor={value}>{value}</label>
                    <input
                    type="checkbox"
                    key={value}
                    value={value}
                    onClick={(e) => {selectCategoryRest(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <label className="label" htmlFor="genres">
            Select Background:
          </label>
        </AccordionSummary>
        <AccordionDetails>
              {category.Backg?.map((value) => {
                return (
                  <>
                    <label htmlFor={value}>{value}</label>
                    <input
                    type="checkbox"
                    key={value}
                    value={value}
                    onClick={(e) => {selectCategoryBackg(e)}}
                    className="option-btn btn-filter"
                    />
                  </>
                );
              })}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
