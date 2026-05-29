import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import BlogTable from "../../components/tables/BlogTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmptyState from "../../components/common/EmptyState";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "../../constants/options";
import { deleteBlog, fetchBlogs } from "../../store/blogSlice";
import { exportBlogsCsv } from "../../api/blogApi";
import { downloadBlob } from "../../utils/download";
import useDebounce from "../../hooks/useDebounce";
import { ROUTES, toDetails, toEdit } from "../../constants/routes";
import { toast } from "react-toastify";

const FilterCard = styled(Card)({
  border: "1px solid rgba(148, 163, 184, 0.2)"
});

const PaginationBar = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "24px"
});

const LoadingWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  padding: "48px 0"
});

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, pagination, loading } = useSelector((state) => state.blogs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [confirmState, setConfirmState] = useState({ open: false, id: null });
  const [exporting, setExporting] = useState(false);
  const canExport = items.length > 0;

  const debouncedSearch = useDebounce(search, 400);
  const limit = 10;

  useEffect(() => {
    dispatch(
      fetchBlogs({
        page,
        limit,
        search: debouncedSearch,
        category,
        status,
        sortBy: "createdAt",
        order: "desc"
      })
    );
  }, [dispatch, page, limit, debouncedSearch, category, status]);

  const handleDeleteRequest = (id) => {
    setConfirmState({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteBlog(confirmState.id)).unwrap();
      toast.success("Blog deleted successfully");
      setConfirmState({ open: false, id: null });
      dispatch(
        fetchBlogs({
          page,
          limit,
          search: debouncedSearch,
          category,
          status,
          sortBy: "createdAt",
          order: "desc"
        })
      );
    } catch (error) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await exportBlogsCsv({
        search: debouncedSearch,
        category,
        status,
        sortBy: "createdAt",
        order: "desc"
      });
      downloadBlob(response.data, "blogs.csv");
      toast.success("CSV exported successfully");
    } catch (error) {
      toast.error(error.message || "Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  const headerActions = (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleExport}
        disabled={exporting || !canExport}
      >
        {exporting ? "Exporting..." : "Export CSV"}
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate(ROUTES.ADD)}
      >
        Add Blog
      </Button>
    </Stack>
  );

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Blog Posts"
        subtitle="Manage drafts, publish stories, and keep your content organized."
        actions={headerActions}
      />

      <FilterCard className="page-fade">
        <CardContent>
          <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
            <TextField
              label="Search"
              placeholder="Search title, author, or category"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </FilterCard>

      {loading ? (
        <LoadingWrap>
          <CircularProgress />
        </LoadingWrap>
      ) : items.length === 0 ? (
        <EmptyState
          title="No blog posts yet"
          description="Create your first post to get the newsroom started. Export to CSV will be available once at least one blog post exists."
          actionLabel="Create Post"
          onAction={() => navigate(ROUTES.ADD)}
        />
      ) : (
        <>
          <BlogTable
            rows={items}
            onView={(id) => navigate(toDetails(id))}
            onEdit={(id) => navigate(toEdit(id))}
            onDelete={handleDeleteRequest}
          />
          <PaginationBar>
            <Typography color="text.secondary">
              Showing page {pagination.page} of {pagination.totalPages || 1}
            </Typography>
            <Pagination
              color="primary"
              page={pagination.page}
              count={pagination.totalPages || 1}
              onChange={(event, value) => setPage(value)}
            />
          </PaginationBar>
        </>
      )}

      <ConfirmDialog
        open={confirmState.open}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmLabel="Delete"
        onCancel={() => setConfirmState({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
};

export default BlogList;
