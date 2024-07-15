"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financial_record_1 = __importDefault(require("../schema/financial-record"));
const router = express_1.default.Router();
//received data
router.get("/getAllByUserId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId; // Extracts the userId parameter from the request URL.is a way to access route parameters in an Express.js application
        const records = yield financial_record_1.default.find({ userId });
        console.log(userId);
        if (records.length === 0) {
            res.status(404).send("No record found for the user."); // 404 not found response
        }
        res.status(200).send(records);
        //200 succes response  
    }
    catch (err) {
        console.log("err is ", err);
        res.status(500).send(err);
        //500 server error
    }
}));
//send data
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecordBody = req.body;
        const newRecord = new financial_record_1.default(newRecordBody);
        const savedRecord = yield newRecord.save();
        // console.log(req.body)
        res.status(200).send(savedRecord);
        //200 succes response  
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
        //500 server error
    }
}));
//update data
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = yield financial_record_1.default.findByIdAndUpdate(id, newRecordBody, { new: true });
        if (!record) {
            res.status(404).send("Record not found");
        }
        res.status(200).send(record);
        //200 succes response  
    }
    catch (err) {
        res.status(500).send(err);
        //500 server error
    }
}));
//delete data
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const record = yield financial_record_1.default.findByIdAndDelete(id);
        if (!record) {
            res.status(404).send("Record not found");
        }
        res.status(200).send(record);
        //200 succes response  
    }
    catch (err) {
        res.status(500).send(err);
        //500 server error
    }
}));
exports.default = router;
