import axiosInstance from "../api/axiosInstance";

export const getServices = async () => {
  const res = await axiosInstance.get("/services");
  return res.data;
};

export const createService = async (data) => {
  const res = await axiosInstance.post("/services", data);
  return res.data;
};

export const updateService = async (id, data) => {
  const res = await axiosInstance.put(`/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await axiosInstance.delete(`/services/${id}`);
  return res.data;
};
