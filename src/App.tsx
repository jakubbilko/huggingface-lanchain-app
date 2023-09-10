import { ChangeEvent, useRef, useState } from "react";

import "./App.css";
import { getImageDescription, getVoiceOver } from "./apis/huggingface";
import { getStoryFromDescription } from "./apis/openai";
import { Spinner } from "./components/Spinner";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState("");

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setLoading(true);

    const file = e.target.files[0];
    generatePreview(file);
    const imageDescription = await getImageDescription(file);
    setDesc(imageDescription);
    const story = await getStoryFromDescription(imageDescription);
    setStory(story);
    const voiceOver = await getVoiceOver(story);
    setVoice(window.URL.createObjectURL(voiceOver));

    setLoading(false);
  };

  return (
    <main>
      <h1 className="text-[100px] text-red-600 font-creepster">Image-to-horror</h1>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".jpg,.png"
        onChange={handleChange}
      />
      <button
        disabled={loading}
        className="text-white bg-red-600 p-4 rounded-lg"
        onClick={handleClick}
      >
        Select image
      </button>
      {!!image && (
        <figure className="m-auto my-4 relative">
          <Spinner visible={loading} />
          <img className="m-auto" alt="" src={image} />
          {!!desc && <figcaption className="text-white">{desc}</figcaption>}
        </figure>
      )}
      {!!story && (
        <div>
          <h2 className="text-[50px] text-red-600 font-creepster">The Story</h2>
          <p className="text-white">{story}</p>
        </div>
      )}
      {!!voice && (
        <audio controls className="m-auto my-4">
          <source src={voice} />
        </audio>
      )}
    </main>
  );
}

export default App;
