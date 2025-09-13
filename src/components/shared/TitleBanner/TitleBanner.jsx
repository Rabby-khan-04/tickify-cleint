import PropTypes from "prop-types";
import cinemaImg from "../../../assets/image/cinema-studio.jpg";

const TitleBanner = ({ title }) => {
  return (
    <section
      className="h-[600px] py-20 flex items-end justify-center bg-cover bg-center text-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${cinemaImg})`,
      }}
    >
      <h2 className="text-[clamp(2rem,3vw,80px)] font-bold text-primary">
        {title}
      </h2>
    </section>
  );
};

TitleBanner.propTypes = {
  title: PropTypes.string,
};

export default TitleBanner;
