import Image from 'next/image'

export default function Design1() {
  return (
    <div className="flex max-w-full mx-auto border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 flex-grow flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <Image
          src="/placeholder.svg?height=40&width=40"
          alt="Algolia Logo"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0"
        />
        <div className="min-w-0 flex-grow">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">Algolia</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 truncate">
            A developer-friendly and enterprise-grade search API.
          </p>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 truncate max-w-full mt-1 sm:mt-2">
            ENGINEERING, PRODUCT AND DESIGN
          </span>
        </div>
      </div>
      <div className="bg-gray-100 p-2 sm:p-3 md:p-4 lg:p-6 flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">$200K</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">REVENUE/MO</p>
        </div>
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">2</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">FOUNDERS</p>
        </div>
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">80</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">EMPLOYEES</p>
        </div>
      </div>
    </div>
  )
}