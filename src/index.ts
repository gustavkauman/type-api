import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { animalRouter } from "./animals/animals.router";

dotenv.config();


let PORT: number = 8080;
if (process.env.PORT) {
    PORT = parseInt(process.env.PORT as string, 10);
}

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/animals", animalRouter);

app.listen(PORT, () => {
    console.log(`Started server, listening on port ${PORT}`);
});
