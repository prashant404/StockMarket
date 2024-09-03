require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const userRoutes = require('./routes/userRoutes'); 
const passport = require("passport");
const session = require("cookie-session");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: corsOptions
});


connectDB();


app.use(express.json());
app.use(
  session({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use('/api/users', userRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("subscribeToStock", (stockId) => {
    console.log(`Client subscribed to stock: ${stockId}`);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));