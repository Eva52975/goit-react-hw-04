import toast, { Toaster } from "react-hot-toast";
import c from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (topic.trim() === "") {
      toast.error("Please enter a word");
      return;
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <header className={c.header}>
      <form className={c.form} onSubmit={handleSubmit}>
        <input className={c.input} name="topic" type="text" autoComplete="off" autoFocus placeholder="Search images and photos" />
        <button className={c.button} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
