"use client";

import BookNowBtn from "@/components/ui/BookNowBtn";
import Banners from "@/components/Home/Banners"; 
import Link from "next/link";
import Image from "next/image";
import { usePlaces } from "@/lib/queries/usePlace";
import { mockPlaces } from "@/data/mockPlaces"; 
import PlacesSlider from "@/components/Home/PlacesSlider";

export default function Home() {
  const { data: places = [] } = usePlaces();
  const finalPlaces = places?.length > 2 ? places : mockPlaces; 

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="font-sans bg-[#003020] shadow-xl/30">
          <div className="relative h-[75vh] md:h-[90vh] overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
            <img
              src="https://www.agoda.com/wp-content/uploads/2024/05/Nahargarh-Fort-jaipur-india.jpg"
              alt="Jaipur"
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-[2px] flex items-center justify-center text-center px-4">
              <div className="max-w-5xl">
                <p className="text-gold tracking-[6px] uppercase text-xs sm:text-sm mb-6 font-bold">
                  Royal Heritage of Rajasthan
                </p>
                <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-serif tracking-wide leading-tight drop-shadow-2xl">
                  Discover Jaipur's
                  Hidden Natural Treasure
                </h1>
                <p className="mt-8 text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  Explore timeless forts, majestic palaces, and breathtaking
                  desert landscapes woven deeply into Rajasthan's royal history.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center px-4">
            <div className="w-full sm:w-11/12 md:w-4/5 bg-gradient-to-r from-[#D4AF37] to-[#f5d67b] rounded-[28px] backdrop-blur-xl border border-white/20 px-4 sm:px-6 md:px-10 py-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 -mt-20 z-30">
              <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-12 w-full">
                <div className="flex flex-col">
                  <span className="font-bold text-royal-blue uppercase tracking-widest text-xs">
                    📍 Location
                  </span>
                  <span className="text-royal-blue font-semibold mt-1">
                    Jaipur Heritage
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-royal-blue uppercase tracking-widest text-xs">
                    Timings
                  </span>

                  <span className="text-royal-blue font-semibold mt-1">
                    5:00 AM - 8:00 PM
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-royal-blue uppercase tracking-widest text-xs">
                    Royal Experience
                  </span>

                  <span className="text-royal-blue font-semibold mt-1">
                    Premium Heritage Access
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <Link href={finalPlaces?.[0] ? `/book-tickets/${finalPlaces[0]?.id || finalPlaces[0]?._id}` : "#"}
                  className="inline-flex w-full md:w-auto" >
                  <BookNowBtn
                    addClass="w-full md:w-auto bg-royal-blue text-white border-none hover:bg-jaipur-dark hover:scale-105 transition-all duration-500 shadow-xl"
                    hasClass="white"
                    title="Book Now"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-32 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="text-center mb-16">
            <p className="text-jaipur-pink uppercase tracking-[6px] text-xs font-bold">
              Royal Destinations
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-royal-blue mt-4">
              Explore Jaipur Heritage
            </h2>
          </div>
          <PlacesSlider finalPlaces={finalPlaces} />
        </section>


        <div className="mt-28 px-4 sm:px-6 md:px-10 lg:px-20 flex justify-end">
          <div className="text-right max-w-3xl">
            <p className="font-serif font-bold text-3xl sm:text-4xl md:text-4xl leading-tight text-royal-blue">
              Bringing the Desert Wilderness
              Closer to the People of Jaipur
            </p>

            <p className="mt-8 text-base sm:text-lg md:text-xl leading-[2] text-black/75">
              Inspired by the raw beauty of the Aravalli landscape, the Kishan Bagh Sand Dunes Park offers a stunning ecological retreat at the foot of Nahargarh hills. Elevated walkways, golden dunes, and native vegetation together create a timeless desert experience unlike
              any other in Rajasthan.
            </p>
          </div>
        </div>

        <Banners
          url="https://assets.cntraveller.in/photos/66a9ce9ba5fa5da03ea872ba/master/w_1600%2Cc_limit/GettyImages-1503371454.jpg"
          url2="https://www.world-unite.de/cache/thumbs/53641aa167837b9f5cad1aafec899ffc.jpg"
          text="Step onto a timeless balcony framed by intricate arches, and take in breathtaking views of the historic city below."
        />

        <Banners
          reverse={true}
          url="https://www.andbeyond.com/wp-content/uploads/sites/5/Amber-fort-jaipur-Rajasthan-India.jpg"
          url2="https://i.pinimg.com/736x/28/71/a5/2871a58198e0bb9bda1abb5a419c42e6.jpg"
          text="From glowing palace walls to ancient mountain peaks — these golden landmarks capture the royal soul and timeless beauty of Rajasthan."
        />

        <Banners
          url="https://www.ethnicrajasthan.com/cdn/shop/articles/thumbnail_IMG_4908.jpg?v=1567068228&width=2048"
          url2="https://www.bizevdeyokuz.com/wp-content/uploads/jaipur-hindistan-duygu.jpg"
          text="Step through majestic pink gateways and ornate marble arches to discover a world where royal history and breathtaking architecture meet."
        />

        <Banners
          reverse={true}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcOApDEmsmhqUe1DGhut0ydTlOAxxXt4Sog&s"
          url2="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/c3/4a.jpg"
          text="The golden sandstone of Amer and the pink glow of the City Palace come alive, offering a breathtaking glimpse into timeless grandeur."
        />

        <div className="mt-32 mb-16 px-4 sm:px-6 md:px-10 lg:px-20 flex justify-start">
          <div className="max-w-3xl">
            <p className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-royal-blue">
              Discover the Royal Charm of Jaipur
            </p>

            <p className="mt-8 text-base sm:text-lg md:text-xl leading-[2] text-black/75">
              Jaipur, famously known as the Pink City of India,
              is a mesmerizing blend of heritage, culture,
              architecture, and royal hospitality. Every fort,
              palace, and bustling bazaar tells stories of kings,
              warriors, and timeless traditions that continue to
              inspire travelers from around the world.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-b from-[#08203e] to-[#0b2149] p-6 md:p-10">
          <Image
            src="/images/theJaipurCity.png"
            alt="Jaipur View"
            width={2000}
            height={300}
            className="w-full h-[220px] sm:h-[300px] md:h-[300px] object-cover rounded-[40px] shadow-2xl"
          />
        </div>
      </section>

    </>
  );
}