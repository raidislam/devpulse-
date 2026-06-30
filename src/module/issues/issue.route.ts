import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();


router.post("/",auth(USER_ROLE.maintainer,USER_ROLE.contributor),issueController.issueCreate);
router.get("/", auth(USER_ROLE.maintainer,USER_ROLE.contributor),issueController.getAllIssues);
router.get("/:id", issueController.getSingleUser);
router.patch("/:id", auth(USER_ROLE.maintainer,USER_ROLE.contributor), issueController.issueUpdate);
router.delete("/:id", auth(USER_ROLE.maintainer), issueController.deleteIssue);

export const issuesRouter = router;
