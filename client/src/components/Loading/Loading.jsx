//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkLoading.module.css"
import lightStyles from "./stylesheets/LightLoading.module.css"


export default function Loading() {
  const styles = useStyles(darkStyles, lightStyles);
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
          <span>L O A D I N G</span>
        </div>
      </div>
    </div>
  );
}
