//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkNotFountResult.module.css"
import lightStyles from "./stylesheets/LightNotFoundResult.module.css"

export default function FilterNotFound() {
    const styles = useStyles(darkStyles, lightStyles);

    return (
        <div className={styles['notfound-container']}>
            <span>
                It seems that there are no NFTs that meet those requirements
            </span>
        </div>
    )
}