import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import Featured from "./Featured";
import useData from "./../../hooks/useData";
import config from "../../config.json";
const HomePage = () => {
  const { data, error } = useData("/products");

  return (
    <div>
      <HeroSection
        title="But iPhone 14 Pro"
        subtitle="experience the power of the latest iPhone 14 with our most Pro camera ever."
        link={`${config.backendURL}/product/6526b2f0c9adde931949ca63`}
        image={iphone}
      />
      <Featured />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched magic accessories to your bag adter configure your Mac mini."
        link="/product/6526b2f0c9adde931949ca6b"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
