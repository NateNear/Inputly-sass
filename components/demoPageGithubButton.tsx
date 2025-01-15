'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Github} from "lucide-react";

function DemoPageGithubButton() {
  return (
    <>
    <Button variant="outline" onClick={() => window.open('https://github.com/NateNear/inputly-sass', '_blank')}>
    <Github className="mr-2 h-4 w-4" />
    View on GitHub
</Button>
</>
  )
}

export default DemoPageGithubButton