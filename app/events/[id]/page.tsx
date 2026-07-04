'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { pastEvents } from '../data';
import notfound from "../../../public/images/notfound.png";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function EventDetailPage() {
  const {id} = useParams();
  const event = pastEvents?.find(event => event?.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 pb-10 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D2A679]/30">
            <div className="aspect-[16/9] sm:aspect-[16/7] relative">
              {event?.carousel?.length ? (
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop
                  effect="fade"
                  pagination={{
                    clickable: true,
                  }}
                  className="h-full w-full"
                >
                  {event.carousel.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`Slide ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Image
                  src={event?.img || notfound}
                  alt="Image not found"
                  fill
                  className="object-cover"
                  priority
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12 z-20">
              <span className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-[#D2A679]/20 text-[#D2A679] mb-2 sm:mb-4">
                Event
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
                {event?.city}
              </h1>

              <p className="text-white/75 text-sm sm:text-lg md:text-xl max-w-3xl">
                {event?.type}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Calendar size={18} sm-size={20} className="text-[#D2A679] flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs sm:text-sm">Date</p>
                <p className="font-medium text-sm sm:text-base">
                  {event?.date} {event?.month} {event?.year}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <MapPin size={18} sm-size={20} className="text-[#D2A679] flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs sm:text-sm">Location</p>
                <p className="font-medium text-sm sm:text-base">
                  {event?.city}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Users size={18} sm-size={20} className="text-[#D2A679] flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs sm:text-sm">Attendees</p>
                <p className="font-medium text-sm sm:text-base">
                  {event?.attendees}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 md:p-10 bg-white/[0.02]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              About The Event
            </h2>

            <p className="prose prose-invert max-w-none">
              {event?.description1}
            </p>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Featured Speakers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {event?.leaders?.map((speaker, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 hover:border-[#D2A679]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#D2A679]/20 flex items-center justify-center text-[#D2A679] font-bold shrink-0 text-sm sm:text-base">
                    {speaker?.name?.charAt(0)}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      {speaker?.name}
                    </h3>

                    <p className="text-white/50 text-xs sm:text-sm truncate">
                      {speaker?.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Event Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {event?.images?.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 group cursor-pointer"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {event?.description2 &&
        <section className="px-4 sm:px-6 mb-10 sm:mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 md:p-10 bg-white/[0.02]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#D2A679]">
              About GCC Circle
            </h2>
              <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm sm:text-base md:text-lg">
                <strong>GCC Circle</strong> is a leadership community powered by <strong>Talentiser</strong>, dedicated to bringing together the people shaping the future of Global Capability Centers in India.
              </p>
              <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm sm:text-base md:text-lg">
                Through executive roundtables, leadership forums, research, industry insights, and strategic partnerships, GCC Circle serves as a platform for senior leaders to exchange ideas, build meaningful relationships, and contribute to the continued evolution of India's GCC landscape.
              </p>
            </div>
          </div>
        </section>
      }

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 z-50 text-white text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <div
            className="w-screen h-screen flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={5}
              centerOnInit
              wheel={{ step: 0.2 }}
              doubleClick={{ mode: "zoomIn" }}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100vw",
                  height: "100vh",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-[90vw] max-h-[90vh] object-contain select-none"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </main>
  );
}
