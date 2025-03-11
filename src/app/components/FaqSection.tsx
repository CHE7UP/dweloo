import React from "react";

const FaqSection: React.FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
        {/* Icon Block */}
        <a
          className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7"
          href="#"
        >
          <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
            <svg
              className="shrink-0 size-6 text-white"
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
              <rect width="10" height="14" x="3" y="8" rx="2" />
              <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
              <path d="M8 18h.01" />
            </svg>
          </div>
          <div className="mt-5">
            <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800">
              Responsive
            </h3>
            <p className="mt-1 text-gray-600">
              Responsive, and mobile-first project on the web
            </p>
            <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
              Learn more
              <svg
                className="shrink-0 size-4"
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
                <path d="m9 18 6-6-6-6" />
                </svg>
            </span>
            </div>
            </a>
            {/* End Icon Block */}
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7"
              href="#"
            >
                <div className="flex justify-center items-center size-12 bg-yellow-500 rounded-xl">
                    <svg
                    className="shrink-0 size-6 text-white"
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                    </svg>
                </div>
                <div className="mt-5">
                    <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800">
                    Secure
                    </h3>
                    <p className="mt-1 text-gray-600">
                    Secure, and reliable project on the web
                    </p>
                    <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-yellow-600 decoration-2 group-hover:underline group-focus:underline font-medium">
                    Learn more
                    <svg
                        className="shrink-0 size-4"
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
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    </span>
                </div>
            </a>
            {/* End Icon Block */}
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7"
              href="#"  
            >
                <div className="flex justify-center items-center size-12 bg-green-500 rounded-xl">
                    <svg
                    className="shrink-0 size-6 text-white"
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
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 10a3 3 0 0 1-6 0" />
                    </svg>
                </div>
                <div className="mt-5">
                    <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800">
                    Reliable
                    </h3>
                    <p className="mt-1 text-gray-600">
                    Reliable, and mobile-first project on the web
                    </p>
                    <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline group-focus:underline font-medium">
                    Learn more
                    <svg
                        className="shrink-0 size-4"
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
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    </span>
                </div>
            </a>
            {/* End Icon Block */}
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7"
              href="#"
            >
                <div className="flex justify-center items-center size-12 bg-red-500 rounded-xl">
                    <svg
                    className="shrink-0 size-6 text-white"
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
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 10a3 3 0 0 1-6 0" />
                    </svg>
                </div>
                <div className="mt-5">
                    <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800">
                    Fast
                    </h3>
                    <p className="mt-1 text-gray-600">
                    Fast, and mobile-first project on the web
                    </p>
                    <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-red-600 decoration-2 group-hover:underline group-focus:underline font-medium">
                    Learn more
                    <svg
                        className="shrink-0 size-4"
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
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    </span>
                </div>
            </a>
            {/* End Icon Block */}
        </div>
    </div>
  );
}   
export default FaqSection;



