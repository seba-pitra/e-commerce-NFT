import { useSelector } from 'react-redux';

const useStyles = (darkStyles, lightStyles) => {
    const isDark = useSelector(state => state.activeThemeIsDark);
    let styles;

    if (isDark) {
        styles = darkStyles;
    } else {
        styles = lightStyles;
    }

    return styles;
};

export default useStyles;