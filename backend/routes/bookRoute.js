import express from 'express'
import { Book } from '../models/bookModels.js';
const router =express.Router()


router.post("/", async (req, res) => {
    try {
      const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      });
  
      return res.send(book);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.json(books);
    } catch (error) {
      console.log(error);
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const books = await Book.findById(id);
      return res.json(books);
    } catch (error) {
      console.log(error);
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const books = await Book.findByIdAndUpdate(id, req.body);
      return res.send({ message: "Updated Successfully" });
    } catch (error) {
      console.log(error);
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Book.findByIdAndDelete(id);
      return res.json({ message: "Book deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  });

  export default router;