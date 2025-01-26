import express from "express";
import { quizzes } from "../data/quizzes.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.json(quizzes);
});

router.post("/evaluate", authenticate, (req, res) => {
  const { title, answers } = req.body;

  const quiz = quizzes.find((q) => q.title === title);
  if (!quiz) return res.status(404).json({ message: "Quiz not found!" });

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  res.json({ score });
});

export default router;
