import React, { useEffect, useState } from "react";
// import {bs} from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider = ({ url, limit = 5 }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurentSlide] = useState(0);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=4&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      } else console.log("no data is found");
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return (
      <div className="w-screen h-screen text-4xl flex justify-center items-center">
        Loading data! Wait kro
      </div>
    );
  }

  // ############### handlers #################
  function handlePrevious() {
    setCurentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  function handleNext() {
    setCurentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="relative flex justify-center items-center w-1/2 h-3/2">
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className="absolute drop-shadow-sm w-8 h-8 text-white left-4"
        />
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                key={imageItem.id}
                src={imageItem.download_url}
                alt={imageItem.download_url}
                className={`${
                  currentSlide === index ? "block" : "hidden"
                } rounded-lg shadow-lg w-full h-full`} //drop shadow , border-radius
              />
            ))
          : null}
        <BsArrowRightCircleFill
          onClick={handleNext}
          className="absolute drop-shadow-sm w-8 h-8 text-white right-4"
        />
        <span className="flex absolute bottom-4">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={`${
                    currentSlide === index ? "bg-white" : "bg-gray-400"
                  }  w-3.5 h-3.5 rounded-full my-0 mx-1 cursor-pointer border-none outline-none`}
                  onClick={() => setCurentSlide(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
};

export default ImageSlider;
