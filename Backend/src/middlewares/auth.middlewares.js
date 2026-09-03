const authUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    console.log("TOKEN RECEIVED:", !!token);
    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

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

        console.log("TOKEN VERIFIED:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT VERIFY ERROR:", error.message);
        throw new ApiError(401, "Unauthorized Request");
    }
});