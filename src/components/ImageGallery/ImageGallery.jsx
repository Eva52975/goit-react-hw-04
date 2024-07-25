import ImageCard from "../ImageCard/ImageCard";
import c from "./ImageGallery.module.css";

const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={c.list}>
      {photos.map((photo) => (
        <li key={photo.id}>
          <ImageCard photo={photo} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
