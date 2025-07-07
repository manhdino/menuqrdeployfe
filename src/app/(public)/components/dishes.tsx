import { formatCurrency } from '@/lib/utils';
import { DishListResType } from '@/validations/dish.schema';
import Image from 'next/image';

type DishesProps = {
    data: DishListResType['data'],

}
export default function Dishes({ data }: DishesProps) {
    return (
        <section className="px-[44px] pb-16 mt-12" id="menu">
            <div className="px-20 py-16 bg-white rounded-2xl ">
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium delay-500 text-primary animate-fadeInUp">
                        <Image src="/icons/titleIcon.svg" alt="icon" width={20} height={20} />
                        <span className='text-2xl uppercase text-[#fc791a] font-extrabold'>Menu Quán</span>
                        <Image src="/icons/titleIcon.svg" alt="icon" width={20} height={20} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
                    <div className="flex justify-center">
                        <ul className="flex flex-col w-full gap-4 px-6">
                            {data.slice(0, 5).map((item, index) => (
                                <li key={item.id}>
                                    <div className="flex items-center justify-between p-4 rounded-md hover:bg-gray-100">
                                        <div className='flex items-center gap-4'>
                                            <Image src={item.image} alt="img" width={95} height={95} />
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold">{item.name}</h3>
                                                <Image src="/icons/rating.svg" alt="rating" width={86} height={16} />
                                                <div className='mt-1 w-[84%]'>
                                                    <span className='text-[13px]'>{item.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="text-lg font-bold">{formatCurrency(item.price)}</h6>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <Image src="/images/popular-dish/menuThumb.png" alt="thumb" width={552} height={0} className='h-full' />
                    </div>

                    <div className="flex justify-center">
                        <ul className="flex flex-col w-full gap-4 px-6">
                            {data.slice(5,).map((item, index) => (
                                <li key={item.id}>
                                    <div className="flex items-center justify-between p-4 rounded-md hover:bg-gray-100">
                                        <div className='flex items-center gap-4'>
                                            <Image src={item.image} alt="img" width={95} height={95} />
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold">{item.name}</h3>
                                                <Image src="/icons/rating.svg" alt="rating" width={86} height={16} />
                                                <div className='mt-1 w-[84%]'>
                                                    <span className='text-[13px]'>{item.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="text-lg font-bold">{formatCurrency(item.price)}</h6>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}


