import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StatusChip from "../common/StatusChip";
import { formatDate } from "../../utils/date";

const HeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  background: "rgba(15, 23, 42, 0.96)",
  letterSpacing: "0.02em"
}));

const BlogTable = ({ rows, onView, onEdit, onDelete }) => (
  <TableContainer
    component={Paper}
    className="page-fade"
    sx={{ backgroundImage: "linear-gradient(180deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))" }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <HeadCell>ID</HeadCell>
          <HeadCell>Title</HeadCell>
          <HeadCell>Author</HeadCell>
          <HeadCell>Category</HeadCell>
          <HeadCell>Status</HeadCell>
          <HeadCell>Created Date</HeadCell>
          <HeadCell align="right">Actions</HeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row._id}
            hover
            sx={{
              transition: "transform 160ms ease, background-color 160ms ease",
              "&:hover": {
                transform: "translateY(-1px)",
                backgroundColor: "rgba(56, 189, 248, 0.06)"
              }
            }}
          >
            <TableCell>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {row._id.slice(-6).toUpperCase()}
              </Typography>
            </TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>
              <StatusChip status={row.status} />
            </TableCell>
            <TableCell>{formatDate(row.createdAt)}</TableCell>
            <TableCell align="right">
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <IconButton aria-label="view" onClick={() => onView(row._id)} color="primary">
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => onEdit(row._id)} color="secondary">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => onDelete(row._id)} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default BlogTable;
