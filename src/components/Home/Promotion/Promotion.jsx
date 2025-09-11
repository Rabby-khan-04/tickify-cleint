import { SquareArrowOutUpRight } from "lucide-react";
import promoImg from "../../../assets/icon/ticket.png";
import moviePoster from "../../../assets/image/moviePoster.jpg";
import { IoIosHappy } from "react-icons/io";
import { HiEmojiHappy } from "react-icons/hi";
import { RiEmotionUnhappyFill } from "react-icons/ri";

const Promotion = () => {
  return (
    <section className="p-top">
      <div className="container-fluid grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-4 p-6 rounded-xl bg-secondary flex max-sm:flex-col items-center ">
          <div className="grow">
            <h3 className="text-[clamp(1.2rem,2vw,32px)] font-[600] mb-2 text-white">
              Student Reward Program
            </h3>
            <h4 className="text-[clamp(1rem,1.8vw,28px)] font-bold mb-3 text-[#fbd356]">
              `Buy 1 GET 1`
            </h4>
            <p className="text-base sm:text-lg text-white mb-2">
              Buy 1 ticket, get 1 free! Grab a friend and catch the latest
              movies together. Don’t miss out—this offer is only for students
              and for a limited time!
            </p>

            <button className="btn-ghost">
              <SquareArrowOutUpRight />
              <span>See More</span>
            </button>
          </div>
          <div className="shrink-0">
            <img
              src={promoImg}
              className="w-[300px] max-sm:w-auto max-sm:max-w-[200px] lg:max-w-[300px] "
              alt=""
            />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white/10 backdrop-blur border border-white rounded-xl p-6">
          <h3 className="text-[clamp(1.2rem,2vw,32px)] font-[600] mb-2 text-white">
            How do you rate this movie?
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <img src={moviePoster} className="h-40 rounded-lg" alt="" />
            <h3 className="text-[clamp(1rem,1.8vw,28px)] text-white font-medium">
              F1: The Movie
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="btn-ghost-sm">
              <IoIosHappy className="text-yellow-400 text-lg" />
              <span>Excellent</span>
            </div>
            <div className="btn-ghost-sm">
              <HiEmojiHappy className="text-yellow-400 text-lg" />
              <span>Good</span>
            </div>
            <div className="btn-ghost-sm">
              <RiEmotionUnhappyFill className="text-yellow-400 text-lg" />
              <span>Average</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
