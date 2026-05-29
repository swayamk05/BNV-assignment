import { Stack, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import BlogForm from "../../components/forms/BlogForm";
import { fetchBlog, updateBlog } from "../../store/blogSlice";
import { toDetails } from "../../constants/routes";

const LoadingWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  padding: "48px 0"
});

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected, loading } = useSelector((state) => state.blogs);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await dispatch(updateBlog({ id, data: values })).unwrap();
      toast.success("Blog updated successfully");
      navigate(toDetails(id));
    } catch (error) {
      toast.error(error.message || "Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !selected) {
    return (
      <LoadingWrap>
        <CircularProgress />
      </LoadingWrap>
    );
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Edit Blog Post"
        subtitle="Refine the details before publishing the update."
      />
      <BlogForm
        initialValues={selected}
        onSubmit={handleSubmit}
        onCancel={() => navigate(toDetails(id))}
        submitLabel="Update Blog"
        isSubmitting={submitting}
      />
    </Stack>
  );
};

export default EditBlog;
