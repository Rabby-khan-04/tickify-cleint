import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import logo from "../../assets/brand/logo.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthStore from "../../hooks/useAuthStore";
import toast from "react-hot-toast";
import axiosPublic from "../../utils/axiosPublic";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const { registerUser, updateUserInfo, authUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(authUser);
  const onSubmit = (data) => {
    const { name, photo, email, password } = data;

    registerUser(email, password)
      .then(() => {
        updateUserInfo({ displayName: name, photoURL: photo })
          .then(() => {
            axiosPublic
              .post("/auth/register", { email, name, photo })
              .then((res) => {
                if (res.data?.data) {
                  toast.success("🎉 Account created successfully! ");
                  navigate(from);
                }
              })
              .catch((err) => {
                console.error(`Register ERROR: ${err}`);
              });
          })
          .catch((error) => {
            console.error(`Update profile ERROR: ${error}`);
            toast.error(error.message || "Registration Faild!");
          });
      })
      .catch((error) => {
        console.error(`Register ERROR: ${error}`);
        toast.error(error.message || "Registration Faild!");
      });
  };

  return (
    <section className="h-screen overflow-hidden md:grid md:grid-cols-2">
      <div className="max-md:hidden relative p-6 md:p-8 xl:p-14 flex flex-col justify-between">
        <BlurCircle top="-100px" right="-100px" />
        <img src={logo} className="w-32 lg:w-40" alt="" />

        <div className="max-w-2xl ">
          <p className="text-4xl md:text-5xl xl:text-6xl italic leading-relaxed font-extralight text-transparent bg-gradient-to-b from-white to-white/40 bg-clip-text">
            Welcome. Begin your cinematic adventure now with our ticketing
            platform!
          </p>
        </div>

        <BlurCircle bottom="-50px" left="-50px" />
      </div>
      <div className="max-md:h-screen max-md:relative md:bg-white flex items-center justify-center p-14">
        <div className="md:hidden">
          <BlurCircle top="-100px" right="-100px" />
        </div>
        <div className="max-md:bg-white max-md:py-8 max-md:px-6 max-md:rounded-xl max-w-xl w-full">
          <SectionTitle title="Create an account" className="text-dark" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="name" className="text-base text-text-muted block">
                Name*
              </label>
              <input
                type="text"
                id="name"
                className="outline-0 focus:outline-0 border border-dark/50 rounded-md px-4 py-2 w-full block"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium">
                  Name is required!!
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="photo"
                className="text-base text-text-muted block"
              >
                Photo URL*
              </label>
              <input
                type="text"
                id="photo"
                className="outline-0 focus:outline-0 border border-dark/50 rounded-md px-4 py-2 w-full block"
                placeholder="Enter your photo"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-xs text-red-500 font-medium">
                  Photo is required!!
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="email"
                className="text-base text-text-muted block"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                className="outline-0 focus:outline-0 border border-dark/50 rounded-md px-4 py-2 w-full block"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  Eamil is required!!
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="password"
                className="text-base text-text-muted block"
              >
                Password*
              </label>
              <div className="relative">
                <input
                  type={toggle ? "text" : "password"}
                  id="password"
                  className="outline-0 focus:outline-0 border border-dark/50 rounded-md px-4 py-2 w-full block"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-[10px] top-[10px] text-text-muted cursor-pointer"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  {toggle ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 font-medium">
                  Password is required!!
                </p>
              )}
            </div>

            <input
              type="submit"
              className="inline-block w-full py-2 px-4 bg-primary text-white rounded-md text-xl font-medium cursor-pointer"
              value="Create Account"
            />
          </form>
          <div className="text-center myt-4 md:my-6">
            <p className="text-text-muted text-sm">
              Already Have An Account?{" "}
              <Link className="text-primary" to="/login">
                Login !!
              </Link>
            </p>
          </div>
        </div>
        <div className="md:hidden">
          <BlurCircle bottom="-50px" left="-50px" />
        </div>
      </div>
    </section>
  );
};

export default Register;
