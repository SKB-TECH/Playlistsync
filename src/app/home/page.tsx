import React from 'react'
import Welcome from "@/components/Welcome";
import {SidebarRight} from "@/components";

export default function page() {
  return (
    <section className='md:ml-56 md:padding-container md:min-w-[65%]  flexCenter gap-10 bg-light-m dark:bg-dark-m min-w-[100%] md:min-h-full mt-40 md:mt-0'>
        <Welcome/>
    </section>
  )
}
