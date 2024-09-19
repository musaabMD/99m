"use client"; // Add this line at the top

import Header from "@/components/Header";
import { Suspense } from 'react';

import HomeHero from "@/components/Homehero";
import Post from "@/components/Post";
import Logos from "@/components/Homelogos";
import LogoSlider from "@/components/LogoSlider";
import Design1 from "@/components/design1";
export default function Page() {
  return (
    <>
    <Suspense>


  
    <Header/>
  <HomeHero/>
  <LogoSlider/>
  <Design1/>
  <Post/>
</Suspense>
    </>
  );
}
