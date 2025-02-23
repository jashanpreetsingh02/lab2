import axios from "axios";

const API_BASE_URL = "http://localhost:3333";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data; // ✅ Ensures we return JSON
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed." }; // ✅ Returns an object with error key
  }
};

export const fetchFact = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fact`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.fact; // ✅ Ensures we return a string
  } catch (error) {
    return "Error fetching Chuck Norris fact."; // ✅ Returns a string, not an object
  }
};

export const logout = async (token) => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
