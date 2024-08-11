import React, { useEffect, useRef } from "react";

export default function ImagePreview({
  currentImageIndex,
  images,
  setShowImagePreviewIndex,
}) {
  const containerRef = useRef();
  const inputContainerRef = useRef();

  const handleOutsideClick = (e) => {
    e.preventDefault();
    if (
      containerRef &&
      !containerRef.current.contains(e.target) &&
      inputContainerRef &&
      !inputContainerRef.current.contains(e.target)
    ) {
      setShowImagePreviewIndex(-1);
    }
  };

  useEffect(() => {
    const container = document.getElementById("main-container");
    container.addEventListener("click", handleOutsideClick);
  }, []);

  console.log(currentImageIndex);

  return (
    <div
      className="fixed top-0 h-screen w-screen flex items-center justify-center flex-col backdrop-blur-sm z-50 gap-3"
      id="main-container"
    >
      <div
        className="  max-w-[75%] max-h-[80%] flex items-center justify-center overflow-hidden shadow-2xl shadow-black"
        ref={containerRef}
      >
        <img
          src={images[currentImageIndex]}
          className="max-h-full max-w-full"
        />
      </div>
      <div
        className="flex items-center justify-center gap-2"
        ref={inputContainerRef}
      >
        {images.map((img, index) => (
          <input
            type="radio"
            name="choice"
            className="radio radio-warning w-3 h-3"
            disabled={index == currentImageIndex}
            onChange={() => setShowImagePreviewIndex(index)}
            value={index}
          />
        ))}
      </div>
    </div>
  );
}
