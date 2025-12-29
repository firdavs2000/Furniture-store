import Image from "next/image";

export default function JoinClubSection() {
  return (
    <section className="bg-gray-50 py-10 ">
      <div className="w-full flex flex-col md:flex-row items-center">
        
        {/* Chap tomondagi rasm */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Image
            src="/join.png"
            alt="Club Image"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

  
        <div className=" md:w-1/2 md:text-left px-6 md:px-12 mt-6 md:mt-0">
          <h3 className="text-3xl mb-4 ">
            Join the club and get the benefits
          </h3>
          <p className="text-[#2A254B] mb-6">
            Sign up for exclusive offers, product launches, and inspiration.
          </p>

      
          <form className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md bg-[#F9F9F9] text-[#2A254B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#2A254B] text-white rounded-md hover:bg-[#3a3360] transition"
            >
              Sign up
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
