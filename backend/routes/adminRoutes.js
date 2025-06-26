import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllblogAdmin,
  getAllComments,
  GetDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blog", auth, getAllblogAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, GetDashboard);

export default adminRouter;
