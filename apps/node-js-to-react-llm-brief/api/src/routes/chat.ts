import express from "express";
import { validateData } from "../middleware/zod";
import { formSchema } from "../schemas/form";

const chatRouter = express.Router();

import { chat } from "./chatController";

chatRouter.post("/", validateData(formSchema), chat);

export default chatRouter;
