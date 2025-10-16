import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import required modules
import { Pagination, Navigation } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const Testimonial = () => {
  const reviews = [
    {
      img: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-71643263-copy.jpg?crop=1xw:1.0xh;center,top&resize=640:*',
      clientName: 'Sophia Turner',
      designation: 'Project Manager at InnovateX',
      message:
        'Alex turned our vision into a smooth, responsive web app. His attention to detail and clean design impressed our entire team.',
    },
    {
      img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      clientName: 'David Johnson',
      designation: 'CEO of BrightWorks',
      message:
        'The dashboard Alex built was both powerful and intuitive. It simplified complex data into something our users love to explore.',
    },
    {
      img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      clientName: 'Emily Carter',
      designation: 'Marketing Head at FlowWave',
      message:
        'Our website’s new animations and transitions feel premium. Alex’s GSAP integration made everything look seamless and professional.',
    },
    {
      img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      clientName: 'James Walker',
      designation: 'CTO of NexaSoft',
      message:
        'Alex’s React expertise made a huge difference in our project. The performance optimization he implemented saved us time and cost.',
    },
  ]

  return (
    <div className="relative md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] bg-theme-purple/10 w-full text-white font-inter">
      <div className="md:max-w-[75%] mx-auto relative">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          className="w-[90%] md:w-[70%]"
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="gradient-button md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] ">
                <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[1.5vw] sm:gap-[2vw] xs:gap-[2.5vw]">
                  <p className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] text-gray-400">
                    {item.message}
                  </p>
                  <div className="flex items-center md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
                    <img
                      src={item.img}
                      alt={item.clientName}
                      className="md:w-[3.5vw] md:h-[3.5vw] sm:w-[5.5vw] sm:h-[5.5vw] xs:w-[7.5vw] xs:h-[7.5vw] rounded-full object-cover"
                    />
                    <div>
                      <h3 className="md:text-[1.2vw] sm:text-[2vw] xs:text-[4vw] font-semibold text-white">
                        {item.clientName}
                      </h3>
                      <p className="text-gray-500 md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw]">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 z-10">
          <button className="swiper-button-prev-custom bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-80 text-white md:p-[1vw] sm:p-[2vw] xs:p-[4vw] rounded-full shadow-lg">
            <FaChevronLeft />
          </button>
        </div>

        <div className="absolute right-[3%] top-1/2 -translate-y-1/2 z-10">
          <button className="swiper-button-next-custom bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-80 text-white md:p-[1vw] sm:p-[2vw] xs:p-[4vw] rounded-full shadow-lg">
            <FaChevronRight />
          </button>
        </div>

        {/* Custom Pagination */}
        <div className="custom-pagination flex justify-center md:gap-[1vw] sm:gap-[1.5vw] xs:gap-[2vw] md:mt-[3vw] sm:mt-[4vw] xs:mt-[5vw]"></div>

        {/* Pagination styles */}
        <style jsx global>{`
          .custom-bullet {
            width: 10px;
            height: 10px;
            background: #555;
            border-radius: 50%;
            transition: all 0.3s;
          }
          .custom-bullet-active {
            background: linear-gradient(90deg, #6a11cb, #2575fc);
            width: 12px;
            height: 12px;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Testimonial
