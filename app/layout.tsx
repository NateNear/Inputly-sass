import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Header from '@/components/header'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { dark, neobrutalism } from '@clerk/themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 

{
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
      // signIn: { baseTheme: neobrutalism },
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}>
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