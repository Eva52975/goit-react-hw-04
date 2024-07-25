import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "8YDkswQEfzE-j_bIsJqtpu86ULOG2EG3cznQVp5Jit8";

export const fetchPhotos = async (topic, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: topic,
      orientation: "landscape",
      per_page: 10,
      client_id: ACCESS_KEY,
      page: page,
    },
  });

  return response.data;
};

// `?query=${topic}&client_id=${ACCESS_KEY}&per_page=15`;
