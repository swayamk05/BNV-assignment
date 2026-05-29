const express = require("express");
const { body, param } = require("express-validator");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  exportBlogsCsv
} = require("../controllers/blogController");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

const idRule = [param("id").isMongoId().withMessage("Invalid blog id")];

const createRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  body("tags.*")
    .optional()
    .isString()
    .withMessage("Tags must be strings"),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Draft", "Published"])
    .withMessage("Status must be Draft or Published"),
  body("thumbnailUrl")
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true })
    .withMessage("Thumbnail URL must be a valid URL"),
  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 300 })
    .withMessage("Short description must be 300 characters or fewer"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters")
];

const updateRules = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("author")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters"),
  body("email").optional().trim().isEmail().withMessage("Valid email is required"),
  body("category").optional().trim(),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  body("tags.*")
    .optional()
    .isString()
    .withMessage("Tags must be strings"),
  body("status")
    .optional()
    .isIn(["Draft", "Published"])
    .withMessage("Status must be Draft or Published"),
  body("thumbnailUrl")
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true })
    .withMessage("Thumbnail URL must be a valid URL"),
  body("shortDescription")
    .optional()
    .isLength({ max: 300 })
    .withMessage("Short description must be 300 characters or fewer"),
  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters")
];

router.get("/", getBlogs);
router.get("/export/csv", exportBlogsCsv);
router.get("/:id", idRule, validateRequest, getBlog);
router.post("/", createRules, validateRequest, createBlog);
router.put("/:id", idRule, updateRules, validateRequest, updateBlog);
router.delete("/:id", idRule, validateRequest, deleteBlog);

module.exports = router;
