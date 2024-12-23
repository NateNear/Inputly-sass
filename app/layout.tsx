import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Header from '@/components/header'
import { ThemeProvider } from "@/components/ui/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 

{
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header/>
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}