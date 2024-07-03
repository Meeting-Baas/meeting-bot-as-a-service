import express from "express";

const meetingRouter = express.Router();

import { meeting } from "./meetingController";

meetingRouter.get("/", meeting);

export default meetingRouter;
