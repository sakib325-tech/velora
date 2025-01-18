"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { AlignLeft, } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) return null;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    {/* <Menu /> */}
                    <AlignLeft />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                {/* Add a visually hidden title for accessibility */}
                <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>

                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
