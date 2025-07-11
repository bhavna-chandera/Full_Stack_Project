import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverPhoto",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;

// router.route("/register").post((req, res, next) => {
//   console.log("✅ /register route hit");
//   next(); // continue to registerUser
// }, registerUser);
