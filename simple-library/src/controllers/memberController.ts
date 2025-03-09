import { Request, Response } from "express";
import * as memberService from "../services/memberService";

// get all members
export const getAllMembers = async (req: Request, res: Response) => {
  const members = await memberService.getAllMembers();
  res.json(members);
};

// get member by id
export const getMemberById = async (req: Request, res: Response) => {
  const member = await memberService.getMemberById(Number(req.params.id));
  member ? res.json(member) : res.status(404).json({ message: "Member not found" });
};

// create member
export const createMember = async (req: Request, res: Response) => {
  const { code, name } = req.body;
  const member = await memberService.createMember(code, name);
  res.status(201).json({ member, message: "Member created successfully" });
};

// update member
export const updateMember = async (req: Request, res: Response) => {
  const { name } = req.body;
  const updateMember = await memberService.updateMember(Number(req.params.id), name);
  updateMember ? res.json({ updateMember, message: "Member updated successfully" }) : res.status(404).json({ message: "Member not found" });
};

// delete member
export const deleteMember = async (req: Request, res: Response) => {
  await memberService.deleteMember(Number(req.params.id));
  res.status(200).send({ message: "Member deleted successfully" });
};
