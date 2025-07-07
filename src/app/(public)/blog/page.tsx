
import Image from "next/image";
import Breadcrumb from "../components/breadcrumb";

const blogs = [
    {
        id: 1,
        date: '15',
        month: 'Dec',
        author: 'Admin',
        tag: 'Noodles',
        title: 'Fast Food Frenzy a Taste of Convenience',
        img: '/images/blog/blog1.png',
        link: '/blog',
    },
    {
        id: 2,
        date: '15',
        month: 'Dec',
        author: 'Admin',
        tag: 'Noodles',
        title: 'Benefits of health and safety measures',
        img: '/images/blog/blog2.png',
        link: '/blog',
    },
    {
        id: 3,
        date: '15',
        month: 'Dec',
        author: 'Admin',
        tag: 'Noodles',
        title: 'Quick Cravings Unraveling Fast Food Delights',
        img: '/images/blog/blog3.png',
        link: '/blog',
    },
    {
        id: 4,
        date: '15',
        month: 'Dec',
        author: 'Admin',
        tag: 'Noodles',
        title: 'Fast Food Frenzy a Taste of Convenience',
        img: '/images/blog/blog4.png',
        link: '/blog',
    },
    {
        id: 5,
        date: '15',
        month: 'Dec',
        author: 'Admin',
        tag: 'Noodles',
        title: 'Benefits of health and safety measures',
        img: '/images/blog/blog5.png',
        link: '/blog',
    },
    {
        id: 6,
        date: '15',
        month: 'Dec',
        author: 'Admin',
        tag: 'Noodles',
        title: 'Quick Cravings Unraveling Fast Food Delights',
        img: '/images/blog/blog6.png',
        link: '/blog',
    },
];

export default function Blog() {

    return (
        <>
            <Breadcrumb title="Bài viết" />
            <section className="py-16 bg-gray-100">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-8 md:grid-cols-3">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="overflow-hidden transition-transform duration-300 bg-white hover:-translate-y-1"
                            >
                                <div className="relative w-full h-64">
                                    <Image
                                        src={blog.img}
                                        alt="blog"
                                      fill
                                         className="object-cover"
                                    />
                                </div>
                                <div className="p-[30px] bg-white">
                                    <div className="flex items-center mb-6 text-sm text-gray-500 gap-7">
                                        <div className="px-5 py-3 text-center text-white bg-red-500">
                                            <h6 className="text-xl font-bold">{blog.date}</h6>
                                            <p>{blog.month}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Image src="/icons/user.svg" width={20} height={20} alt="user" />
                                            <span className="font-semibold">{blog.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Image src="/icons/tag.svg" width={20} height={20} alt="tag" />
                                            <span className="font-semibold">{blog.tag}</span>
                                        </div>
                                    </div>
                                    <a href={blog.link}>
                                        <h3 className="text-2xl font-semibold hover:text-red-600 mb-[10px]">{blog.title}</h3>
                                    </a>
                                    <a
                                        href={blog.link}
                                        className="text-left"
                                    >
                                        <span className="text-[15px] font-semibold text-[#5c6574]">Read More</span>
                                        <i className="ml-2 fa-solid fa-arrow-right-long" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
