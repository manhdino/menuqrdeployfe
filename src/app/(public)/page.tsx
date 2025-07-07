import Banner from './components/banner'
import Offers from './components/offer'
import TextMarquee from './components/text-marquee'
import Cta from './components/cta'
import Testimonial from './components/testimonial'
import AboutSection from './components/about-us'
import ContactSection from './components/contact'
import Dishes from './components/dishes'
import { DishListResType } from '@/validations/dish.schema'
import dishApiRequest from '@/requests/dish'
import { Button } from '@/components/ui/button'


export default async function Home() {
  let dishList: DishListResType['data'] = []
  try {
    const result = await dishApiRequest.list()
    const {
      payload: { data }
    } = result
    dishList = data

  } catch (error) {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center">
            <h1 className="mb-4 font-extrabold tracking-tight text-[#fc791a] text-7xl lg:text-9xl">404</h1>
            <p className="mb-4 text-3xl font-bold text-gray-600">Đã xảy ra sự cố!</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu.</p>
            <a href='/' className=" text-white bg-[#fc791a] hover:bg-orange-700  focus:outline-none ont-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4">
              Quay lại Trang chủ
            </a>
          </div>
        </div>
      </section>
    )
  }
  return (
    <>
      <Banner />
      <Offers />
      <AboutSection />
      <TextMarquee />
      <Dishes data={dishList} />
      <Cta />
      <Testimonial />
      <ContactSection />
    </>
  )
}
