import { Chip } from "@mui/material";

const StatusChip = ({ status }) => {
  const color = status === "Published" ? "success" : "warning";
  return (
    <Chip
      label={status}
      color={color}
      variant="filled"
      size="small"
      sx={{ fontWeight: 700 }}
    />
  );
};

export default StatusChip;
