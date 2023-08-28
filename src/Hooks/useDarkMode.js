import { useState, useEffect } from "react";

function useDarkMode() {
    const storedTheme = localStorage.getItem('theme'); // Get theme from localStorage
    const initialTheme = storedTheme || 'dark';

    const [theme, setTheme] = useState(initialTheme);
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}

export default useDarkMode;
