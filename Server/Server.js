require("dotenv").config();
const connectDB = require("./config/dbConn");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./CorsOptions");
const PORT = process.env.PORT || 2700;

connectDB();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user", require("./Routers/AuthRouter"));
app.use("/api/product", require("./Routers/ProductRouter"));
app.use("/api/player", require("./Routers/playerRouter"));
app.use("/api/actor", require("./Routers/actorRouter"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});