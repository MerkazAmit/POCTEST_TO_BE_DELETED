import { Theme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import React, { useState } from "react";
import "./app.css";
import Header from "./Header/Header";
import ThemeContext, { themes } from "./ThemeContext";

const App = (): React.ReactElement => {
	const toggleTheme = () => {
		setTheme(theme => ({
			theme: theme.theme === themes.dark ? themes.light : themes.dark,
			toggleTheme: toggleTheme,
		}));
	};

	const [theme, setTheme] = useState<{ theme: Theme, toggleTheme: () => void }>({
		theme: themes.dark,
		toggleTheme: toggleTheme,
	});
	Bridge.Boof();
	return (
		<ThemeContext.Provider value={theme}>
			<ThemeProvider theme={theme.theme}>
				<div className="app">
					<Header />
				</div>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
