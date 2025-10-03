import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import check from "../../assets/icon/chek-circle.png";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <main className="h-screen relative overflow-hidden flex items-center justify-center">
      <BlurCircle top="-100px" right="-100px" />
      <div className="container-fluid">
        <div className="max-w-sm mx-auto text-white text-center">
          <SectionTitle title="Payment Success" />
          <img src={check} className="inline-block mb-10" alt="" />
          <div className="space-y-5">
            <Link to="/bookings" className="btn w-full text-center">
              View Ticket
            </Link>
            <Link to="/" className="btn-alt w-full text-center">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default PaymentSuccess;
