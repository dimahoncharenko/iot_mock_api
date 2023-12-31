import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { config } from "dotenv";

import { MockService } from "./services/MockService";
import paramsAPI from "./api/paramsAPI";

config();

const app = express();
const mock = MockService.prototype.instance({
  consumption: 1.37,
  charge: 170.0,
});

app.use(cors());
app.set("PORT", process.env.PORT || 3000);
app.use(express.json());
app.use("/api/v1/params", paramsAPI);
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const paramsInterval = setInterval(() => {
  mock.updateParams();

  io.emit("get_params", {
    temperature: mock.temperature,
    power: mock.power,
    consumption: mock.consumption,
    charge: mock.charge,
    production: mock.production,
  });
}, 1000);

const radarsInterval = setInterval(() => {
  mock.updateRadars();

  io.emit("get_radars", {
    radars: mock.getAllRadars(),
  });
}, 24 * 60 * 60 * 100);

io.on("connection", (socket) => {
  console.log(`User with the id ${socket.id} has just connected!`);

  socket.on("disconnect", () => {
    console.log(`User with the id: ${socket.id} disconnected!`);
  });
});

io.on("disconnection", () => {
  console.log("Disconnected!");
  clearInterval(paramsInterval);
  clearInterval(radarsInterval);
});

server.listen(process.env.PORT, () =>
  console.log(`Server is ready at http:localhost:${app.get("PORT")}`)
);
