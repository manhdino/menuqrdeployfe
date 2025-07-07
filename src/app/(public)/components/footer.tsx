'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoIosMail, IoLogoLinkedin } from "react-icons/io";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { MoveRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative pt-10 overflow-hidden text-white bg-gray-900">

            <div className="container relative z-10 px-4 mx-auto md:py-16">
                <div className="grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-xl bg-[#fc791a] p-[50px] rounded-3xl hidden md:grid">
                    <div className="flex items-center space-x-4">
                        <FaMapMarkerAlt className='w-9 h-9 rounded-full bg-white text-[#fc791a] p-[9px]' />
                        <div>
                            <h6 className="text-sm font-semibold uppercase">Địa chỉ</h6>
                            <p>Trương Định - 546 Trương Định, Hai Bà Trưng, Hà Nội</p>
                        </div>
                    </div>
                    <div className="flex items-start justify-center space-x-4 md:justify-end">
                        <IoIosMail className='w-9 h-9 rounded-full bg-white text-[#fc791a] p-[8px]' />
                        <div>
                            <h6 className="text-sm font-semibold uppercase">Send Email</h6>
                            <p>fresheat@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start justify-center space-x-4 md:justify-end">
                        <FaPhoneAlt className='w-9 h-9 rounded-full bg-white text-[#fc791a] p-[8px]' />
                        <div>
                            <h6 className="text-sm font-semibold uppercase">Call Emergency</h6>
                            <p>+84 123 654 969</p>
                        </div>
                    </div>
                </div>

                {/* Main widgets */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo & Social */}
                    <div>
                        <Link href="/">
                            <Image src="/logo/logoWhite.svg" alt="Logo" width={167} height={58} />
                        </Link>
                        <p className="mt-4 text-base">Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur lacinia mollis</p>
                        <div className="flex mt-8 space-x-3 text-xl">
                            <FaFacebook className='w-9 h-9 p-[7px] border border-[#FFFFFF33] hover:bg-[#eb0029]' />
                            <FaTwitter className='w-9 h-9 p-[7px] border border-[#FFFFFF33] hover:bg-[#eb0029]' />
                            <IoLogoLinkedin className='w-9 h-9 p-[7px] border border-[#FFFFFF33] hover:bg-[#eb0029]' />
                            <FaYoutube className='w-9 h-9 p-[7px] border border-[#FFFFFF33] hover:bg-[#eb0029]' />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-2xl font-bold">Quick Links</h3>
                        <ul className="space-y-4 text-base font-semibold">
                            <li><Link href="/about" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />About Us</Link></li>
                            <li><Link href="/" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Our Gallery</Link></li>
                            <li><Link href="/" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Our Blogs</Link></li>
                            <li><Link href="/" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />FAQ’s</Link></li>
                            <li><Link href="/contact" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Our Menu */}
                    <div>
                        <h3 className="mb-4 text-2xl font-bold">Our Menu</h3>
                        <ul className="space-y-4 text-base font-semibold">
                            <li><Link href="/menu" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Burger King</Link></li>
                            <li><Link href="/menu" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Pizza King</Link></li>
                            <li><Link href="/menu" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Fresh Food</Link></li>
                            <li><Link href="/menu" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Vegetable</Link></li>
                            <li><Link href="/menu" className='flex items-center gap-2 hover:text-[#eb0029]'><AiOutlineDoubleRight />Desserts</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="mb-4 text-2xl font-bold">Contact Us</h3>
                        <ul className="text-base text-[#5c6574] mb-4">
                            <li className="mb-2">Monday – Friday: <span className="text-[#fc791a]">8am – 4pm</span></li>
                            <li>Saturday: <span className="text-[#fc791a]">8am – 12am</span></li>
                        </ul>
                        <form className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-4/5 p-3 py-4 rounded-md !bg-white text-black border border-gray-600 focus:outline-none"
                                    placeholder="Your email address"
                                />
                                <button type="submit" className="absolute left-[65%] top-1/2 transform -translate-y-1/2">
                                    <MoveRight
                                        className="w-9 h-9 rounded-sm bg-[#fc791a] p-[10px] text-white"
                                    />
                                </button>
                            </div>
                            <div className="flex items-start space-x-2 text-base">
                                <input id="checkbox" type="checkbox" className="mt-2" />
                                <label htmlFor="checkbox">
                                    I agree to the <Link href="#" className="underline">Privacy Policy</Link>.
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="border-t border-gray-700 py-6 mt-12 bg-[#eb0029]">
                <div className="container flex flex-col items-center justify-between px-4 mx-auto text-base md:flex-row">
                    <p>© All Copyright 2024 by <Link href="#" className="text-yellow-400">FreshEat</Link></p>
                    <ul className="hidden space-x-4 md:flex">
                        <li className='border border-[#FFFFFF80] p-2 hover:text-yellow-400'>Terms & Condition</li>
                        <li className='border border-[#FFFFFF80] p-2 hover:text-yellow-400'>Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
