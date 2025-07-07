export default function TextMarquee() {
    const items = [
        'PHỞ BÒ',
        'BÁNH MÌ',
        'BÚN CHẢ',
        'GỎI CUỐN',
        'CƠM TẤM',
        'BÁNH XÈO',
        'CHẢ GIÒ',
    ]

    return (
        <div className="py-4 mt-3 overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
                {[...items, ...items].map((item, index) => (
                    <span
                        key={index}
                        className="inline-block font-semibold hover:text-[#eb0029] hover:underline text-7xl text-[#bcb8b1] uppercase mx-6"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
}
