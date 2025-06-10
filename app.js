import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "./services/studentService.js";

const app = express();
app.use(express.json());

// Read (all)
app.get("/students", async (req, res) => {
  try {
    res.json(await getAllStudents());
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: "Could not fetch students",
        details: { type: err.name, message: err.message },
      });
  }
});
// Create
app.post("/students", async (req, res) => {
  try {
    return res.status(201).json(await createStudent(req.body));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: "Could not create user",
        details: { type: err.name, message: err.message },
      });
  }
});

// Read (by ID)
app.get("/students/:id", async (req, res) => {
  try {
    res.json(await getStudentById(req.params.id));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Could not fetch user.",
      details: { type: err.name, message: err.message },
    });
  }
});

// Update
app.put("/students/:id", async (req, res) => {
  try {
    res.json(await updateStudent(req.params.id, req.body));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: "Could not update user",
        details: { type: err.name, message: err.message },
      });
  }
});

// Delete
app.delete("/students/:id", async (req, res) => {
  try {
    console.log(req.query.email);
    deleteStudent(req.params.id,req.query.email);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: "Could not delete user",
        details: { type: err.name, message: err.message },
      });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
