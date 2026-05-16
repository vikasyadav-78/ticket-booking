
export default function Banners({ url, url2, text, reverse = false }) {
    return (
        <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 lg:gap-20`} >
                <div className="relative w-full md:w-1/2 h-[320px] sm:h-[420px] md:h-[500px]">
                    <div className="absolute left-0 bottom-0 z-10 shadow-2xl floatUpDown">
                        <img src={url} alt="Banner" className="w-48 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-52 md:h-64 lg:h-72 object-cover border-4 md:border-8 border-white rounded-xl" />
                    </div>
                    <div className="absolute right-0 top-0 md:left-24 md:bottom-24 md:top-auto z-20 shadow-2xl floatUpDown2">
                        <img src={url2} alt="Banner Secondary" className="w-48 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-52 md:h-64 lg:h-72 object-cover border-4 md:border-8 border-white rounded-xl" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-black">
                    <div className="flex items-start gap-3 md:gap-4 max-w-2xl">
                        <div className="w-2 sm:w-3 md:w-2 h-16 md:h-15 bg-yellow-400 rounded-full shrink-0"></div>
                        <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl leading-relaxed font-light">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};