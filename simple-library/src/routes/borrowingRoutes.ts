import { Router } from "express";
import * as borrowingController from "../controllers/borrowingController";

const router = Router();

/**
 * @swagger
 * /borrowings/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a member to borrow a book with certain conditions.
 *     tags:
 *       - Borrowings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Book borrowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 memberId:
 *                   type: integer
 *                 bookId:
 *                   type: integer
 *                 borrowDate:
 *                   type: string
 *                   format: date-time
 *                 returnDate:
 *                   type: string
 *                   format: date-time
 *                 penaltyUntil:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Borrowing failed due to business rules.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member cannot borrow more than 2 books."
 */
router.post("/borrow", borrowingController.borrowBook);

/**
 * @swagger
 * /borrowings/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a member to return a borrowed book.
 *     tags:
 *       - Borrowings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 memberId:
 *                   type: integer
 *                 bookId:
 *                   type: integer
 *                 borrowDate:
 *                   type: string
 *                   format: date-time
 *                 returnDate:
 *                   type: string
 *                   format: date-time
 *                 penaltyUntil:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Returning failed due to validation errors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This book was not borrowed by the member."
 */
router.post("/return", borrowingController.returnBook);

export default router;
