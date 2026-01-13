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

// GET /api/cars
export const getAllCars = async () => {
  const res = await api.get("/api/cars");
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
export const soldCar = async (id) => {
  const res = await api.patch(`/api/cars/${id}`);
  return res.data;
};

