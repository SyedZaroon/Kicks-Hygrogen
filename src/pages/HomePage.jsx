import React from "react";
import HeroSlider from "../components/Sliders/HeroSlider";
import ReviewsSlider from "../components/Sliders/ReviewSlider";
import ProductSlider from "../components/Sliders/ProductSlider";
import CollectionSlider from "../components/Sliders/CollectionSilder";

const HomePage = () => {
  return (
    <div className="space-y-6 py-8 flex flex-col gap-20">
      <HeroSlider />
      <ProductSlider />
      <CollectionSlider />
      <ReviewsSlider />
    </div>
  );
};

export default HomePage;
