"use client"

import React, {useEffect} from 'react'
import Welcome from "@/components/Welcome";
import {removeItem} from "@/storage";




export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        removeItem("sessionData")
        removeItem("sessionDetail")
        removeItem("session")
    }, []);

  return (
    <section className='md:ml-56 md:padding-container md:min-w-[65%]  flexCenter gap-10 bg-light-m dark:bg-dark-m min-w-[100%] md:min-h-full mt-40 md:mt-0'>
        <Welcome/>
    </section>
  )
}
