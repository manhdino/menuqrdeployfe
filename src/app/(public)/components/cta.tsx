import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const shapes = [
    { src: '/images/cta/ctaShape1.png', alt: 'shape1', width: 101, height: 79, className: 'left-10 top-10 animate-float-x' },
    { src: '/images/cta/ctaShape2.png', alt: 'shape2', width: 189, height: 202, className: 'bottom-0 left-10 animate-float-y' },
    { src: '/images/cta/ctaShape3.png', alt: 'shape3', width: 212, height: 279, className: 'bottom-0 right-0 animate-float-y' },
    { src: '/images/cta/ctaShape4.png', alt: 'shape4', width: 144, height: 217, className: 'top-0 right-0' },
    { src: '/images/cta/ctaShape5.png', alt: 'shape5', width: 122, height: 92, className: 'bottom-0 left-[40%]' },
    { src: '/images/cta/ctaShape6.png', alt: 'shape6', width: 88, height: 67, className: 'left-[40%] bottom-[30%]' },
    { src: '/images/cta/ctaShape7.png', alt: 'shape7', width: 190, height: 190, className: 'left-[48%] top-1/3 animate-spin-slow' },
];

export default function Cta() {
    return (
        <section className="relative overflow-hidden h-[475px] mb-8 mt-12">
            {shapes.map(({ src, alt, width, height, className }, i) => (
                <div key={i} className={`absolute z-10 hidden 2xl:block ${className}`}>
                    <Image src={src} alt={alt} width={width} height={height} />
                </div>
            ))}

            <div className="absolute inset-0 z-0 bg-black">
                <Image src="/images/cta/ctaThumb2.png" alt="background" fill className="object-cover" />
            </div>

            <div className="container flex flex-col items-center justify-between gap-8 px-4 py-5 mx-auto xl:flex-row">
                <div className="z-10 order-2 space-y-4 text-center xl:text-left xl:w-1/2 xl:order-1">
                    <h6 className="text-[#eb0029] text-[22px] font-extrabold">WELCOME FRESHEAT</h6>
                    <h3 className="text-4xl font-bold text-white">TODAY SPECIAL FOOD</h3>
                    <p className="text-[#fc791a] text-2xl font-bold">Limited Time Offer</p>
                    <Link
                        href="/menu"
                        className="relative overflow-hidden w-[166px] group text-sm py-[13px] px-[25px] flex gap-2 items-center z-10 bg-[#EB0029]"
                    >
                        <span className="relative z-10 flex items-center gap-3 text-white">
                            ORDER NOW
                            <MoveRight className="w-6 h-[22px] bg-white py-[4px] px-[3px] text-[#EB0029]" />
                        </span>
                        <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                        <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                    </Link>
                </div>

                <div className="order-1 xl:order-2">
                    <Image
                        src="/images/cta/ctaThumb.png"
                        alt="CTA Thumb"
                        width={541}
                        height={475}
                        className="animate-float-x"
                    />
                </div>
            </div>
        </section>
    );
}
