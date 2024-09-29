"use client"; // Add this line at the top

import Header from "@/components/Header";
import { Suspense } from 'react';

import HomeHero from "@/components/Homehero";
import Post from "@/components/Post";
import Logos from "@/components/Homelogos";
import LogoSlider from "@/components/LogoSlider";
import Design1 from "@/components/design1";
import Categories from "@/components/Categories";
import Landing from "@/components/Landing";
export default function Page() {
  return (
    <>
    <Suspense>


  
 <Landing/>
</Suspense>
    </>
  );
}
