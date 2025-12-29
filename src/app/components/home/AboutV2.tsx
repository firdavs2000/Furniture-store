import Image from "next/image";
import Button from "../ui/Button";

export default function About() {
    return (
        <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">

            {/* Chap taraf */}
            <div className="bg-[#2A254B] w-full h-[500px]  flex flex-col ">
                <h2 className="text-4xl text-[#FFFFFF] px-20 py-20 pb-6">It started with a small idea</h2>
                <p className="text-[#FFFFFF] pl-20 pr-20 ">
                    A global brand with local beginnings, our story began in a small studio in South London in early 2014
                </p>

                <Button
                    className=" cursor-pointer bg-[#4B4B6B] hover:bg-[#6C6CA0]   mt-50 px-6 py-3 rounded-md transition-all duration-300 w-[200px] mx-20 mt-6"
                />


            </div>


            
            <div className="w-full h-[500px]">
                <Image
                    src="/images/about.png"
                    alt="about"
                    width={600}
                    height={500}
                    className="rounded-xl object-cover w-full h-full"
                    loading="eager" // для LCP
                    priority
                />
            </div>

        </section>
    );
}
