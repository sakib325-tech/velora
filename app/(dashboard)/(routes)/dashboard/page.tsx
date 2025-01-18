"use client";
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Images, MessageCircle, MessageSquare, TableOfContentsIcon, TvMinimalPlay, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10"
  },
  {
    label: "Creative Studio",
    icon: Images,
    href: "/creative-studio",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    label: "Creative Media",
    icon: TvMinimalPlay,
    href: "/creative-media",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Content Wizard",
    icon: TableOfContentsIcon,
    href: "/content-wizard",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  }
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Unleash the Power of AI</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Unlock the limitless potential of AI to simplify and elevate your tasks.
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32'>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className='p-6 border-black/20 flex items-center justify-between hover:shadow-lg transition cursor-pointer mt-5'
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

export default DashboardPage;
