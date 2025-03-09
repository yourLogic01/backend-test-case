import { Request, Response } from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController";
import * as bookService from "../services/bookService";

// Mock bookService
jest.mock("../services/bookService");

describe("Book Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    req = {};
    res = {
      json: jsonMock,
      send: sendMock,
      status: statusMock,
    } as Partial<Response>;
  });

  // test get all books
  describe("getAllBooks", () => {
    it("should return all books", async () => {
      const mockBooks = [
        { id: 1, title: "Book A" },
        { id: 2, title: "Book B" },
      ];
      (bookService.getAllBooks as jest.Mock).mockResolvedValue(mockBooks);

      await getAllBooks(req as Request, res as Response);

      expect(jsonMock).toHaveBeenCalledWith(mockBooks);
    });
  });

  // test get book by id
  describe("getBookById", () => {
    it("should return a book if found", async () => {
      const mockBook = { id: 1, title: "Book A" };
      (bookService.getBookById as jest.Mock).mockResolvedValue(mockBook);

      req.params = { id: "1" };
      await getBookById(req as Request, res as Response);

      expect(jsonMock).toHaveBeenCalledWith(mockBook);
    });

    it("should return 404 if book not found", async () => {
      (bookService.getBookById as jest.Mock).mockResolvedValue(null);

      req.params = { id: "99" };
      await getBookById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Book not found" });
    });
  });

  // test create book
  describe("createBook", () => {
    it("should create a new book", async () => {
      const newBook = { id: 3, code: "B003", title: "Book C", author: "Author C", stock: 10 };
      (bookService.createBook as jest.Mock).mockResolvedValue(newBook);

      req.body = { code: "B003", title: "Book C", author: "Author C", stock: 10 };
      await createBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({ book: newBook, message: "Book created successfully" });
    });
  });

  // test update book
  describe("updateBook", () => {
    it("should update an existing book", async () => {
      const updatedBook = { id: 1, title: "Updated Book", author: "Updated Author", stock: 5 };
      (bookService.updateBook as jest.Mock).mockResolvedValue(updatedBook);

      req.params = { id: "1" };
      req.body = { title: "Updated Book", author: "Updated Author", stock: 5 };
      await updateBook(req as Request, res as Response);

      expect(jsonMock).toHaveBeenCalledWith({ updatedBook, message: "Book updated successfully" });
    });

    it("should return 404 if book not found", async () => {
      (bookService.updateBook as jest.Mock).mockResolvedValue(null);

      req.params = { id: "99" };
      req.body = { title: "Non-existent", author: "Unknown", stock: 0 };
      await updateBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Book not found" });
    });
  });

  // test delete book
  describe("deleteBook", () => {
    it("should delete a book", async () => {
      (bookService.deleteBook as jest.Mock).mockResolvedValue(undefined);

      req.params = { id: "1" };
      await deleteBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ message: "Book deleted successfully" });
    });
  });
});
