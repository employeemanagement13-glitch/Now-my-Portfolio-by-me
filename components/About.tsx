import { AsteriskIcon } from "./Experience";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section relative">
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-120 h-120 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #c8102e 0%, #7a0018 50%, transparent 80%)",
        }}
      />
      <div className="w-[90%] mx-auto">
        {/* Responsive layout: image first on mobile, text first on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content (appears first on mobile, second on desktop) */}
          <div className="order-2 lg:order-1">
            {/* Small heading with icon */}
            <div className="flex items-center mb-2">
              <span className="text-white text-lg">I'm Shahzil Shahzad</span>
              <div className="ml-2 w-4 h-4 rounded-full bg-purple-500/30 flex items-center justify-center">
                <AsteriskIcon />
              </div>
            </div>

            {/* Main heading with proper line breaks */}
            <h1 className="mainheadingfont text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Hey, <br />I'm a system developer
            </h1>

            {/* First paragraph */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              with over 3 years of hands-on experience turning problems into practical, automated solutions.
              I've had the chance to work with teams to build real-world secure projects - each project pushing me to system development
              smarter, cleaner, and more meaningful experiences.
            </p>

            {/* Second paragraph */}
            <p className="text-gray-300 mb-8 leading-relaxed">
              I love this, and I'm always exploring new ways to blend creative development with secure edge solutions. Whether it's cloud, saas or automation - I'm all in.
            </p>
          </div>

          {/* Profile Image (appears second on mobile, first on desktop) */}
          <div className="order-1 lg:order-2 flex justify-end">
            <div className="w-full max-w-100 aspect-3/4 sm:h-145 relative">
              {/* Gradient spot behind the profile image - centered on all screen sizes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-linear-to-r from-[#da1628] to-[#a0092a] blur-2xl"></div>
              </div>

              <div className="absolute inset-0 rounded-2xl overflow-hidden border-x border-t border-b-0 border-white/10">
                <Image
                  src="/shahzil.png"
                  alt="Shahzil Shahzad - Full Stack Developer Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile device frame */}
              <div className="absolute inset-0 border-x-[0.1px] border-t-2 border-b-0 rounded-tr-3xl rounded-tl-3xl border-white"></div>

              {/* Available as freelancer badge */}
              {/* <div className="absolute top-8 left-1/2 transform -translate-x-1/2 px-3.5 py-1.5 bg-green-500/20 rounded-full text-xs text-green-300 flex items-center w-max">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>Available as freelancer
              </div> */}

              <div className="absolute top-4 left-1/2 transform rounded-4xl -translate-x-1/2 h-1 flex bg-gray-300 items-center w-8">

              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* First Stat Card - Purple Gradient */}
          <div className="rounded-3xl px-6 py-8 bg-[linear-gradient(135deg,#621629_0%,#1c1223_100%)] border border-none flex items-center">
            <div>

              <div className="text-5xl font-bold text-white mb-2">3+</div>
              <div className="text-lg text-gray-300 font-medium">Years of experience in development and designing</div>
            </div>
          </div>

          {/* Second Stat Card - Image Background */}
          <div className="rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0">
              <Image
                src="/teams.jpeg"
                alt="Development team collaboration"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-dark/70 to-dark/40" />
            </div>
            <div className="">

              <div className="relative z-10 text-5xl font-bold text-white mb-2">20+</div>
              <div className="relative z-10 text-lg text-gray-300 font-medium">Projects shipped</div>
            </div>
          </div>

          {/* Third Stat Card - Orange Gradient with dot pattern */}
          <div className="rounded-2xl p-6 bg-[linear-gradient(90deg,#7b320d_0%,#483b0e_100%)] flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <div className="text-5xl font-bold text-white mb-2">84%</div>
              <div className="text-lg text-gray-300 font-medium">Client satisfaction rate built on trust and results.</div>
            </div>

            {/* Dot pattern image on the right */}
            <div className="w-20 h-20 block max-md:hidden sm:w-[30%] sm:h-full shrink-0 relative">
              <Image
                src="/dots.png"
                alt="Dot pattern decorative background"
                fill
                sizes="(max-width: 768px) 100px, 30vw"
                className="w-full h-full object-contain opacity-50 sm:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
