require("dotenv").config();
const { config } = require("./src/configs/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const usersRoutes = require("./src/routes/user.js");
const scrapRoutes = require("./src/routes/scrap.js");
app.use("/users", usersRoutes);
app.use("/scrap", scrapRoutes);

app.get("/test", (req, res) => {
    res.status(200).json(`Server OK... ${process.pid}`);
});

app.listen(config.port, async () => {
    console.log(`:::: Server Started => PORT ${config.port} | ${config.environment} mode ::::`);

    const url = `http://localhost:${config.port}/test`;
    console.log(`\nCheck status at ${url} \n`);
});
