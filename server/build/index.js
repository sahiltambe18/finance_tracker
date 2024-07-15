"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//PWD:hjsdfbucvdc
//username:pooja
//mongodb+srv://pooja:hjsdfbucvdc@personalfinancetracker.3cse6jg.mongodb.net/
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_record_1 = __importDefault(require("./routes/financial-record"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
}));
const mongoURI = "mongodb+srv://pooja:hjsdfbucvdc@personalfinancetracker.3cse6jg.mongodb.net/";
mongoose_1.default
    .connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log("connectde to mongodb"))
    .catch((err) => console.log("Failed to connect to mongodb :", err));
//middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/financial-record", financial_record_1.default);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
