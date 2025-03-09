import { Router } from "express";
import * as memberController from "../controllers/memberController";

const router = Router();
/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     description: Retrieve a list of all members.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: A list of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                     example: "M001"
 *                   name:
 *                     type: string
 *                     example: "Angga"
 */
router.get("/", memberController.getAllMembers);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get a member by ID
 *     description: Retrieve a member's details using their ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Member found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 code:
 *                   type: string
 *                   example: "M001"
 *                 name:
 *                   type: string
 *                   example: "Asyifa"
 *       404:
 *         description: Member not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member not found"
 */
router.get("/:id", memberController.getMemberById);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     description: Add a new member to the system.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "M004"
 *               name:
 *                 type: string
 *                 example: "Maulana"
 *     responses:
 *       201:
 *         description: Member created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     code:
 *                       type: string
 *                     name:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Member created successfully"
 */
router.post("/", memberController.createMember);

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member's details
 *     description: Modify an existing member's information.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rizky"
 *     responses:
 *       200:
 *         description: Member updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updateMember:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     code:
 *                       type: string
 *                     name:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Member updated successfully"
 *       404:
 *         description: Member not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member not found"
 */
router.put("/:id", memberController.updateMember);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member
 *     description: Remove a member from the system using their ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Member deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member deleted successfully"
 */
router.delete("/:id", memberController.deleteMember);

export default router;
