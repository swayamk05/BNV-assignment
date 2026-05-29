const { Parser } = require("json2csv");
const asyncHandler = require("../middleware/asyncHandler");
const blogService = require("../services/blogService");
const { ApiError } = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  sendSuccess(res, {
    statusCode: 201,
    message: "Blog created successfully",
    data: blog
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const result = await blogService.listBlogs(req.query);
  sendSuccess(res, {
    message: "Blogs fetched successfully",
    data: result.blogs,
    pagination: result.pagination
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  sendSuccess(res, {
    message: "Blog fetched successfully",
    data: blog
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  sendSuccess(res, {
    message: "Blog updated successfully",
    data: blog
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.deleteBlog(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  sendSuccess(res, {
    message: "Blog deleted successfully",
    data: blog
  });
});

const exportBlogsCsv = asyncHandler(async (req, res) => {
  const blogs = await blogService.exportBlogs(req.query);

  const fields = [
    { label: "ID", value: "_id" },
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Email", value: "email" },
    { label: "Category", value: "category" },
    { label: "Status", value: "status" },
    {
      label: "Tags",
      value: (row) => (row.tags || []).join(", ")
    },
    { label: "Thumbnail", value: "thumbnailUrl" },
    { label: "Short Description", value: "shortDescription" },
    { label: "Content", value: "content" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" }
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(blogs);

  res.header("Content-Type", "text/csv");
  res.attachment("blogs.csv");
  return res.status(200).send(csv);
});

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  exportBlogsCsv
};
