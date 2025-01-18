"use client";

import { cn } from '@/lib/utils';
import { ImageIcon, Images, LayoutDashboard, MessageCircle, MessageSquare, Settings, TableOfContentsIcon, TvMinimalPlay, VideoIcon } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
const montserrat = Montserrat ({ weight: "600", subsets: ["latin"]});

const routes =[
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-red-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-sky-500"
    },
    {
        label: "Creative Studio",
        icon: Images,
        href: "/creative-studio",
        color: "text-yellow-500"
    },
    {
        label: "Creative Media",
        icon: TvMinimalPlay,
        href: "/creative-media",
        color: "text-green-500"
    },
    {
        label: "Content Wizard",
        icon: TableOfContentsIcon,
        href: "/content-wizard",
        color: "text-purple-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        
    }
]

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <div className='space-y-4 py-4 flex flex-col h-full
   bg-[#121212] text-white '>
         <div className='px-3 py-2 flex-1'>
            <Link href={'/dashboard'} className='flex items-center
            pl-3 mb-14'>
                <div className='relative w-9 h-9 mr-3 '>
                  <Image fill src={'/logo.png'} alt={'Logo'}/>
                </div>
                <h1 className={cn('text-2xl font-bold', montserrat.className)}>Velora</h1>
            </Link>
            <div className='space-y-1'>
                    {routes.map((routes) => (
                        <Link href={routes.href}
                         key={routes.href}
                         className={cn('text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-[#121212] hover:bg-white rounded-lg transition', pathname === routes.href ? "text-[#121212] bg-white" : "text-zinc-300")}>

                            <div className='flex items-center flex-1'>
                               <routes.icon className={cn('h-6 w-6 mr-3 ml-1', routes.color)}/>
                               {routes.label}
                            </div>
                         </Link>
                    ))}
            </div>
        </div> 
    </div>
  )
}

export default Sidebar