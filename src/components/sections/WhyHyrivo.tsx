import Image from "next/image";

export default function WhyHyrivo() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Hyrivo?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Before */}
        <div className="relative group rounded-2xl overflow-hidden w-full h-80">
          <Image
            src="/sticky-notes-stress.jpg"
            alt="Messy spreadsheets and stress"
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:bg-black/60"></div>
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-xl font-semibold transition duration-500 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl">
              Spreadsheets, sticky notes,<br/>stress
            </p>
          </div>
        </div>

        {/* After */}
        <div className="relative group rounded-2xl overflow-hidden w-full h-80">
          <Image
            src="/dashboard-2.png"
            alt="Hyrivo dashboard"
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:bg-black/50"></div>
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-xl font-semibold transition duration-500 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl">
              One clean, organized <br/>dashboard
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
