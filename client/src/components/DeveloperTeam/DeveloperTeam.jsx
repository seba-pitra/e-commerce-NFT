import styles from "./DeveloperTeam.module.css";
import img1 from "../../images/developerTeam/developer-team-1.jfif";
import img2 from "../../images/developerTeam/developer-team-2.jfif";
import img3 from "../../images/developerTeam/developer-team-3.jfif";
import img4 from "../../images/developerTeam/developer-team-4.jfif";
import img5 from "../../images/developerTeam/developer-team-5.jfif";
import img6 from "../../images/developerTeam/developer-team-6.jfif";
import img7 from "../../images/developerTeam/developer-team-7.jfif";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
const DeveloperTeam = (props) => {

const history = useHistory();
const dispatch = useDispatch();

const validateUser = async () => {
let loginStatusStorage = localStorage.getItem("Logged");
console.log('Aqui estoy !!', loginStatusStorage)
    if (loginStatusStorage === "Estoy loggeado") {
      dispatch(actions.getAllNfts());
      dispatch(actions.getAllCollections());
      dispatch(actions.getEthPrice());
    } else {
      history.push("/");
    }
  };



 useEffect(() => {
      validateUser();
  }, [dispatch]);





  return (
    <div className={styles["about-us"]}>
      <div className={styles["about-us-container"]}>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>Valentin Coellar</h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img1} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>
                Valentin Coellar
              </h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>Miguel Villa </h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img2} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>Miguel Villa</h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>Sebastian Pitra</h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img3} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>
                Sebastian Pitra
              </h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>Francisco Schlatter</h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img4} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>
                Francisco Schlatter
              </h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>Bruno Osuna</h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img5} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>Bruno Osuna</h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>James Santos</h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img6} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>James Santos</h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ backgroundColor: "#313c52", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ margin: "0" }}>Daniel Molinaro</h1>
          </AccordionSummary>
          <AccordionDetails className={styles["about-us-card-accordion"]}>
            <img src={img7} alt="about-us" className={styles["about-us-img"]} />
            <div className={styles["about-accordion-text"]}>
              <h1 className={styles["about-accordion-title"]}>
                Daniel Molinaro
              </h1>
              <p className={styles["about-accordion-description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore voluptatem reprehenderit velit ab in itaque minima facere
                quo, aspernatur amet perferendis sint excepturi incidunt!
                Deserunt distinctio impedit numquam repudiandae illum!
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className="text-white me-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className="text-white me-4"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default DeveloperTeam;
