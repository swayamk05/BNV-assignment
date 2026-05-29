import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  onCancel,
  onConfirm
}) => (
  <Dialog
    open={open}
    onClose={onCancel}
    fullWidth
    maxWidth="xs"
    PaperProps={{
      sx: {
        backgroundImage: "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))",
        border: "1px solid rgba(248, 113, 113, 0.18)"
      }
    }}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography color="text.secondary">{description}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} variant="outlined">
        Cancel
      </Button>
      <Button onClick={onConfirm} variant="contained" color="error">
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
