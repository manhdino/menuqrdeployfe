import BottomNav from '@/app/guest/components/bottom-nav'
import Header from './components/header'

export default function GuestLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <div className="flex">
        <main className="flex-1 bg-gray-100">{children}</main>
      </div>
      <BottomNav />
    </div >
  )
}
