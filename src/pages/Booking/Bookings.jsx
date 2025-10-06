import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";

const Bookings = () => {
  return (
    <main className="py-20 lg:py-32 relative overflow-hidden">
      <BlurCircle top="-100px" right="-100px" />
      <section>
        <div className="container-fluid">
          <SectionTitle title="Ticket Detail" />
        </div>
      </section>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default Bookings;
