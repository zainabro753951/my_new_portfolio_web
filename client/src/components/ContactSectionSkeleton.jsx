import React from 'react'

const ContactSectionSkeleton = () => {
  return (
    <section className="w-full h-full bg-theme-dark text-white relative bg-circut overflow-hidden animate-pulse">
      {/* ✅ Background Glows (Skeleton Version) */}
      <div className="absolute inset-0 overflow-hidden bg-theme-dark/70">
        <div className="md:w-[20vw] md:h-[20vw] sm:w-[40vw] sm:h-[40vw] rounded-full bg-theme-purple/20 blur-3xl absolute md:-left-20 md:-bottom-20" />
        <div className="md:w-[20vw] md:h-[20vw] sm:w-[40vw] sm:h-[40vw] rounded-full bg-theme-cyan/20 blur-3xl absolute md:-right-20 md:-top-20" />
      </div>

      {/* ✅ Content Wrapper */}
      <div className="relative z-10 w-full h-full md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] flex flex-col md:gap-[4vw] sm:gap-[5vw] xs:gap-[6vw]">
        {/* ---------- Heading ---------- */}
        <div className="mx-auto w-[40%] h-[3vw] sm:h-[5vw] xs:h-[8vw] bg-gray-700 rounded-lg" />

        <div className="grid md:grid-cols-2 xs:grid-cols-1 md:gap-[5vw] sm:gap-[10vw] xs:gap-[15vw] mt-[2vw]">
          {/* ---------- LEFT ---------- */}
          <div className="flex flex-col gap-[2vw]">
            {/* Text Blocks */}
            <div className="w-[30%] h-[2vw] sm:h-[3vw] xs:h-[5vw] bg-gray-700 rounded-lg" />
            <div className="w-[75%] h-[4vw] sm:h-[7vw] xs:h-[12vw] bg-gray-800 rounded-lg" />

            {/* Contact Details */}
            <div className="mt-[1vw]">
              <div className="w-[40%] h-[2.5vw] sm:h-[3.5vw] xs:h-[5.5vw] bg-gray-700 rounded-lg mb-[1vw]" />

              <div className="flex flex-col gap-[1vw]">
                <div className="flex items-center gap-[1.5vw]">
                  <div className="md:w-[2vw] md:h-[2vw] sm:w-[3vw] sm:h-[3vw] xs:w-[5vw] xs:h-[5vw] bg-gray-700 rounded-full" />
                  <div className="w-[35%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-800 rounded" />
                </div>

                <div className="flex items-center gap-[1.5vw]">
                  <div className="md:w-[2vw] md:h-[2vw] sm:w-[3vw] sm:h-[3vw] xs:w-[5vw] xs:h-[5vw] bg-gray-700 rounded-full" />
                  <div className="w-[35%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-800 rounded" />
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <div className="w-[40%] h-[2.5vw] sm:h-[3.5vw] xs:h-[5.5vw] bg-gray-700 rounded-lg mb-[1vw]" />

              <div className="flex items-center gap-[1.5vw]">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="md:w-[2.5vw] md:h-[2.5vw] sm:w-[3.5vw] sm:h-[3.5vw] xs:w-[5.5vw] xs:h-[5.5vw] bg-gray-800 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---------- RIGHT (FORM SKELETON) ---------- */}
          <div className="w-full h-full">
            <div className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] gradient-button rounded-[1vw] w-full h-full opacity-50">
              <div className="w-full h-full md:p-[2vw] sm:p-[2.5vw] xs:p-[3vw] bg-theme-dark rounded-[1vw] flex flex-col gap-[1.5vw]">
                {/* Form Title */}
                <div className="w-[40%] h-[2vw] sm:h-[3vw] xs:h-[5vw] bg-gray-700 rounded-lg" />

                {/* Full Name Field */}
                <div className="flex flex-col gap-[1vw]">
                  <div className="w-[30%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-700 rounded" />
                  <div className="w-full h-[3vw] sm:h-[5vw] xs:h-[8vw] bg-gray-800 rounded" />
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-[1vw]">
                  <div className="w-[30%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-700 rounded" />
                  <div className="w-full h-[3vw] sm:h-[5vw] xs:h-[8vw] bg-gray-800 rounded" />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-[1vw]">
                  <div className="w-[30%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-700 rounded" />
                  <div className="w-full h-[3vw] sm:h-[5vw] xs:h-[8vw] bg-gray-800 rounded" />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-[1vw]">
                  <div className="w-[40%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-700 rounded" />
                  <div className="w-full h-[7vw] sm:h-[10vw] xs:h-[18vw] bg-gray-800 rounded" />
                </div>

                {/* Button */}
                <div className="w-[35%] h-[3vw] sm:h-[5vw] xs:h-[8vw] bg-theme-cyan/40 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSectionSkeleton
