import Header from './components/header'
import Footer from './components/footer'

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  const { children } = props
  return (
    <>
      <Header />
      <div className="flex flex-col bg-gray-100 mt-0 md:mt-32">
        {children}
      </div>
      <Footer />
    </>
  )
}
