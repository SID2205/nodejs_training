import { Request, Response } from "express";
const loggerMiddleware = (req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

export default loggerMiddleware;
