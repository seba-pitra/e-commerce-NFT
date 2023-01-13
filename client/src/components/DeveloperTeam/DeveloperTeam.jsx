import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
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

//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkDeveloperTeam.module.css"
import lightStyles from "./stylesheets/LightDeveloperTeam.module.css"


const DeveloperTeam = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const  isDark  = useSelector((state) => state.activeThemeIsDark);

  const styles = useStyles(darkStyles, lightStyles);
  
  return (
    <div className={styles["about-us"]}>
      <div className={styles["about-us-container"]}>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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
               
<p>Dynamic and ambitious software developer.</p>

<p>A personable and friendly individual, with excellent communication skills,
a positive attitude and an unwavering commitment to delivering high-quality results.</p>

	  <p>
	  With a true passion for technology and the drive to constantly learn and evolve, 
	  this developer is a valuable asset to any team looking to push the boundaries of what's possible with web development.
	  </p>
"show me the code !!" is my motto.
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/valentin-coellar-746a833b/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/valcoellar"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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
                
	  <p>
	  A dedicated and dynamic software developer with a strong work ethic and a passion for technology.
	  </p>
	  <p>
	  A responsible and reliable team member, who is always willing to go the extra mile to ensure the success of the project.
	  </p>
<p>Professional and friendly, this developer is a true pleasure to work with and has a great ability to build strong relationships with colleagues and clients alike,
known for his "work hard, play hard" mentality, he balances his dedication to his career with a desire to enjoy life to the fullest.</p>




              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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

<p>A young and bold software developer with a fearless attitude towards code.</p>

<p>Passionate about programming, driven by the thrill of tackling complex and challenging problems.</p>

 <p>A self-starter with a strong work ethic and a thirst for knowledge, always eager to learn and try new technologies,
he is not intimidated by large and complex projects and welcome them as a new opportunity to prove his skills and his passion for coding.</p>

	               </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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

                <p>A skilled software developer with strong leadership skills and a natural ability to work well in a team environment.</p>

                  I am not only an expert in multiple programming languages, but also a good friend and colleague, a great listener and an excellent communicator.</p>
                <p>I like take the time to understand the needs of others and is able to clearly convey his own thoughts and ideas. 


              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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

<p>I am able to guide, motivate and lead the team to success with my strong analytical and problem-solving skills,
	  attention to detail and proactive attitude.</p>

<p>I am  committed to ongoing learning and personal development, and always strives to be at the forefront of new technologies and industry best practices.
As young developer im not afraid to go the extra mile to deliver high-quality results and exceed expectations.

	  "Brinng the Solutions!!" is my motto. 
</p>




	  </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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
          
I am a dynamic programmer, with a strong and fun mentality.</p>
	  <p>I am always looking for new challenges and opportunities to learn and grow professionally.</p>

<p>I love working in a team and collaborating with my colleagues to achieve common goals; I am characterized by being elegant in my programming style, always seeking the best solution for each problem.</p> <p> I have fun working with new technologies and adapt quickly to changes.

	  As always  --- "Let the Music begins !! " 



              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion style={ isDark ? { backgroundColor: "#616161", color: "#FAFAFA" } : { backgroundColor: "#EEEEEE", color: "#212121" }}>
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
               
I am a dynamic and intelligent programmer, dedicated and committed to my work.</p>

	  <p>I am characterized by being contemplative and reflective in my approach, always looking for the best solution for each problem.</p>
	  <p>However, I also enjoy having fun and having a positive attitude in my work. I consider myself an introspective person, constantly evaluating and improving my own skills and processes.</p> 
	  <p>I love learning and am constantly seeking new opportunities to grow professionally. My balanced approach and commitment to excellence are some of the characteristics that define me as a programmer. My motto is "Callme Bugs Slayer"


              {/* Con una gran pasión por aprender, me considero un joven programador con una gran habilidad para colaborar en proyectos. He trabajado con lenguajes de programación como JavaScript, React, HTML, CSS, y actualmente estoy estudiando Java. Me esfuerzo por utilizar la tecnología de manera inteligente para solucionar problemas de manera eficiente y efectiva. Siempre estoy dispuesto a adquirir nuevas habilidades y trabajo duro para ayudar a mi equipo y resolver problemas. */}
              </p>
              <div>
                <h2>Find me: </h2>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/seba-pitra/e-commerce-NFT"
                    className={isDark ? "text-white me-4" : "text-dark me-4"}
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
