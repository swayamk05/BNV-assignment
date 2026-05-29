import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const LayoutRoot = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column"
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(135deg, rgba(8, 17, 32, 0.92), rgba(15, 23, 42, 0.88))",
  color: theme.palette.text.primary,
  boxShadow: "0 16px 40px rgba(2, 6, 23, 0.38)",
  borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
  backdropFilter: "blur(18px)"
}));

const Brand = styled(Typography)({
  fontWeight: 700,
  letterSpacing: "-0.03em"
});

const ToolbarActions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginLeft: "auto",
  flexWrap: "wrap"
});

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  borderColor: "rgba(148, 163, 184, 0.24)"
}));

const Content = styled("main")(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4, 0, 8),
  position: "relative"
}));

const BackgroundGlow = styled("div")({
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(circle at 18% 14%, rgba(56, 189, 248, 0.08), transparent 25%), radial-gradient(circle at 82% 18%, rgba(249, 115, 22, 0.06), transparent 22%)"
});

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;
  const isAdd = location.pathname === ROUTES.ADD;

  return (
    <LayoutRoot>
      <BackgroundGlow />
      <StyledAppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Brand variant="h6">Picsorbit Studio</Brand>
            <ToolbarActions>
              <NavButton
                component={RouterLink}
                to={ROUTES.HOME}
                variant={isHome ? "contained" : "text"}
                color={isHome ? "primary" : "inherit"}
              >
                Dashboard
              </NavButton>
              <NavButton
                component={RouterLink}
                to={ROUTES.ADD}
                variant={isAdd ? "contained" : "outlined"}
                color="primary"
              >
                New Post
              </NavButton>
            </ToolbarActions>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Content>
        <Container maxWidth="lg">{children}</Container>
      </Content>
    </LayoutRoot>
  );
};

export default MainLayout;
