'use client';


import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const offers = [
    {
        price: formatCurrency(145000),
        title: 'TODAY SPACIAL FOOD',
        desc: 'limits Time Offer',
        bg: '/images/offer/offerBG1.png',
        thumb: '/images/offer/offerThumb2.png',
    },
    {
        price: formatCurrency(156000),
        title: 'special chicken roll',
        desc: 'limits Time Offer',
        bg: '/images/offer/offerBG2.png',
        thumb: '/images/offer/offerThumb3.png',
    },
    {
        price: formatCurrency(126000),
        title: 'SPICY FRIED CHICKEN',
        desc: 'limits Time Offer',
        bg: '/images/offer/offerBG3.png',
        thumb: '/images/offer/offerThumb1.png',
    },
];

export default function Offers() {
    return (
        <section className="py-12">
            <div className="px-3 mx-8 h-[270px]">
                <div className="grid gap-[24px] md:grid-cols-2 xl:grid-cols-3 h-full">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className="relative h-full overflow-hidden bg-center bg-cover group"
                            style={{ backgroundImage: `url(${offer.bg})` }}
                        >
                            {/* Content */}
                            <div className="relative z-10 flex flex-col gap-12 pb-4 text-white ps-6 ">
                                <div className='flex flex-col justify-center gap-[6px]'>
                                    <h6 className="text-xs font-semibold uppercase mt-[63px]">
                                        chỉ với {offer.price}
                                    </h6>
                                    <h3 className="text-2xl font-bold uppercase">{offer.title}</h3>
                                    <p className='text-xs font-extrabold'>{offer.desc}</p>
                                </div>
                                <Link
                                    href="/menu"
                                    className={`w-[136px] text-sm py-[13px] px-[25px] text-white ${index > 0 ? 'bg-[#EB0029]' : 'bg-[#fc791a]'
                                        }`}
                                >
                                    ORDER NOW
                                </Link>
                            </div>

                            {/* Thumbnail */}
                            <div className="absolute right-4 bottom-4 w-[140px] md:w-[180px] lg:w-[220px]">
                                <Image
                                    src={offer.thumb}
                                    alt={offer.title}
                                    width={276}
                                    height={260}
                                    className="object-contain w-full"
                                />
                            </div>

                            {/* Floating shape (optional) */}
                            <div className="absolute left-1/2 top-4 animate-float-x">
                                <Image
                                    src="/images/offer/offerShape4.png"
                                    alt="shape"
                                    width={69}
                                    height={82}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
