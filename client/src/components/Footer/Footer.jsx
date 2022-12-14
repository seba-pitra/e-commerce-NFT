import React from 'react';
import './Footer.css';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';


export default function Footer(){
    return(
<div>
	    
	    {/* Footer  Start */} 
  <footer
          className="text-center text-lg-start text-white"
          style={{backgroundColor: "#1c2331"}}
          >
    <section
             className="d-flex justify-content-between p-4"
             style={{backgroundColor: "#D3448B"}}
             >
      <div className="me-5">
        <span>Follow us :</span>
      </div>
      <div>
        <a href="#!" className="text-white me-4">
         <FacebookIcon />
        </a>
        <a href="#!" className="text-white me-4">
        <TwitterIcon />
	</a>
        <a href="#!" className="text-white me-4">
        <InstagramIcon />
        </a>
        <a href="#!" className="text-white me-4">
        <RssFeedIcon />
        </a>
        <a href="#!" className="text-white me-4">
        <LinkedInIcon />
        </a>
        <a href="#!" className="text-white me-4">
	<GitHubIcon />
	</a>
      </div>
    </section>
    <section className="">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Non Fungible Town</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              The world’s first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs).
              Buy, sell, and discover exclusive digital items.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Marketplace</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              <a href="#!" className="text-white">All NFTs</a>
            </p>
            <p>
              <a href="#!" className="text-white">Art</a>
            </p>
            <p>
              <a href="#!" className="text-white">Collectibles</a>
            </p>
            <p>
              <a href="#!" className="text-white">Virtual Worlds</a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">My Account</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              <a href="#!" className="text-white">Profile</a>
            </p>
            <p>
              <a href="#!" className="text-white">Favorites</a>
            </p>
            <p>
              <a href="#!" className="text-white">My Collections</a>
            </p>
            <p>
              <a href="#!" className="text-white">I am admin</a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p><i className="fas fa-home mr-3"></i> Hacker Av #15</p>
            <p><i className="fas fa-envelope mr-3"></i> info@nonfungibletown.com</p>
            <p><i className="fas fa-phone mr-3"></i> + 52 234 567 88</p>
            <p><i className="fas fa-print mr-3"></i> + 52 234 567 89</p>
          </div>
        </div>
      </div>
    </section>

    <div
         className="text-center p-3"
         style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
         >
      © 2022 Copyright:
      <a className="text-white" href="https://www.nonfungibletown.com/"
         >NonFungibleTown.com</a
        >
    </div>
  </footer>

	     </div> 

    );
};
