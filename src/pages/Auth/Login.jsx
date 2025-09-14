import { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
  };

  return (
    <section className="relative z-50 overflow-hidden">
      <BlurCircle top="-150px" right="-150px" />
      <div className="container-fluid h-screen  flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-xl py-8 px-6 md:py-20 md:px-10">
          <SectionTitle title="Login to your account" className="text-dark" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
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
              value="Login"
            />
          </form>
          <div className="text-center mt-4 md:mt-6">
            <p className="text-text-muted text-sm">
              Don't Have An Account?{" "}
              <Link className="text-primary" to="/register">
                Register Here!!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <BlurCircle bottom="-150px" left="-150px" />
    </section>
  );
};

export default Login;
