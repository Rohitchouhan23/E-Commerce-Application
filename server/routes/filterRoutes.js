import {getUniqueBrands,getPriceRange,getYearRange,allInOneSearch} from "../controllers/filterControllers.js";
import express from "express"
const router = express.Router();



router.get("/brand",getUniqueBrands);
router.get("/price",getPriceRange);
router.get("/year",getYearRange);
router.get("/all",allInOneSearch);


export default router;

