
import { LucideIcon } from 'lucide-react';
import React from 'react'
interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;

}

const Heading = ({

      title,
      description,
     
}: HeadingProps) => {
  return (
    
    <div className='px-4 lg:px-8 flex items-center justify-center gap-x-3 mb-8 '>
       {/* <div className={cn("p-2 w-fit rounded-md", bgColor)}>
         <Icon className={cn('w-10 h-10', iconColor)}/>
       </div> */}
       <div>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
         {title}
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center mt-3'>
            {description}
        </p>
    </div>
    </div>
    
   
  )
}

export default Heading
