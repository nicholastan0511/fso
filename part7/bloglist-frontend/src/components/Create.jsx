import { useState } from "react";

const Create = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlog = (e) => {
    e.preventDefault();
    props.handleBlog(title, author, url);
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleBlog}>
      <div>
        title:
        <input
          className="title"
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>
      <div>
        author:
        <input
          className="author"
          type="text"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
      </div>
      <div>
        url:
        <input
          className="url"
          type="text"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

export default Create;
