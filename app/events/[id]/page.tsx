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

export default function EventDetailPage() {
  const {id} = useParams();
  const event = pastEvents?.find(event => event?.id === id);
  console.log(event)
  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-[#D2A679]/30">
            <div className="aspect-[16/7] relative">
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

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
              <span className="inline-flex px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D2A679]/20 text-[#D2A679] mb-4">
                Event
              </span>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {event?.city}
              </h1>

              <p className="text-white/75 text-lg md:text-xl max-w-3xl">
                {event?.type}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Calendar
                size={20}
                className="text-[#D2A679]"
              />
              <div>
                <p className="text-white/50 text-sm">
                  Date
                </p>
                <p className="font-medium">
                  {event?.date} {event?.month} {event?.year}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                className="text-[#D2A679]"
              />
              <div>
                <p className="text-white/50 text-sm">
                  Location
                </p>
                <p className="font-medium">
                  {event?.city}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Users
                size={20}
                className="text-[#D2A679]"
              />
              <div>
                <p className="text-white/50 text-sm">
                  Speakers
                </p>
                <p className="font-medium">
                  {event?.leaders?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 p-8 md:p-10 bg-white/[0.02]">
            <h2 className="text-3xl font-bold mb-6">
              About The Event
            </h2>

            <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg">
              {event?.description1}
            </p>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Featured Speakers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event?.leaders?.map((speaker, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#D2A679]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D2A679]/20 flex items-center justify-center text-[#D2A679] font-bold shrink-0">
                    {speaker?.name?.charAt(0)}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">
                      {speaker?.name}
                    </h3>

                    <p className="text-white/50 text-sm">
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
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Event Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {event?.images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/10 group"
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
    </main>
  );
}