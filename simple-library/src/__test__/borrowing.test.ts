import { borrowBook, returnBook } from "../controllers/borrowingController";
import * as borrowingService from "../services/borrowingService";
import { Request, Response } from "express";

jest.mock("../services/borrowingService");

describe("Borrowing Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    req = { body: {} };
    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  describe("borrowBook", () => {
    // test borrow book success
    it("should return 201 and borrowing data on success", async () => {
      const borrowingData = { id: 1, memberId: 1, bookId: 1, borrowedAt: new Date() };
      (borrowingService.borrowBook as jest.Mock).mockResolvedValue(borrowingData);

      req.body = { memberId: 1, bookId: 1 };

      await borrowBook(req as Request, res as Response);

      expect(borrowingService.borrowBook).toHaveBeenCalledWith(1, 1);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(borrowingData);
    });

    // test borrow book failure
    it("should return 400 and error message on failure", async () => {
      (borrowingService.borrowBook as jest.Mock).mockRejectedValue(new Error("Borrowing failed"));

      req.body = { memberId: 1, bookId: 1 };

      await borrowBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Borrowing failed" });
    });

    // test member already borrowed 2 books
    it("should return 400 if member already borrowed 2 books", async () => {
      (borrowingService.borrowBook as jest.Mock).mockRejectedValue(new Error("Member already borrowed 2 books"));

      req.body = { memberId: 1, bookId: 1 };

      await borrowBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Member already borrowed 2 books" });
    });

    // test member is under penalty
    it("should return 400 if member is under penalty", async () => {
      (borrowingService.borrowBook as jest.Mock).mockRejectedValue(new Error("Member is under penalty"));

      req.body = { memberId: 1, bookId: 1 };

      await borrowBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Member is under penalty" });
    });
  });

  describe("returnBook", () => {
    // test return book
    it("should return returned book data", async () => {
      const returnData = { id: 1, memberId: 1, bookId: 1, returnedAt: new Date() };
      (borrowingService.returnBook as jest.Mock).mockResolvedValue(returnData);

      req.body = { memberId: 1, bookId: 1 };

      await returnBook(req as Request, res as Response);

      expect(borrowingService.returnBook).toHaveBeenCalledWith(1, 1);
      expect(jsonMock).toHaveBeenCalledWith(returnData);
    });

    // test return book failure

    it("should return 400 and error message on failure", async () => {
      (borrowingService.returnBook as jest.Mock).mockRejectedValue(new Error("Return failed"));

      req.body = { memberId: 1, bookId: 1 };

      await returnBook(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Return failed" });
    });
  });
});
