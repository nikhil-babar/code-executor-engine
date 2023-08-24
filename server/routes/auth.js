const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
require("dotenv").config();

router.get(
  "/google",
  (req, res, next) =>
    authMiddleware.googleAuth(req, res, next, { grant_type: "code" }),
  async (_req, res) => {
    try {
      res.redirect(process.env.REDIRECT_URL);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  "/github",
  (req, res, next) =>
    authMiddleware.githubAuth(req, res, next, { grant_type: "code" }),
  async (_req, res) => {
    try {
      res.redirect(process.env.REDIRECT_URL);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  "/google_auth_status",
  (req, res, next) =>
    authMiddleware.googleAuth(req, res, next, { grant_type: "refresh_token" }),
  async (req, res) => {
    try {
      res.status(200).json({ user: req.session.google.user });
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  "/github_auth_status",
  (req, res, next) =>
    authMiddleware.githubAuth(req, res, next, { grant_type: "refresh_token" }),
  async (req, res) => {
    try {
      res.status(200).json({ user: req.session.github.user });
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.clearCookie("connect.sid");
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  });
});

module.exports = router;
