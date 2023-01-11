import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import "./Footer.css"

export default function Footer() {
  // const  isDark  = useSelector((state) => state.activeThemeIsDark);
  const { pathname } = useLocation();

  return (
    <div className="full-footer-container">
      {/* Footer  Start */}
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#1c2331" }}
      >
        <section
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: "#D3448B" }}
        >
          <div className="me-5">
            <span>Follow us :</span>
          </div>
          <div>
            <a href="https://es-la.facebook.com/" className="text-white me-4">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/" className="text-white me-4">
              <TwitterIcon />
            </a>
            <a href="https://www.instagram.com/" className="text-white me-4">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/" className="text-white me-4">
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/seba-pitra/e-commerce-NFT"
              target="_blank"
              rel="noreferrer noopener"
              className="text-white me-4"
            >
              <GitHubIcon />
            </a>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <div className="text-uppercase fw-bold">Non Fungible Town</div>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  The world’s first and largest digital marketplace for crypto
                  collectibles and non-fungible tokens (NFTs). Buy, sell, and
                  discover exclusive digital items.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <div className="text-uppercase fw-bold text-wrap">
                  Marketplace
                </div>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                <Link to="/marketplace" className={`text-white ${pathname==="/"&&"footerLink-disabled"}`}>
                    All NFTs
                  </Link>
                </p>

                <p>
                  <Link to="/collections" className={`text-white ${pathname==="/"&&"footerLink-disabled"}`}>
                    Collectibles
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <div className="text-uppercase fw-bold text-wrap">
                  My Account
                </div>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <Link to="/myAccount" className={`text-white ${pathname==="/"&&"footerLink-disabled"}`}>
                    Profile
                  </Link>
                </p>
                <p>
                  <Link to="/mycollections" className={`text-white ${pathname==="/"&&"footerLink-disabled"}`}>  
                      My Collections  
                  </Link>
                </p>
                <p>
                  <Link to="/aboutus" className={`text-white ${pathname==="/"&&"footerLink-disabled"}`}>
                    About Us
                  </Link>
                </p>
                <p>
                  <Link to="/admin/adminDashboard" className={`text-white ${pathname==="/"&&"footerLink-disabled"}`}>
                    I am admin
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <div className="text-uppercase fw-bold text-wrap">Contact</div>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i> Hacker Av #15
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  info@nonfungibletown.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 52 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 52 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="https://www.nonfungibletown.com/">
            NonFungibleTown.com
          </a>
        </div>
      </footer>
    </div>
  );
}
