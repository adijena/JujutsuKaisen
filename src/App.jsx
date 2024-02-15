import { useState } from "react";
import sakuna from "./assets/sakuna.jpg";
import gojo from "./assets/gojo.jpg";
import { storage } from "./configs/firebase";
import { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import CharacterCard from "./components/CharacterCard";

function App() {
  const characters = [
    {
      name: "gojo",
      image: gojo,
    },
    {
      name: "sakuna",
      image: sakuna,
    },
  ];
  const [character, setCharacter] = useState({
    name: "sakuna",
    image: sakuna,
  });

  const [videoUrl, setVideoUrl] = useState("");
  const [runVideo, setRunVideo] = useState(false);

  const updateCharacter = (name) => {
    console.log(character);
    const selectedCharacter = characters.find((char) => char.name === name);
    if (selectedCharacter) {
      setCharacter(selectedCharacter);
      setRunVideo(false);
      setVideoUrl("");
    }
    console.log(character);
  };

  // update runVideo
  useEffect(() => {
    setTimeout(() => {
      setRunVideo(true);
    }, 20000);
  }, [character]);

  // update video
  useEffect(() => {
    const getVideoUrl = async () => {
      try {
        const videoRef = ref(storage, `${character.name}.mp4`);
        console.log(videoRef);
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    getVideoUrl();
  }, [videoUrl]);

  return (
    <div
      className="text-white w-full h-screen bg-cover bg-center flex flex-row items-center justify-center md:justify-start"
      style={{
        backgroundImage: `url(${character.image})`,
      }}
    >
      {/* content */}
      <div className="z-20 flex flex-col p-6 md:max-w-md text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold mb-2">
            Jujutsu Kaisen
          </h1>
          <p className="text-sm mb-4 italic">
            Witness breathtaking battles, captivating characters, and a unique
            blend of supernatural action and horror.
          </p>
          <p className="text-xs italic md:text-justify">
            Unravel the mysteries of cursed energy, defy fate alongside unlikely
            heroes, and face horrifying creatures beyond imagination. This is
            Jujutsu Kaisen - where darkness meets power, and every choice shapes
            the destiny of mankind.
          </p>
      </div>
      {/* video */}
      <div className="w-full h-screen absolute top-0 left-0 z-10">
        {videoUrl ? (
          <video autoPlay muted loop className="w-full h-screen object-fill">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          ""
        )}
      </div>
      {/* character cards */}
      <div className="flex flex-col gap-5 absolute right-4 top-10 z-20">
        <CharacterCard
          name="sakuna"
          image={sakuna}
          onClick={() => {
            updateCharacter("sakuna");
          }}
        />
        <CharacterCard
          name="gojo"
          image={gojo}
          onClick={() => {
            updateCharacter("gojo");
          }}
        />
      </div>
    </div>
  );
}

export default App;
