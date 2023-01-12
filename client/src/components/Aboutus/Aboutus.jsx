import React from "react";
//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkAboutUs.module.css"
import lightStyles from "./stylesheets/LightAboutUs.module.css"

export default function Aboutus() {
  const styles = useStyles(darkStyles, lightStyles);
	return (
		<div className={styles["main-container-about-us"]}>
		<h4>
			Welcome to Non-Fungible-Town, your premier destination for the best and rarest non-fungible tokens (NFTs) on the market.
			We are a team of dedicated NFT enthusiasts who have a passion for collecting and trading these unique digital assets. Our mission is to provide our customers with a user-friendly and secure platform to buy, sell, and discover the most sought-after NFTs from top artists and creators around the world.
			At Non-Fungible-Town, we believe in the power of NFTs to revolutionize the way we own and value digital content.
			That's why we strive to make it easy for anyone to join the NFT craze and become a part of this exciting new world of digital ownership.
			So whether you're a seasoned collector or just starting out on your NFT journey, we invite you to explore the endless possibilities at Non-Fungible-Town.
			We look forward to helping you find the perfect NFT to add to your collection.
		</h4>
		</div>
	);
}
