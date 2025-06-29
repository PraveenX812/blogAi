import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing req fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blog",
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
        { width: "1280" }, // Width resizing
      ],
    });
    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.json({ success: true, message: "Blog added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllblog = async (req, res) => {
  try {
    const blog = await Blog.find({ isPublished: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogbyId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogbyId = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id }); //del comm
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    //console.log(blog);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: `Blog status: ${blog.isPublished}` });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  //console.log('Request Body:', req.body); 
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const content = await main(prompt + " Generate a blog content for this topic in simple text format");
    console.log(content)
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export default addBlog;
