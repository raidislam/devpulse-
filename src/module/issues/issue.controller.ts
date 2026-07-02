import type { Request, Response } from "express";
import { issueService } from "./issue.service";

const issueCreate = async (req: Request, res: Response) => {
  const body = req.body;
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }

  try {
    const result = await issueService.createIssueIntoDB(
      body,
      req.user as { id: number; name: string; role: "contributor" | "maintainer" },
    );
    res.status(201).json({
      success: true,
      message: "Issue create successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Issue creation failed",
      data: null,
    });
  }
};

// Sorting

const getAllIssues = async (req: Request, res: Response) => {
  
  try {
    const result = await issueService.getAllIssuesFromDB();
    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result,
    });
  } catch (err) {
    res.status(401).json({
      message: "Issues Not Found",
      success: false,
      data: null,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await issueService.getSingleUserFromDB(id);
    res.status(200).json({
      message: "Get Single Issue Successful",
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(401).json({
      message: "Issue Not Found",
      success: false,
      data: null,
    });
  }
};

const issueUpdate = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;
  try {
    const result = await issueService.issueUpdateServiceFromDB(id, body);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Issue Not Found",
        success: false,
        data: null,
      });
    }
    res.status(200).json({
      message: "Update Issue Successful",
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(401).json({
      message: "Issue Not Found",
      success: false,
      data: null,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await issueService.deleteIssueFromDB(id);
    res.status(200).json({
      message: "Delete Issue Successful",
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(401).json({
      message: "Issue Not Found",
      success: false,
      data: null,
    });
  }
};

export const issueController = {
  issueCreate,
  getAllIssues,
  getSingleUser,
  issueUpdate,
  deleteIssue
};
