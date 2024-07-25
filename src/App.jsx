import "./App.css";
import { fetchPhotos } from "./photos-api";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import { useState, useEffect } from "react";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!topic) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotos(topic, page);

        if (data.results.length === 0) {
          setShowBtn(false);
          return toast.error("Sorry, nothing found", {
            icon: "🤯",
          });
        }

        setShowBtn(data.total_pages && data.total_pages !== page);
        setPhotos((prev) => [...prev, ...data.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [topic, page]);

  const handleSearch = (topic) => {
    setTopic(topic);
    setPhotos([]);
    setPage(1);
    setLoading(false);
    setError(null);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  function openModal(url, alt) {
    setIsOpen(true);
    setModalUrl(url);
    setModalAlt(alt);
  }

  function closeModal() {
    setIsOpen(false);
    setModalUrl("");
    setModalAlt("");
  }

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {photos.length > 0 && <ImageGallery photos={photos} openModal={openModal} />}
      {loading && <Loader />}
      {showBtn && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal modalIsOpen={modalIsOpen} closeModal={closeModal} src={modalUrl} alt={modalAlt} />
    </>
  );
};

export default App;
