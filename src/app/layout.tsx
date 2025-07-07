
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from 'react-hot-toast';
import AppProvider from '@/components/common/app-provider'
import NextTopLoader from 'nextjs-toploader'
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
  }>
) {

  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          roboto.variable
        )}
      >
        <NextTopLoader showSpinner={false} color='orange' height={4} />
        <AppProvider>
          {children}
          <Toaster position='top-center' />
        </AppProvider>
      </body>
    </html>
  )
}
