import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import FormSection from "./FormSection";
import blogSchema from "../../validations/blogSchema";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "../../constants/options";

const ActionRow = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  flexWrap: "wrap"
});

const defaultValues = {
  title: "",
  author: "",
  email: "",
  category: "",
  tags: [],
  status: "Draft",
  thumbnailUrl: "",
  shortDescription: "",
  content: ""
};

const BlogForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Publish Blog",
  isSubmitting
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(blogSchema)
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...defaultValues,
        ...initialValues,
        tags: initialValues.tags || []
      });
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="page-fade">
      <Stack spacing={3}>
        <FormSection
          title="Basic Information"
          subtitle="Add the essentials that introduce your post."
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Author"
                    fullWidth
                    error={Boolean(errors.author)}
                    helperText={errors.author?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection
          title="Classification"
          subtitle="Organize your post for discovery."
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={Boolean(errors.category)}>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Category">
                      {CATEGORY_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={field.value}
                    onChange={(event, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="Add tags"
                        error={Boolean(errors.tags)}
                        helperText={errors.tags?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={Boolean(errors.status)}>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Status">
                      {STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title="Media" subtitle="Add a visual highlight for the post.">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="thumbnailUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Thumbnail URL"
                    fullWidth
                    error={Boolean(errors.thumbnailUrl)}
                    helperText={errors.thumbnailUrl?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection title="Content" subtitle="Craft a story readers will love.">
          <Stack spacing={2}>
            <Controller
              name="shortDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Short Description"
                  fullWidth
                  multiline
                  minRows={3}
                  error={Boolean(errors.shortDescription)}
                  helperText={errors.shortDescription?.message}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Content"
                  fullWidth
                  multiline
                  minRows={6}
                  error={Boolean(errors.content)}
                  helperText={errors.content?.message}
                />
              )}
            />
          </Stack>
        </FormSection>

        <ActionRow>
          <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </ActionRow>
      </Stack>
    </form>
  );
};

export default BlogForm;
