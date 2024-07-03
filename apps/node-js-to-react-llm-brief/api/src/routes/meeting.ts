import express from "express";

const meetingRouter = express.Router();

import { meeting } from "./meetingController";

meetingRouter.get("/:botId", meeting);

export default meetingRouter;
