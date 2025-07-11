import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiError as apiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; // Adjust the path as per your project structure
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Logic for registering a user
  /*
  1. create user details from frontend
  2. validate user details , not empty
  3. check if user already exists: username, email
  4. check for images, check for avatar
  5. upload to cloudinary, avatar
  6. create user objrect, - create entry in database
  7. remove password and refresh token from response
  8. check for user creation
  9. return success response
  */
  res.status(200).json({
    message: "Userrrrrrr registered successfully",
  });

  const { fullName, email, username, password } = req.body;
  console.log("email:", email);
  // this commented code is also okay for beginners but as a best practice we should not use this
  // if(fullName === ""){
  //   throw new apiError(400, "Full name is required");
  // }
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }
  const existedUser = User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new apiError(409, "User with email and username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar image");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
    // all values with negative sign will not be returned in the response
    //-password space -refreshToken,,,,, different syntax to exclude fields
  );
  if (createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json({
    // message: "User registered successfully",
    data: new ApiResponse(200, createdUser, "User registered successfully"),
  });
});

export { registerUser };
