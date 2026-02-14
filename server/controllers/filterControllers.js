import Car from "../models/Car.js"

// Get unique brands
export const getUniqueBrands = async (req, res) => {
    try {
        const brands = await Car.distinct('brand');
        res.status(200).json({
            success: true,
            brands
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get with prize range

export const getPriceRange = async (req, res) => {
    try {
        const minPrice = await Car.findOne().sort({ price: 1 }).select("price");
        const maxPrice = await Car.findOne().sort({ price: -1 }).select("price");
        res.status(200).json({
            success: true,
            minPrice: minPrice?.price || 0,
            maxPrice: maxPrice?.price || 1000000000,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


//get with year

export const getYearRange = async (req, res) => {
    try {
        const minYear = await Car.findOne().sort({ year: 1 }).select("year")
        const maxYear = await Car.findOne().sort({ year: -1 }).select("year")
        res.status(200).json({
            success: true,
            minYear: minYear?.year || 2000,
            maxYear: maxYear?.year || new Date().getFullYear(),
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





export const allInOneSearch = async (req, res) => {
  try {
    const { brand, price, year } = req.query;
    const query = {};

    // Brand filter
    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }

    // Price filter (≤ entered price)
    if (price && !isNaN(price)) {
      query.price = { $lte: Number(price) };
    }

    // Year filter
    if (year && !isNaN(year)) {
      query.year = Number(year);
    }

    const cars = await Car.find(query).sort({ price: 1 });

    res.status(200).json({
      success: true,
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};