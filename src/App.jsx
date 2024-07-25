import "./App.css";
import { fetchPhotos } from "./photos-api";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import { useState } from "react";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState({});
  console.log(page);
  console.log(photos);

  const handleSearch = async (topic) => {
    try {
      setLoading(true);
      setPhotos([]);
      setError(false);
      const data = await fetchPhotos(topic, page);

      if (data.results.length === 0) {
        return toast.error("Sorry, nothing found", {
          icon: "🤯",
        });
      }
      setTotalPage(data);
      setPhotos((prev) => [...prev, ...data.results]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {loading && <Loader />}
      {totalPage.total_pages > 1 && <LoadMoreBtn onClick={loadMore} />}
    </>
  );
};

export default App;
