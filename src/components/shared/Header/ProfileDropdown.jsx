import { ChevronDown } from "lucide-react";
import avatar from "../../../assets/icon/profile.png";

const ProfileDropdown = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="mr-4">
        <img
          src={avatar}
          className="size-10 rounded-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="max-lg:hidden mr-2 space-y-1">
        <h4 className="text-sm text-white/80">Hi, Welcome</h4>
        <p className="text-base lg:text-lg font-medium">Albert Edison</p>
      </div>
      <div className="max-lg:hidden">
        <ChevronDown />
      </div>
    </div>
  );
};

export default ProfileDropdown;
