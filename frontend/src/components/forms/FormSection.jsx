import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SectionCard = styled(Card)({
  border: "1px solid rgba(148, 163, 184, 0.16)",
  backgroundImage: "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92))"
});

const FormSection = ({ title, subtitle, children }) => (
  <SectionCard>
    <CardHeader
      title={<Typography variant="h6">{title}</Typography>}
      subheader={subtitle}
    />
    <CardContent>{children}</CardContent>
  </SectionCard>
);

export default FormSection;
