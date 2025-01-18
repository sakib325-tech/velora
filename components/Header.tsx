import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat ({ weight: "600", subsets: ["latin"]});

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg bg-black">
      <div className="container mx-auto flex justify-between items-center">
      <Link href={'/'} className='flex items-center
            pl-3 '>
                <div className='relative w-9 h-9 mr-3 '>
                  <Image fill src={'/logo.png'} alt={'Logo'}/>
                </div>
                <h1 className={cn('text-2xl font-bold text-white', montserrat.className)}>Velora</h1>
            </Link>
        <nav className="hidden md:flex space-x-10">
          <Link href="#features" className="text-base font-medium text-white hover:text-blue-400">
            Features
          </Link>
          <Link href="#pricing" className="text-base font-medium text-white hover:text-blue-400">
            Pricing
          </Link>
         
        </nav>
        <div className="flex items-center">
          <Link href={"/sign-in"}>
          <Button variant="outline" className="mr-4 text-black hover:bg-blue-400 hover:text-white">
            Log in
          </Button>
          </Link>
          <Link href={"/sign-up"}>
          <Button className='bg-blue-400 hover:bg-white hover:text-black'>
            Sign up
          </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

