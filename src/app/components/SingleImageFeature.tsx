import React from 'react';
import Image from 'next/image';
import Logo from './icons/Logo';

const SingleImageFeature: React.FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Grid */}
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-24">
        <div className="relative mx-auto md:mx-0 max-w-md md:max-w-full">
        <div className="aspect-[3/4] w-full relative">
  <Image
    className="rounded-lg shadow-lg object-cover"
    src="/assets/img/landing-page-assets/dweloo-boy-on-the-floor-playing.webp"
    alt="Child playing on newly renovated floor"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    priority
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <Logo
      color='#fff'
      className="opacity-60 w-1/2 h-1/2" 
    />
    <p className="text-white opacity-60 mt-0 text-3xl font-bold tracking-wider text-center">
      Home Improvement Made Easy.
    </p>
  </div>
</div>
        </div>
        {/* End Col */}
        <div className="mt-8 md:mt-0">
          <div className="space-y-6 sm:space-y-8">
            {/* Title */}
            <div className="space-y-3 md:space-y-4">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
              Stress-free from start to finish
              </h2>
              <p className="text-lg text-gray-600">
              One point of contact, constant updates, and zero mysteries
              </p>
            </div>
            {/* End Title */}
            {/* List */}
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex gap-x-4">
                <span className="mt-0.5 flex-shrink-0 size-6 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-base font-medium text-gray-800">
                    No more contractor ghosting
                  </span>
                  <p className="mt-1 text-gray-600">
                    We show up when we say we will—every time, no excuses
                  </p>
                </div>
              </li>
              <li className="flex gap-x-4">
                <span className="mt-0.5 flex-shrink-0 size-6 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-base font-medium text-gray-800">
                    Zero budget surprises
                  </span>
                  <p className="mt-1 text-gray-600">
                    The price we quote is the price you pay—guaranteed
                  </p>
                </div>
              </li>
              <li className="flex gap-x-4">
                <span className="mt-0.5 flex-shrink-0 size-6 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="grow">
                  <span className="text-base font-medium text-gray-800">
                    Lifetime craftmanship guarantee
                  </span>
                  <p className="mt-1 text-gray-600">
                  Our promise is backed by a lifetime warranty guarantee                 </p>
                </div>
              </li>
            </ul>
            {/* End List */}
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default SingleImageFeature;