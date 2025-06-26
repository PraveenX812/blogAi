import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d", // optional: token expiry
    });

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllblogAdmin = async (req, res) => {
  try {
    const blog = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export const GetDashboard = async (req, res) => {
  try {
    const recentblog = await Blog.find({}).sort({ createdBy: -1 }).limit(5);
    const blog = await Blog.countDocuments(),
      comments = await Comment.countDocuments(),
      drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = { blog, comments, drafts, recentblog };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment del" });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};
