import React from 'react';
import {Link} from 'react-router-dom';
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
          class="text-center text-lg-start text-white"
          style={{backgroundColor: "#1c2331"}}
          >
    <section
             class="d-flex justify-content-between p-4"
             style={{backgroundColor: "#D3448B"}}
             >
      <div class="me-5">
        <span>Follow us :</span>
      </div>
      <div>
        <a href="#!" class="text-white me-4">
         <FacebookIcon />
        </a>
        <a href="#!" class="text-white me-4">
        <TwitterIcon />
	</a>
        <a href="#!" class="text-white me-4">
        <InstagramIcon />
        </a>
        <a href="#!" class="text-white me-4">
        <RssFeedIcon />
        </a>
        <a href="#!" class="text-white me-4">
        <LinkedInIcon />
        </a>
        <a href="#!" class="text-white me-4">
	<GitHubIcon />
	</a>
      </div>
    </section>
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">Non Fungible Town</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              The world’s first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs).
              Buy, sell, and discover exclusive digital items.
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">Marketplace</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              <a href="#!" class="text-white">All NFTs</a>
            </p>
            <p>
              <a href="#!" class="text-white">Art</a>
            </p>
            <p>
              <a href="#!" class="text-white">Collectibles</a>
            </p>
            <p>
              <a href="#!" class="text-white">Virtual Worlds</a>
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">My Account</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              <a href="#!" class="text-white">Profile</a>
            </p>
            <p>
              <a href="#!" class="text-white">Favorites</a>
            </p>
            <p>
              <a href="#!" class="text-white">My Collections</a>
            </p>
            <p>
              <a href="#!" class="text-white">I am admin</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold">Contact</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p><i class="fas fa-home mr-3"></i> Hacker Av #15</p>
            <p><i class="fas fa-envelope mr-3"></i> info@nonfungibletown.com</p>
            <p><i class="fas fa-phone mr-3"></i> + 52 234 567 88</p>
            <p><i class="fas fa-print mr-3"></i> + 52 234 567 89</p>
          </div>
        </div>
      </div>
    </section>

    <div
         class="text-center p-3"
         style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
         >
      © 2022 Copyright:
      <a class="text-white" href="https://www.nonfungibletown.com/"
         >NonFungibleTown.com</a
        >
    </div>
  </footer>

	     </div> 

    );
};
