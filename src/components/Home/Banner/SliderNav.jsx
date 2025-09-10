import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const SliderNav = ({ swiper }) => {
  return (
    <div className="absolute bottom-4 right-20 lg:bottom-20 z-30 flex items-center gap-3">
      <button
        onClick={() => swiper.slidePrev()}
        className="text-white p-2 bg-white/20 rounded-lg cursor-pointer inline-block hover:bg-primary/20 hover:text-primary transition-all duration-150"
      >
        <FaCaretLeft className="text-2xl" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="text-white p-2 bg-white/20 rounded-lg cursor-pointer inline-block hover:bg-primary/20 hover:text-primary transition-all duration-150"
      >
        <FaCaretRight className="text-2xl" />
      </button>
    </div>
  );
};

export default SliderNav;
