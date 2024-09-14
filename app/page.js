import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import IncomoSearch from "@/components/Inclist";
import Categories from "@/components/Categories";
import Founders from "@/components/Founder";
import Post from "@/components/Post";
import Post2 from "@/components/post2";
import Header from "@/components/Header";
import { Suspense } from 'react';
import BetterIcon from "@/components/BetterIcon";
import PageHero from "@/components/PageHero";
export default function Page() {
  return (
    <>
    <Suspense>


  
    <Header/>
    <PageHero/>
    <BetterIcon/>
    <Post/>
    <Post2/>

</Suspense>
    </>
  );
}
