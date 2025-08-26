import React, { useState } from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { useLocation } from "react-router-dom";

const OwnerSidebar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState();

  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };

  return (
    <section className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-[#b2b0e8] text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt=""
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center pointer">
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>
    </section>
  );
};

export default OwnerSidebar;
