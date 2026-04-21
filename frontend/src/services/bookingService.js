import axiosInstance from "../api/axiosInstance";

export const getBookings = async () => {
  const res = await axiosInstance.get("/bookings");
  return res.data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await axiosInstance.put(`/bookings/${id}`, { status });
  return res.data;
};

export const deleteBooking = async (id) => {
  const res = await axiosInstance.delete(`/bookings/${id}`);
  return res.data;
};
