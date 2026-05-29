import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#38BDF8" },
    secondary: { main: "#F97316" },
    success: { main: "#34D399" },
    warning: { main: "#FBBF24" },
    error: { main: "#FB7185" },
    background: { default: "#081120", paper: "#0F172A" },
    text: { primary: "#E2E8F0", secondary: "#94A3B8" }
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.4rem" },
    h2: { fontWeight: 700, fontSize: "2rem" },
    h3: { fontWeight: 700, fontSize: "1.6rem" },
    h4: { fontWeight: 700, fontSize: "1.4rem" },
    subtitle1: { fontWeight: 600 }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#081120",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 30%), radial-gradient(circle at top right, rgba(249, 115, 22, 0.12), transparent 26%), linear-gradient(180deg, #081120 0%, #0B1326 50%, #050816 100%)",
          backgroundAttachment: "fixed"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 14,
          boxShadow: "none"
        },
        containedPrimary: {
          backgroundImage: "linear-gradient(135deg, #38BDF8 0%, #8B5CF6 100%)"
        },
        containedSecondary: {
          backgroundImage: "linear-gradient(135deg, #F97316 0%, #FB7185 100%)"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "rgba(15, 23, 42, 0.88)",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(56, 189, 248, 0.7)"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#38BDF8",
            borderWidth: 1.5
          }
        },
        notchedOutline: {
          borderColor: "rgba(148, 163, 184, 0.28)"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#94A3B8",
          "&.Mui-focused": {
            color: "#38BDF8"
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#94A3B8"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage:
            "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92))",
          border: "1px solid rgba(148, 163, 184, 0.14)",
          boxShadow: "0 24px 80px rgba(2, 6, 23, 0.55)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: "none"
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(148, 163, 184, 0.14)",
          overflow: "hidden"
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, rgba(8, 17, 32, 0.96), rgba(15, 23, 42, 0.96))"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
          color: "#CBD5E1"
        },
        body: {
          borderBottom: "1px solid rgba(148, 163, 184, 0.12)"
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600
        }
      }
    }
  }
});

export default theme;
