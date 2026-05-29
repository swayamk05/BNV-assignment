import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderWrap = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
  marginBottom: "24px",
  padding: "24px",
  borderRadius: 24,
  border: "1px solid rgba(148, 163, 184, 0.16)",
  background:
    "linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(15, 118, 110, 0.12) 40%, rgba(8, 17, 32, 0.96))",
  boxShadow: "0 24px 80px rgba(2, 6, 23, 0.45)"
});

const TitleBlock = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "6px"
});

const ActionsWrap = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap"
});

const PageHeader = ({ title, subtitle, actions }) => (
  <HeaderWrap className="page-fade">
    <TitleBlock>
      <Typography variant="h4" sx={{ letterSpacing: "-0.03em" }}>
        {title}
      </Typography>
      {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
    </TitleBlock>
    {actions && <ActionsWrap>{actions}</ActionsWrap>}
  </HeaderWrap>
);

export default PageHeader;
