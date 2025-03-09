import { Request, Response } from "express";
import * as memberController from "../controllers/memberController";
import * as memberService from "../services/memberService";

// Mock `memberService`
jest.mock("../services/memberService");

describe("Member Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => res as Response);
    sendMock = jest.fn();

    res = {
      json: jsonMock,
      status: statusMock,
      send: sendMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test get all members
  test("should get all members", async () => {
    const mockMembers = [{ id: 1, code: "M001", name: "Asyifa Maulana" }];
    (memberService.getAllMembers as jest.Mock).mockResolvedValue(mockMembers);

    await memberController.getAllMembers(req as Request, res as Response);

    expect(memberService.getAllMembers).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(mockMembers);
  });

  // test get member by id
  test("should get member by ID if found", async () => {
    const mockMember = { id: 1, code: "M001", name: "Asyifa Maulana" };
    req = { params: { id: "1" } };
    (memberService.getMemberById as jest.Mock).mockResolvedValue(mockMember);

    await memberController.getMemberById(req as Request, res as Response);

    expect(memberService.getMemberById).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(mockMember);
  });

  // test get member by id not found
  test("should return 404 if member not found", async () => {
    req = { params: { id: "99" } };
    (memberService.getMemberById as jest.Mock).mockResolvedValue(null);

    await memberController.getMemberById(req as Request, res as Response);

    expect(memberService.getMemberById).toHaveBeenCalledWith(99);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Member not found" });
  });

  // test create member
  test("should create a new member", async () => {
    const newMember = { id: 2, code: "M002", name: "Maulana Malik" };
    req = { body: { code: "M002", name: "Maulana Malik" } };
    (memberService.createMember as jest.Mock).mockResolvedValue(newMember);

    await memberController.createMember(req as Request, res as Response);

    expect(memberService.createMember).toHaveBeenCalledWith("M002", "Maulana Malik");
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      member: newMember,
      message: "Member created successfully",
    });
  });

  // test update member
  test("should update a member", async () => {
    const updatedMember = { id: 1, code: "M001", name: "Maulana Khalif" };
    req = { params: { id: "1" }, body: { name: "Maulana Khalif" } };
    (memberService.updateMember as jest.Mock).mockResolvedValue(updatedMember);

    await memberController.updateMember(req as Request, res as Response);

    expect(memberService.updateMember).toHaveBeenCalledWith(1, "Maulana Khalif");
    expect(jsonMock).toHaveBeenCalledWith({
      updateMember: updatedMember,
      message: "Member updated successfully",
    });
  });

  // test update member not found
  test("should return 404 if updating non-existent member", async () => {
    req = { params: { id: "99" }, body: { name: "Maulana Khalif" } };
    (memberService.updateMember as jest.Mock).mockResolvedValue(null);

    await memberController.updateMember(req as Request, res as Response);

    expect(memberService.updateMember).toHaveBeenCalledWith(99, "Maulana Khalif");
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Member not found" });
  });

  // test delete member
  test("should delete a member", async () => {
    req = { params: { id: "1" } };
    (memberService.deleteMember as jest.Mock).mockResolvedValue(undefined);

    await memberController.deleteMember(req as Request, res as Response);

    expect(memberService.deleteMember).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith({ message: "Member deleted successfully" });
  });
});
