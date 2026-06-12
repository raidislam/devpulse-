import { Router } from "express";
import { issueController } from "./issue.controller";

const router =  Router()

router.post("/issues",issueController.issueCreate)
router.get("/issues",issueController.getAllIssues)
router.get("/issues/:id",issueController.getSingleUser)
router.patch("/issues/:id",issueController.issueUpdate)
router.delete("/issues/:id",issueController.deleteIssue)

export const issuesRouter = router;