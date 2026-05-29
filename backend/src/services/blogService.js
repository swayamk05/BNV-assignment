const Blog = require("../models/Blog");

const normalizeTags = (tags) => {
  if (!tags) {
    return [];
  }

  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const buildFilters = ({ search, category, status }) => {
  const filters = {};

  if (category) {
    filters.category = category;
  }

  if (status) {
    filters.status = status;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    filters.$or = [{ title: regex }, { author: regex }, { category: regex }];
  }

  return filters;
};

const sanitizeSort = (sortBy, order) => {
  const allowed = new Set(["createdAt", "title", "author", "category", "status"]);
  const field = allowed.has(sortBy) ? sortBy : "createdAt";
  const direction = order === "asc" ? 1 : -1;
  return { [field]: direction };
};

const parsePagination = (page, limit) => {
  const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
  const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
  const skip = (pageNumber - 1) * limitNumber;
  return { pageNumber, limitNumber, skip };
};

const listBlogs = async (params) => {
  const filters = buildFilters(params);
  const sort = sanitizeSort(params.sortBy, params.order);
  const { pageNumber, limitNumber, skip } = parsePagination(params.page, params.limit);

  const total = await Blog.countDocuments(filters);
  const blogs = await Blog.find(filters).sort(sort).skip(skip).limit(limitNumber);
  const totalPages = total === 0 ? 0 : Math.ceil(total / limitNumber);

  return {
    blogs,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages
    }
  };
};

const getBlogById = async (id) => Blog.findById(id);

const createBlog = async (payload) => {
  const data = {
    ...payload,
    tags: normalizeTags(payload.tags)
  };

  return Blog.create(data);
};

const updateBlog = async (id, payload) => {
  const data = { ...payload };

  if (payload.tags !== undefined) {
    data.tags = normalizeTags(payload.tags);
  }

  return Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteBlog = async (id) => Blog.findByIdAndDelete(id);

const exportBlogs = async (params) => {
  const filters = buildFilters(params);
  const sort = sanitizeSort(params.sortBy, params.order);
  return Blog.find(filters).sort(sort).lean();
};

module.exports = {
  listBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  exportBlogs
};
