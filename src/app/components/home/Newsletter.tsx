import Image from "next/image";



export default function Newsletter() {
    return (
        <section className="relative py-24 overflow-hidden  flex justify-center">
            <div className="absolute inset-0 -z-10 ">
                <Image
                    src="/images/news.png"
                    alt="Newsletter Background"
                    fill
                    className="object-cover w-full h-full"
                    loading="eager" // для LCP
                    priority
                />
            </div>

            
            <div className="text-center max-w-lg w-full p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl  mb-4 text-[#FFFFFF]">Join the club and get the benefits</h2>
                <p className="text-[#FFFFFF] mb-6">
                    Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-gray-800">
                    <div className="flex items-center gap-2 text-[#FFFFFF]">
                        <span className="w-4 h-4 bg-white rounded-full "></span>
                        Exclusive offers
                    </div>
                    <div className="flex items-center gap-2 text-[#FFFFFF]">
                        <span className="w-4 h-4 bg-white rounded-full  "></span>
                        Free events
                    </div>
                    <div className="flex items-center gap-2 text-[#FFFFFF]"  >
                        <span className="w-4 h-4 bg-white rounded-full   "></span>
                        Large discounts
                    </div>
                </div>

                <form className="flex w-full sm:w-auto">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-4 border bg-[#F9F9F9] tetx-[Dark Primary]"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#2A254B] text-[#FFFFFF]"
                    >
                        Sign up
                    </button>
                </form>
            </div>

        </section>
    );
}

