const express = require("express");

const { CourseController } = require("../controller");

const CourseRouter = express.Router();

CourseRouter.get("/", CourseController.findAll);

CourseRouter.get("/:id", CourseController.findOne);

CourseRouter.post("/", CourseController.create);

CourseRouter.patch("/:id", CourseController.update);

CourseRouter.delete("/:id", CourseController.deleteCourse);

CourseRouter.delete("/deleteAll/:id", CourseController.deleteCoursesAndDishes);

CourseRouter.post("/search", CourseController.search);

CourseRouter.get("/all/:id", CourseController.coursesWithDishes);

CourseRouter.post("/change", CourseController.coursesOrder);

module.exports = { CourseRouter };
