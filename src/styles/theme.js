import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B8E23', // Bleu foncé du header
      light: '#6B8E23', // Bleu plus clair pour les éléments interactifs
      dark: '#171A21', // Bleu très foncé pour le fond
    },

    secondary: {
      main: '#66C0F4', // Bleu clair pour les accents
      light: '#A3D7F7', // Version plus claire du bleu accent
      dark: '#4B8FB6', // Version plus foncée du bleu accent
    },

    background: {
      default: '#6B8E23', // Fond principal
      paper: '#43F043', // Fond des cartes et éléments
    },
    text: {
      primary: '#FFFFFF', // Texte blanc
      secondary: '#8F98A0', // Texte gris clair
    },
    success: {
      main: '#5C7E10', // Vert pour les gains
      light: '#87CF0C',
    },
    error: {
      main: '#C83737', // Rouge pour les pertes
    },
  },
  typography: {
    fontFamily: '"Josefin Sans", serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Josefin Sans", serif',

    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Josefin Sans", serif',

    },
    h3: {
      fontWeight: 600,
      fontFamily: '"Josefin Sans", serif',

    },
    button: {
      textTransform: 'none', // Pour garder la casse originale du texte
      fontFamily: '"Josefin Sans", serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#43F043',
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#43F043',
        },
      },
    },
  },
});
