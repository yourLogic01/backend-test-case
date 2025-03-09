import { Request, Response } from "express";
import * as bookService from "../services/bookService";

// get all books
export const getAllBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

// get book by id
export const getBookById = async (req: Request, res: Response) => {
  const book = await bookService.getBookById(Number(req.params.id));
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
};

// create book
export const createBook = async (req: Request, res: Response) => {
  const { code, title, author, stock } = req.body;
  const book = await bookService.createBook(code, title, author, stock);
  res.status(201).json({ book, message: "Book created successfully" });
};

// update book
export const updateBook = async (req: Request, res: Response) => {
  const { title, author, stock } = req.body;
  const updatedBook = await bookService.updateBook(Number(req.params.id), title, author, stock);
  updatedBook ? res.json({ updatedBook, message: "Book updated successfully" }) : res.status(404).json({ message: "Book not found" });
};

// delete book
export const deleteBook = async (req: Request, res: Response) => {
  await bookService.deleteBook(Number(req.params.id));
  res.status(200).send({ message: "Book deleted successfully" });
};
