import { Request, Response } from "express";

export const meeting = async (req: Request, res: Response) => {
  res.send('Hello World');
};
