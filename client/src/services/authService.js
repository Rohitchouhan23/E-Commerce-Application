import {api} from "./api"

export const login=async(cred)=>{
    const res=await api.post("/api/login",cred)
    return res.data;
}

export const registerUser=async(cred)=>{
 const res=await api.post("/api/register",cred)
 return res.data;   
}

export const logout = async () => {
  localStorage.removeItem("token");
}; 

// // GET /api/cars
// export const getAllCars = async () => {
//   const res = await api.get("/api/cars");
//   return res.data;
// };

// GET /api/cars (with filters)
export const getAllCars = async (filters = {}) => {
  const res = await api.get("/api/cars", {
    params: filters,   // 👈 YAHI MISSING THA
  });
  return res.data;
};


// GET /api/cars/my-cars (protected)
export const getMyCars = async () => {
  const res = await api.get("/api/cars/my-cars");
  return res.data;
};

// POST /api/cars (protected)
export const createCar = async (carData) => {
  const res = await api.post("/api/cars", carData);
  return res.data;
};

// GET /api/cars/:id
export const getCarById = async (id) => {
  const res = await api.get(`/api/cars/${id}`);
  return res.data;
};

// PUT /api/cars/:id (protected)
export const updateCar = async (id, carData) => {
  const res = await api.put(`/api/cars/${id}`, carData);
  return res.data;
};

// DELETE /api/cars/:id (protected)
export const deleteCar = async (id) => {
  const res = await api.delete(`/api/cars/${id}`);
  return res.data;
};

// PATCH /api/cars/:id (protected) → sold car
// export const soldCar = async (id) => {
//   const res = await api.patch(`/api/cars/${id}`);
//   return res.data;
// };


export const soldCar = async (id) => {
  const res = await api.patch(`/api/cars/${id}/sold`);
  return res.data;
};





// ✅ Get unique brands
export const getUniqueBrands = async () => {
  const res = await api.get("/api/filter/brand");
  return res.data;
};

// ✅ Get price range
export const getPriceRange = async () => {
  const res = await api.get("/api/filter/price");
  return res.data;
};

// ✅ Get year range
export const getYearRange = async () => {
  const res = await api.get("/api/filter/year");
  return res.data;
};


export const allInOneSearch = async (params) => {
  const res = await api.get("/api/filter/all", { params });
  return res.data;
};


export const getMySoldCars = async () => {
  const res = await api.get("/api/cars/my-sold-cars");
  return res.data;
};