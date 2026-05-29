import * as yup from "yup";

const blogSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),
  author: yup
    .string()
    .required("Author is required")
    .min(3, "Author must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  category: yup.string().required("Category is required"),
  tags: yup.array().of(yup.string().trim()),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Draft", "Published"], "Status must be Draft or Published"),
  thumbnailUrl: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Thumbnail URL must be a valid URL")
    .nullable()
    .notRequired(),
  shortDescription: yup
    .string()
    .required("Short description is required")
    .max(300, "Short description must be 300 characters or fewer"),
  content: yup
    .string()
    .required("Content is required")
    .min(50, "Content must be at least 50 characters")
});

export default blogSchema;
