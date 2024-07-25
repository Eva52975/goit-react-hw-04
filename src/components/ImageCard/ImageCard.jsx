import c from "./ImageCard.module.css";

const ImageCard = ({ photo, openModal }) => {
  return (
    <div>
      <img
        className={c.img}
        src={photo.urls.small}
        alt={photo.alt_description}
        onClick={() => {
          openModal(photo.urls.regular, photo.alt_description);
        }}
      />
    </div>
  );
};

export default ImageCard;
