import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const EmptyWrap = styled("div")({
  textAlign: "center",
  padding: "48px 16px",
  borderRadius: 20,
  border: "1px dashed rgba(148, 163, 184, 0.4)",
  background: "linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.72))",
  display: "grid",
  gap: "12px",
  justifyItems: "center",
  boxShadow: "0 20px 60px rgba(2, 6, 23, 0.4)"
});

const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <EmptyWrap>
    <Typography variant="h6">{title}</Typography>
    <Typography color="text.secondary">{description}</Typography>
    {actionLabel && (
      <Button variant="contained" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </EmptyWrap>
);

export default EmptyState;
