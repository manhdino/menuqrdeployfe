import Image from 'next/image';

const testimonial = {
    text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    image: '/images/testimonial/testimonial1.png',
};

export default function Testimonial() {
    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col gap-10 xl:flex-row xl:gap-20">
                    {/* Left: Text + Testimonial */}
                    <div className="order-2 space-y-8 xl:w-2/3 xl:order-1">
                        <div className="pb-12 space-y-3 border-b border-b-gray-300">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/titleIcon.svg" alt="icon" width={20} height={20} />
                                <span className="text-base font-extrabold text-[#fc791a]">TESTIMONIALS</span>
                                <Image src="/icons/titleIcon.svg" alt="icon" width={20} height={20} />
                            </div>
                            <h2 className="w-2/3 text-5xl font-bold">
                                What Have Lots Of Happy
                                Customer Feedback
                            </h2>
                        </div>

                        <div className="relative p-6 pt-4 rounded-xl">
                            <div className="mb-4">
                                <Image
                                    src="/icons/quote.svg"
                                    alt="quote"
                                    width={50}
                                    height={37}
                                />
                            </div>
                            <p className="mb-6 text-lg text-gray-700">{testimonial.text}</p>
                            <div className="flex items-center gap-20">
                                <div className='flex items-center gap-4'>
                                    <Image
                                        src={testimonial.image}
                                        alt="Customer"
                                        width={81}
                                        height={89}
                                        className="object-cover rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">Richard McClintock</p>
                                        <p className="text-sm text-gray-500">Customer</p>
                                    </div>
                                </div>
                                <div className="w-1/3 border-b-2 border-gray-300" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="order-1 xl:w-1/3 xl:order-2">
                        <Image
                            src="/images/testimonial/testimonial2.png"
                            alt="Testimonial Illustration"
                            width={561}
                            height={547}
                            className="object-contain rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
