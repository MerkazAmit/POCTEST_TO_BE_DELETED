import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import ThemeContext from "../ThemeContext";

const ThemeTogglerButton = (): React.ReactElement => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <FormControlLabel control={<Switch defaultChecked onChange={toggleTheme} />} label="Dark mode" />
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemeTogglerButton;