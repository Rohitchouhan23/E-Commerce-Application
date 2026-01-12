import {getUniqueBrands,getPriceRange,getYearRange} from "../controllers/filterControllers.js";
import express from "express"
const router = express.Router();



router.get("/brand",getUniqueBrands);
router.get("/price",getPriceRange);
router.get("/year",getYearRange);


export default router;

