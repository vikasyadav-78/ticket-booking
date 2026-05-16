"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PlaceCard from "./PlaceCard";
export default function PlacesSlider({ finalPlaces }) {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            loop={true}
            speed={4000}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}

            breakpoints={{
                320: { slidesPerView: 1.2, },
                640: { slidesPerView: 2, },
                1024: { slidesPerView: 3, },
            }}
            className="w-full">

            {finalPlaces.map((place, index) => (
                <SwiperSlide key={index}>
                    <PlaceCard place={place} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}