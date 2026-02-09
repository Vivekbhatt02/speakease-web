import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1565C0',
        },
        secondary: {
            main: '#FF6F00',
        },
        background: {
            default: '#FAFAFA',
        },
    },
    typography: {
        fontSize: 18,
        button: {
            fontSize: '1.2rem',
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    minHeight: '3rem',
                    borderRadius: '0.75rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: '1.2rem',
                },
            },
        },
    },
});

export default theme;