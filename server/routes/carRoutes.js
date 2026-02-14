import express from "express"
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
    createCar,
    getAllCar,
    getCarById,
    updateCar,
    deleteCar,
    getUserCar,
    soldCar,
    getMySoldCars
} from "../controllers/CarController.js";


router.get("/", getAllCar);
router.get("/my-cars", protect, getUserCar);
router.get("/my-sold-cars", protect, getMySoldCars);
router.post("/", protect, createCar);
router.get("/:id", getCarById);
router.put("/:id", protect, updateCar);
router.delete("/:id", protect, deleteCar);
router.patch("/:id/sold", protect, soldCar);

export default router; 
