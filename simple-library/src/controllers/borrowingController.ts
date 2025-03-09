import { Request, Response } from "express";
import * as borrowingService from "../services/borrowingService";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { memberId, bookId } = req.body;
    const borrowing = await borrowingService.borrowBook(memberId, bookId);
    res.status(201).json(borrowing);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { memberId, bookId } = req.body;
    const returned = await borrowingService.returnBook(memberId, bookId);
    res.json(returned);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
