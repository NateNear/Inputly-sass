"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
} from '@clerk/nextjs'
import { usePathname } from "next/navigation";
import { ModeToggle } from './dark-mode'
import HeaderLogo from './headerLogo'
import { CreateProject } from '@/components/createProject'


function Header() {
    const pathname = usePathname();

    const isDashboard = pathname === "/dashboard";
    return (
        <>
            <header className='flex justify-center pt-5 px-4 w-full'>
                <div 
                    className='rounded-full flex items-center justify-between px-4 sm:px-6 w-full 
                    sm:w-[90%] md:w-[85%] h-16 border-2 border-t-[1px] shadow-lg 
                    transition-transform transform hover:scale-102 hover:shadow-md'
                >  
                    <HeaderLogo/>
                    <div className='flex items-center gap-2 sm:gap-4'>
                        <ModeToggle/>
                        {isDashboard && (
                            <CreateProject/>
                        )}
                        <SignedOut>
                            <SignInButton>
                                <Button variant="outline" className=" sm:inline-flex">Log in</Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className=" sm:inline-flex">Sign up</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header