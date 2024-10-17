
export const ImageSlider = ({
  images,
  classNameForImage
}: {
  images: string[];
  classNameForImage?: string;
}) => {
  const [addedToList, setAddedToList] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  classNameForImage = twMerge("aspect-[16/9] relative group mb-4 cursor-pointer rounded-md overflow-hidden border border-gray-200 shadow-md", classNameForImage);
  return <div className={classNameForImage}>
      <div className="flex transform transition-transform duration-500" style={{
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: "transform 0.5s ease"
    }}>
        {images.map((image: string, index: number) => <img key={index} src={image} alt={`Slide ${index + 1}`} style={{
        aspectRatio: "16/10"
      }} className="object-fit block max-w-full" />)}
      </div>
      <span onClick={() => setAddedToList(p => !p)} className="absolute right-4 top-4 cursor-pointer">
        {addedToList ? <FaHeart className="opacity-20" size={25} color="black" fill="red" /> : <FaHeart size={25} color="black" fill="#ec3131" />}
      </span>
      {currentIndex > 0 && <button className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100" onClick={handlePrev}>
          <FaChevronLeft className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>}
      {currentIndex + 1 < images.length && <button className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100" onClick={handleNext}>
          <FaChevronRight className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>}
    </div>;
};
  