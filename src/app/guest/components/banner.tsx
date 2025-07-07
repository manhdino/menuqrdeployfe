'use client';

import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
    return (
        <section className="relative w-full bg-cover bg-center bg-no-repeat bg-black overflow-hidden z-10">
            <div className=" absolute left-[40%] bottom-0 z-10">
                <Image
                    src="/bannerShape2_3.svg"
                    alt="shape3"
                    width={80}
                    height={60}
                />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black z-0">
                <Image
                    src="/overlay.jpg"
                    alt="background"
                    fill
                    className="object-cover"
                />
            </div>
            {/* Content */}
            <div className="relative z-10">
                <div className="mx-auto px-3 h-[210px] flex items-center">
                    <div className="flex w-full items-center justify-between text-left">
                        {/* Text content */}
                        <div className="flex flex-col items-left">
                            <h6 className="text-[#fc791a] text-xs font-bold mb-2 uppercase">
                                WELCOME FRESHEAT
                            </h6>
                            <h1 className="text-base md:text-8xl font-bold text-white mb-6">
                                SPICY FRIED CHICKEN
                            </h1>
                            <Link
                                href="/guest/menu"
                                className="relative overflow-hidden w-[100px] group text-[8px] py-[8px] px-[10px] flex gap-[2px] items-center justify-center z-10 bg-[#EB0029]"
                            >
                                <span className="relative z-10 text-white flex items-center gap-2">
                                    ORDER NOW
                                    <MoveRight className="w-4 h-4 bg-white py-[4px] px-[3px] text-[#EB0029]" />
                                </span>

                                {/* Top half animation */}
                                <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                                {/* Bottom half animation */}
                                <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                            </Link>
                        </div>

                        {/* Banner image */}
                        <div className="flex justify-center">
                            <Image
                                src="/bannerThumb2_1.png"
                                alt="banner-thumb"
                                width={120}
                                height={70}
                                className='animate-spin-slow'
                            />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
