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
import { ModeToggle } from './dark-mode'
import { CreateProject } from '@/components/createProject'

interface HeaderButtonsProps {
    isDashboard: boolean;
    subscription: string; 
    projectCount: number; 
}

export function HeaderButtons({ isDashboard, subscription, projectCount }: HeaderButtonsProps) {
    console.log("dashboard", isDashboard, subscription, projectCount)
    return (
        <div className='flex items-center gap-2 sm:gap-4'>
            <ModeToggle/>
            {isDashboard && (
                <CreateProject 
                    subscription={{ plan: subscription }}
                    projectCount={projectCount}
                />
            )}
            <SignedOut>
                <SignInButton>
                    <Button variant="outline" className="sm:inline-flex">Log in</Button>
                </SignInButton>
                <SignUpButton>
                    <Button className="sm:inline-flex">Sign up</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}