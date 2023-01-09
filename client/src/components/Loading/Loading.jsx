import styles from "./stylesheets/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles["loading-page-container"]}>
      <div className={styles["loading-icon"]}>
        <div className={styles["triangles-container"]}>
          <div className={styles["triangles"]}>
            <div className={styles["tri invert"]}></div>
            <div className={styles["tri invert"]}></div>
            <div className={styles["tri"]}></div>
            <div className={styles["tri invert"]}></div>
            <div className={styles["tri invert"]}></div>
            <div className={styles["tri"]}></div>
            <div className={styles["tri invert"]}></div>
            <div className={styles["tri"]}></div>
            <div className={styles["tri invert"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
