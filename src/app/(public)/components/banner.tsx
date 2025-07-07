'use client';
import Image from 'next/image';
import Link from 'next/link';

const shapes = [
    {
        src: '/images/banner/bannerShape1.svg',
        alt: 'shape1',
        width: 288,
        height: 181,
        className: 'left-2 top-8 animate-float-x',
    },
    {
        src: '/images/banner/bannerShape2.svg',
        alt: 'shape2',
        width: 156,
        height: 253,
        className: 'left-0 bottom-8 animate-float-y',
    },
    {
        src: '/images/banner/bannerShape3.svg',
        alt: 'shape3',
        width: 300,
        height: 180,
        className: 'bottom-0 left-1/3',
    },
    {
        src: '/images/banner/bannerShape4.svg',
        alt: 'shape4',
        width: 189,
        height: 214,
        className: 'right-12 top-8 animate-float-x',
    },
    {
        src: '/images/banner/bannerShape5.svg',
        alt: 'shape5',
        width: 143,
        height: 160,
        className: 'right-2 bottom-8 animate-float-y',
    },
];

export default function Banner() {
    return (
        <section className="relative z-10 w-full overflow-hidden bg-black bg-center bg-no-repeat bg-cover">
            {/* Floating shapes */}
            {shapes.map(({ src, alt, width, height, className }, index) => (
                <div key={index} className={`absolute z-10 hidden 2xl:block ${className}`}>
                    <Image src={src} alt={alt} width={width} height={height} />
                </div>
            ))}

            {/* Background overlay */}
            <div className="absolute inset-0 z-0 bg-black">
                <Image src="/images/banner/overlay.jpg" alt="background" fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="relative z-10 py-20 lg:py-32">
                <div className="container grid items-center grid-cols-1 gap-10 px-4 mx-auto xl:grid-cols-2">
                    <div>
                        <h6 className="text-[#fc791a] text-xl font-bold mb-2 uppercase italic">welcome to fresheat</h6>
                        <h1 className="mb-6 text-4xl font-bold text-white md:text-8xl">SPICY FRIED CHICKEN</h1>
                        <Link
                            href="/menu"
                            className="relative overflow-hidden w-[130px] group text-sm py-[13px] px-[25px] flex gap-2 items-center z-10 bg-[#EB0029]"
                        >
                            <span className="relative z-10 flex items-center gap-3 text-white uppercase">
                                order now
                            </span>
                            <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                            <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                        </Link>
                    </div>

                    <div className="hidden xl:block">
                        <Image
                            src="/images/banner/bannerThumb.png"
                            alt="banner-thumb"
                            width={650}
                            height={450}
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
