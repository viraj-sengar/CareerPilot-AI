import { Router } from "express";
import { 
  chatHandler, 
  interviewHandler, 
  resumeHandler, 
  skillGapHandler, 
  projectHandler 
} from "../controllers/ai.controller";

export const aiRouter = Router();

aiRouter.post("/chat", chatHandler);
aiRouter.post("/interview", interviewHandler);
aiRouter.post("/resume", resumeHandler);
aiRouter.post("/skill-gap", skillGapHandler);
aiRouter.post("/project", projectHandler);

export default aiRouter;
