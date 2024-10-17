import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import "./config/passport-jwt-strategy.js";
import setTokensCookies from "./utils/setTokensCookies.js";
import "./config/google-strategy.js"; // Added for Google auth

dotenv.config();

const app = express();
const port = process.env.PORT;

// CORS Options
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Load Routes
app.use("/api/user", userRoutes);

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_HOST}/account/login`,
  }),
  (req, res) => {
    const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      req.user;
    setTokensCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );
    res.redirect(`${process.env.FRONTEND_HOST}/user/profile`);
  }
);

export default app; // Exporting the app for server.js
