import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatusChip from "../../components/common/StatusChip";
import EmptyState from "../../components/common/EmptyState";
import { fetchBlog } from "../../store/blogSlice";
import { ROUTES, toEdit } from "../../constants/routes";
import { formatDate } from "../../utils/date";

const Media = styled("img")({
  width: "100%",
  height: "260px",
  objectFit: "cover",
  borderRadius: 16,
  border: "1px solid rgba(148, 163, 184, 0.2)"
});

const TagRow = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px"
});

const ContentText = styled(Typography)({
  whiteSpace: "pre-line"
});

const LoadingWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  padding: "48px 0"
});

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  if (loading && !selected) {
    return (
      <LoadingWrap>
        <CircularProgress />
      </LoadingWrap>
    );
  }

  if (!selected) {
    return (
      <EmptyState
        title="Blog not found"
        description="The post you are looking for does not exist."
        actionLabel="Back to list"
        onAction={() => navigate(ROUTES.HOME)}
      />
    );
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title={selected.title}
        subtitle={`By ${selected.author}`}
        actions={
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => navigate(ROUTES.HOME)}>
              Back
            </Button>
            <Button variant="contained" onClick={() => navigate(toEdit(id))}>
              Edit
            </Button>
          </Stack>
        }
      />

      <Card className="page-fade">
        <CardContent>
          <Stack spacing={3}>
            {selected.thumbnailUrl && <Media src={selected.thumbnailUrl} alt={selected.title} />}

            <TagRow>
              <StatusChip status={selected.status} />
              <Chip label={selected.category} variant="outlined" />
              {selected.tags?.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </TagRow>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Author
                </Typography>
                <Typography>{selected.author}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography>{selected.email}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created
                </Typography>
                <Typography>{formatDate(selected.createdAt)}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Updated
                </Typography>
                <Typography>{formatDate(selected.updatedAt)}</Typography>
              </Grid>
            </Grid>

            <Divider />

            <div>
              <Typography variant="h6">Short Description</Typography>
              <Typography color="text.secondary">{selected.shortDescription}</Typography>
            </div>

            <div>
              <Typography variant="h6">Full Content</Typography>
              <ContentText color="text.secondary">{selected.content}</ContentText>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default BlogDetails;
