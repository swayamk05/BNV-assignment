import { Stack } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import BlogForm from "../../components/forms/BlogForm";
import { createBlog } from "../../store/blogSlice";
import { ROUTES } from "../../constants/routes";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await dispatch(createBlog(values)).unwrap();
      toast.success("Blog published successfully");
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error.message || "Failed to publish blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Create New Post"
        subtitle="Build a new story with crisp details and stunning visuals."
      />
      <BlogForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.HOME)}
        submitLabel="Publish Blog"
        isSubmitting={submitting}
      />
    </Stack>
  );
};

export default AddBlog;
