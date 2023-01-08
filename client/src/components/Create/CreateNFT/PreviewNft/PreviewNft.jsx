import styles from "../../stylesheets/PreviewNFT.module.css";

export default function PreviewNFT(props) {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["nft-card-image-info"]}>
        <div className={styles["nft-card-img-container"]}>
          <img
            className={"nftImage"}
            src={`${
              props.image === "no image found"
                ? "https://preview.redd.it/j82jl2vpg4n71.jpg?auto=webp&s=e8431005571759e9fd9b5cd2e82dd27696d0b6c4"
                : props.image
            }`}
            alt="nft-preview"
          />
        </div>

        <div className={styles["bottom-img-info"]}>
          <div className={styles["nft-card-token-name"]}>
            <h3>{props.name}</h3>
          </div>
          <div>
            <h3>Floor price: {props.price} ETH</h3>
            <h4>Usd: ${(props.price * 1271).toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
