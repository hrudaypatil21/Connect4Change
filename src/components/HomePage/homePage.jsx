import React from "react";
import { HeroSection } from "./HeroSection";
import { MainContentPart1 } from "./MainContentPart1";
import { MainContentPart2 } from "./MainContentPart2";
import { FooterSection } from "./Footer";
import "./homePage.css";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MainContentPart1 />
      <MainContentPart2 />
      <FooterSection />
    </>
  );
};
export default HomePage;