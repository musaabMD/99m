"use client"; // Add this line at the top

import Header from "@/components/Header";
import { Suspense } from 'react';

import HomeHero from "@/components/Homehero";
import Post from "@/components/Post";
import Logos from "@/components/Homelogos";
export default function Page() {
  return (
    <>
    <Suspense>


  
    <Header/>
  <HomeHero/>
  <Post/>
</Suspense>
    </>
  );
}
