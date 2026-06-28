import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",issueController.issueCreate);
router.get("/", auth(),issueController.getAllIssues);
router.get("/:id", issueController.getSingleUser);
router.patch("/:id", auth(), issueController.issueUpdate);
router.delete("/:id", auth(), issueController.deleteIssue);

export const issuesRouter = router;
