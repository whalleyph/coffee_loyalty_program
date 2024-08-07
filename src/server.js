import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

//allow morgan logger to get access to each request before and after our handlers
app.use(morgan("dev"));
//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());
//parse body text of requests having content-type application/json, attaching result to `req.body`
app.use(express.json());

//use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});

let data = [
    {
        id: "1",
        name: "Arto",
        stamps: 0,
        freeCoffees: 0,
    },
    {
        id: "2",
        name: "Ada",
        stamps: 0,
        freeCoffees: 0,
    },
    {
        id: "3",
        name: "Dan",
        stamps: 0,
        freeCoffees: 0,
    },
    {
        id: "4",
        name: "Mary",
        stamps: 0,
        freeCoffees: 0,
    },
];
