import cors from "cors";
import express from "express";
import morgan from "morgan";
// @ts-ignore
import coffeeData from "./coffeeData.json" assert { type: "json" };

const app = express();

//allow morgan logger to get access to each req before and after our handlers
app.use(morgan("dev"));
//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());
//parse body text of requests having content-type application/json, attaching result to `req.body`
app.use(express.json());

app.get("/api/coffeeData/", (req, res) => {
    res.json(coffeeData);
});

app.post("/api/coffeeData", (req, res) => {
    try {
        const name = req.body.name;
        if (!name) {
            throw new Error("Name field is required");
        }

        if (!(typeof name === "string")) {
            throw new Error("Name must be a string");
        }

        let maxID = 0;
        for (let dataPoint of coffeeData) {
            if (dataPoint.name === name) {
                throw new Error("name must be unique");
            }
            if (dataPoint.id > maxID) {
                maxID = dataPoint.id;
            }
        }
        const newEntry = {
            id: maxID + 1,
            name: name,
            stamps: 0,
            freeCoffees: 0,
        };
        coffeeData.push(newEntry);
        res.json(newEntry);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.put("/api/coffeeData/addStamp/:id", (req, res) => {
    try {
        const id = req.params.id;
        const entryToEdit = coffeeData.find((obj) => obj.id == id);
        if (!entryToEdit) {
            throw new Error("No entry found with that id");
        }
        entryToEdit.stamps++;
        if (entryToEdit.stamps > 5) {
            entryToEdit.stamps = 0;
            entryToEdit.freeCoffees++;
        }
        res.json(entryToEdit);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.put("/api/coffeeData/redeemFreeCoffee/:id", (req, res) => {
    try {
        const id = req.params.id;
        const entryToEdit = coffeeData.find((obj) => obj.id == id);
        if (!entryToEdit) {
            throw new Error("No entry found with that id");
        }
        if (entryToEdit.freeCoffees <= 0) {
            throw new Error("No coffees to redeem");
        }
        entryToEdit.freeCoffees--;
        res.json(entryToEdit);
    } catch (err) {
        res.json({ error: err.message });
    }
});

//use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
