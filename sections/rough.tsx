import React, { createContext, useContext } from 'react';

type Theme = {
    color: string;
    background: string;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: any) {
    const theme = {
        color: 'blue',
        background: 'lightgray'
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return theme;
}