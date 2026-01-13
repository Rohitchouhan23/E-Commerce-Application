import Car from "../models/Car.js"


export const createCar = async (req, res) => {
    try {
        const carData = {
            ...req.body,
            owner: req.user._id 
        };
        const car = await Car.create(carData);
        res.status(201).json({
            success: true,
            message: "car Listed Successfully",
            car,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAllCar = async (req, res) => {
    try {
        const {
            brand,
            fuelType,
            transmission,
            minPrice,
            maxPrice,
            minYear,
            maxYear,
            search,
        } = req.query;

        let query = { sold: false };

        if (brand) query.brand = brand;
        if (fuelType) query.fuelType = fuelType;
        if (transmission) query.transmission = transmission;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (minYear || maxYear) {
            query.year = {}
            if (minYear) query.year.$gte = Number(minYear);
            if (maxYear) query.year.$lte = Number(maxYear);
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { model: { $regex: search, $options: "i" } },
            ];
        }
        const cars = await Car.find(query)
            .populate("owner", "name email")
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: cars.length,
            cars,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//car get by id

export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
            .populate("owner", "name email");
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not Found"
            });
        }
        res.status(200).json({ success: true, car })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const updateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "car not found"
            });
        }
        if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            message: "Car listing updated successfully",
            car: updatedCar
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update car listing"
        })
    }
}

// delete car listing

export const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "car not found"
            })
        };
        if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Car listing deleted successfull"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete car listing"
        })
    };
}


//get user owner list

export const getUserCar = async (req, res) => {
    try {
        const cars = await Car.find({ owner: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            count: cars.length,
            cars
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//marks car as sold

export const soldCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "car not found"
            })
        }
        if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        car.sold = true;
        await car.save();
        res.status(200).json({
            success: true,
            message: "Car marked as sold",
            car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to mark car as sold"
        });
    }
}