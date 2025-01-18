// "use client";
// import { Card } from '@/components/ui/card';
// import { cn } from '@/lib/utils';
// import { ArrowRight, ImageIcon, MessageSquare, Settings, TableOfContentsIcon, VideoIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React from 'react'

// const tools =[
//   {
//     label: "Conversation",
//     icon: MessageSquare,
//     href: "/conversation",
//     color: "text-sky-500",
//     bgColor: "bg-sky-500/10"
//   },
//   {
//       label: "Creative Studio",
//       icon: ImageIcon,
//       href: "/creativestudio",
//       color: "text-yellow-500",
//     bgColor: "bg-yellow-500/10"
//   },
//   {
//       label: "Creative Media",
//       icon: VideoIcon,
//       href: "/creativemedia",
//       color: "text-green-500",
//     bgColor: "bg-green-500/10"
//   },
//   {
//       label: "Content Wizard",
//       icon: TableOfContentsIcon,
//       href: "/contentwizard",
//       color: "text-purple-500",
//     bgColor: "bg-purple-500/10"
//   }
// ]
// const DashboardPage = () => {
//   const router =useRouter();
  

//   return (
//     <div>
//     <div className='mb-8 space-y-4'>
//      <h2 className='text-2xl md:text-4xl font-bold text-center '>Unleash the Power of AI</h2>
//       <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
//       Unlock the limitless potential of AI to simplify and elevate your tasks.
//       </p>
//     </div>
//     <div className='px-4 md:px-20 lg:px-32 space-y-4'>
//      {tools.map((tools) => (
//        <Card 
//        onClick={() => router.push(tools.href)}
//        key={tools.href}
//        className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'>
//         <div className='flex items-center gap-x-4 '>
//            <div className={cn('p-2 w-fit rounded-md', tools.bgColor)}>
//              <tools.icon className={cn('w-8 h-8', tools.color)}/>
//            </div>
//            <div className='font-semibold'>
//               {tools.label}
//            </div>
//         </div>
//          <ArrowRight className='w-5 h-5'/>
//        </Card>
//      ))}
//     </div>
//     </div> 
    
//   )
// }

// export default DashboardPage

"use client";
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, AudioLines, Film, HistoryIcon,ImagePlay,Music,Video, } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const tools = [
    {
        label: "Youtube Shorts Generation",
        icon: Film,
        href: "/creative-media/shorts",
        color: "text-red-500",
        bgColor: "bg-red-500/10"
      }, 
  {
    label: "Video Generation",
    icon: Video,
    href: "/creative-media/video",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    label: "Image to Video Generation",
    icon: ImagePlay,
    href: "/creative-media/Image-to-Video",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/creative-media/music",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Text to Speach Generation",
    icon: AudioLines,
    href: "/creative-media/Speach",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    label: "History ",
    icon: HistoryIcon,
    href: "/creative-media/history",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

const CreativeMedia = () => {
  const router = useRouter();

  return (
    <div>
      <div className='mb-10 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Unleash Your Creativity with AI-Powered Media Tools</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
        Unlock your creative potential with AI-powered tools that simplify the technical side, allowing you to focus on crafting stunning visuals.
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 '>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className='p-6 border-black/20 flex items-center justify-between hover:shadow-lg transition cursor-pointer  mb-5'
            >
              <div className='flex items-center gap-x-4'>
                <div className={cn('p-4 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-10 h-10', tool.color)} />
                </div>
                <div className='font-semibold text-xl'>
                  {tool.label}
                </div>
              </div>
              <ArrowRight className='w-6 h-6' />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeMedia;
