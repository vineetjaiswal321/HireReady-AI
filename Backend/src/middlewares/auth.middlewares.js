import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { TokenBlackListModel } from "../models/blacklist.models.js";
import ApiResponse from "../utils/ApiResponse.js";


const authUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized Request");
    }

    const isTokenBlackListed = await TokenBlackListModel.findOne({ token });

    if (isTokenBlackListed) {
        return res.status(401).json(
            new ApiResponse(401, {}, "Token is invalid")
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized Request");
    }
});

export { authUser }