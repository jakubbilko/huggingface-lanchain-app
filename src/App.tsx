import { ChangeEvent, useRef, useState } from "react";

import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <main>
      <h1 className="text-[100px] text-red-600 font-creepster">Horror Story Generator</h1>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".jpg,.png"
        onChange={handleChange}
      />
      <button className="text-white bg-red-600 p-4 rounded-lg" onClick={handleClick}>
        Select image
      </button>
      {!!image && <img className="m-auto my-4" alt="" src={image} />}
      {!!desc && <p className="my-4 text-white">{desc}</p>}
    </main>
  );
}

export default App;
