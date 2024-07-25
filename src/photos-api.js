import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "8YDkswQEfzE-j_bIsJqtpu86ULOG2EG3cznQVp5Jit8";

export const fetchPhotos = async (topic, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: topic,
      orientation: "landscape",
      per_page: 12,
      client_id: ACCESS_KEY,
      page: page,
    },
  });

  return response.data;
};
