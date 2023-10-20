const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const User = require("./models/user");


// Passport setup for JWT authentication
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Initialize Sequelize with PostgreSQL database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define User model
// User.init(sequelize);

// Sync the model with the database
sequelize.sync();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    User.findByPk(payload.id)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((error) => {
        return done(error, false);
      });
  })
);

// Define routes
// Register and login routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// User routes (protected by JWT)
const userRoutes = require("./routes/users");
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);
// Todo routes (protected by JWT)
const todoRoutes = require("./routes/todos");
app.use(
  "/api/todos",
  passport.authenticate("jwt", { session: false }),
  todoRoutes
);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
