import React from 'react';

interface ServiceButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetQuoteModal: React.FC<GetQuoteModalProps> = ({ isOpen, onClose }) => {
  
  const ServiceButton: React.FC<ServiceButtonProps> = ({ icon, label, href }) => (
    <a 
      href={href}
      className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-colors duration-200"
    >
      <div className="text-gray-700 mr-4">{icon}</div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </a>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay - updated for backdrop blur effect */}
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center transform transition-all z-30" onClick={onClose}>        {/* Modal Content - updated for glass effect */}
        <div 
          className="bg-white bg-opacity-15 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1976D2] bg-opacity-80 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Get an Instant Quote</h3>
            <button 
              type="button"
              aria-label="Close"
            onClick={onClose} className="text-white hover:text-gray-200 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="p-4 divide-y divide-gray-200">
            <ServiceButton
              href="/instant-flooring-quote"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M47.75 4.339A1 1 0 0 0 47 4H17a1 1 0 0 0-.75.339l-15 17A1 1 0 0 0 1 22v4a1 1 0 0 0 1 1h3.96l-4.71 5.338A1 1 0 0 0 1 33v4a1 1 0 0 0 1 1h4.038l-4.9 8.5A1 1 0 0 0 1 47v12a1 1 0 0 0 1 1h60a1 1 0 0 0 1-1V47a1 1 0 0 0-.134-.5l-4.9-8.5H62a1 1 0 0 0 1-1v-4a1 1 0 0 0-.25-.662L58.04 27H62a1 1 0 0 0 1-1v-4a1 1 0 0 0-.25-.661ZM17.451 6h29.1l13.233 15H4.216Zm-6.4 32a20.832 20.832 0 0 0-2.022 8h-5.3l4.616-8ZM47 46v-1.5a4 4 0 0 1 1.309-2.923A5.024 5.024 0 0 1 51 46Zm.4-6.3a6.029 6.029 0 0 0-2.4 4.8V46h-1v-7.419a1.176 1.176 0 0 1 .174-.581h4.512a4 4 0 0 1-1.286 1.7ZM42 38.581V46h-1.087l-.727-8h1.873a3.225 3.225 0 0 0-.059.581ZM38.177 38l.728 8H33v-8ZM31 46h-7v-1.172a5.868 5.868 0 0 1 1.707-4.121A7.825 7.825 0 0 0 27.459 38H31Zm-6.707-6.707A7.883 7.883 0 0 0 22 44.828V46h-5v-3.465a3.092 3.092 0 0 1 2.642-3.045A5.037 5.037 0 0 0 22.534 38h2.726a5.829 5.829 0 0 1-.967 1.293ZM15 42.535V46h-3.967a18.836 18.836 0 0 1 2.267-8h4.533A5.094 5.094 0 0 0 15 42.535ZM3 48h28v3a1 1 0 0 0 1 1h3a1 1 0 0 1 0 2h-3a1 1 0 0 0-1 1v3H3Zm30 10v-2h2a3 3 0 0 0 0-6h-2v-2h28v10Zm27.269-12H53a7.036 7.036 0 0 0-3.229-5.875A6.039 6.039 0 0 0 50.8 38h4.852ZM3 36v-2h58v2Zm56.784-4H4.216l4.413-5h46.742ZM3 25v-2h58v2Z"
                    fill="#1976D2"
                  />
                </svg>
              }
              label="Flooring Quote"
            />
            
            <ServiceButton
              href="/instant-painting-quote"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 128 128"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 128 128"
                >
                  <path
                    d="M81.9 72.3H72c-1.1 0-2-.9-2-2V51.2c0-.9.6-1.7 1.5-1.9l42-11.3V24h-4.1c-1.1 0-2-.9-2-2v-9.9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v35c0 .9-.6 1.7-1.5 1.9l-42 11.3v10.1c-.1 1-.9 1.9-2 1.9zm-8-3.9h6v-9.6c0-.9.6-1.7 1.5-1.9l42-11.3V14.1h-12v6h4.1c1.1 0 2 .9 2 2v17.5c0 .9-.6 1.7-1.5 1.9L74 52.8v15.6z"
                    fill="#1976D2"
                  />
                  <path
                    d="M80.5 127.5h-7.2c-6.5 0-11.7-5.3-11.7-11.7V70.4c0-1.1.9-2 2-2h26.6c1.1 0 2 .9 2 2v45.4c0 6.4-5.3 11.7-11.7 11.7zM65.6 72.3v43.5c0 4.3 3.5 7.7 7.7 7.7h7.2c4.3 0 7.7-3.5 7.7-7.7V72.3H65.6z"
                    fill="#1976D2"
                  />
                  <path
                    d="M80.5 118.6h-7.2c-.5 0-1-.4-1-1 0-.5.4-1 1-1h7.2c.4 0 .8-.4.8-.8V78.3c0-.5.4-1 1-1 .5 0 1 .4 1 1v37.5c0 1.5-1.3 2.8-2.8 2.8zM109.2 33.6H2.7c-1.1 0-2-.9-2-2V2.5c0-1.1.9-2 2-2h106.5c1.1 0 2 .9 2 2v29.1c0 1.1-.9 2-2 2zm-104.6-4h102.6V4.5H4.6v25.1z"
                    fill="#1976D2"
                  />
                  <path
                    d="M101.2 24.6H10.6c-.5 0-1-.4-1-1s.4-1 1-1h89.7V10.4c0-.5.4-1 1-1 .5 0 1 .4 1 1v13.2c-.1.6-.5 1-1.1 1z"
                    fill="#1976D2"
                  />
                </svg>
              }
              label="Painting Quote"
            />
            
            <ServiceButton
              href="/instant-kitchen-bath-quote"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 128 128"
                >
                  <path
                    d="M496 500H17a5 5 0 0 1-5-5V16a5 5 0 0 1 5-5h479a5 5 0 0 1 5 5v479a5 5 0 0 1-5 5ZM22 490h469V21H22Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M496 261H17a5 5 0 0 1 0-10h479a5 5 0 0 1 0 10Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M256.5 500.5a5 5 0 0 1-5-5v-479a5 5 0 0 1 10 0v479a5 5 0 0 1-5 5ZM138 231a49.81 49.81 0 0 1-49.52-45 49.75 49.75 0 0 1 0-99 49.75 49.75 0 0 1 99 0 49.75 49.75 0 0 1 0 99A49.81 49.81 0 0 1 138 231Zm0-179a39.79 39.79 0 0 0-39.75 39.75 5 5 0 0 1-5 5 39.75 39.75 0 0 0 0 79.5 5 5 0 0 1 5 5 39.75 39.75 0 0 0 79.5 0 5 5 0 0 1 5-5 39.75 39.75 0 0 0 0-79.5 5 5 0 0 1-5-5A39.79 39.79 0 0 0 138 52ZM17 80.75a5 5 0 0 1-3-9 80 80 0 0 1 43.39-15.86A80 80 0 0 1 72.85 13a5 5 0 0 1 8.06 6 70.14 70.14 0 0 0-13.66 41.75 5 5 0 0 1-5 5A70.1 70.1 0 0 0 20 79.76a5 5 0 0 1-3 .99ZM76.47 260a5 5 0 0 1-4.13-2.17 80.28 80.28 0 0 1-14-40.72 80 80 0 0 1-43.92-16.25 5 5 0 0 1 6-8 70.14 70.14 0 0 0 42.73 14.36 5 5 0 0 1 5 5 70.38 70.38 0 0 0 12.34 39.93 5 5 0 0 1-4.02 7.85Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M198.48 260.5a4.93 4.93 0 0 1-2.92-.94 5 5 0 0 1-1.13-7 70.28 70.28 0 0 0 13.32-41.33 5 5 0 0 1 5-5 70.3 70.3 0 0 0 40.39-12.66 5 5 0 1 1 5.72 8.2 80.18 80.18 0 0 1-41.25 14.32 80.19 80.19 0 0 1-15.07 42.32 5 5 0 0 1-4.06 2.09ZM256.09 79.69a5 5 0 0 1-2.79-.86 70.4 70.4 0 0 0-39.55-12.08 5 5 0 0 1-5-5 70.1 70.1 0 0 0-14-42.26 5 5 0 0 1 8-6 80 80 0 0 1 15.85 43.38 80.39 80.39 0 0 1 40.3 13.67 5 5 0 0 1-2.81 9.15ZM137 50a5 5 0 0 1-5-5V16a5 5 0 0 1 10 0v29a5 5 0 0 1-5 5ZM137 260a5 5 0 0 1-5-5v-29a5 5 0 0 1 10 0v29a5 5 0 0 1-5 5Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M137 498a5 5 0 0 1-5-5V255a5 5 0 0 1 10 0v238a5 5 0 0 1-5 5Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M256 379H18a5 5 0 0 1 0-10h238a5 5 0 0 1 0 10ZM256.5 140.5h-29a5 5 0 0 1 0-10h29a5 5 0 0 1 0 10ZM46.5 140.5h-29a5 5 0 0 1 0-10h29a5 5 0 0 1 0 10ZM139 141a5 5 0 0 1-4.55-2.92l-22-48A5.12 5.12 0 0 1 112 88a27 27 0 0 1 54 0 5.12 5.12 0 0 1-.45 2.08l-22 48A5 5 0 0 1 139 141Zm-17-54 17 37 17-37a17 17 0 0 0-34 0Zm39 1Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M139 211a27 27 0 0 1-27-27 5.12 5.12 0 0 1 .45-2.08l22-48a5 5 0 0 1 9.1 0l22 48A5.12 5.12 0 0 1 166 184a27 27 0 0 1-27 27Zm-17-26a17 17 0 0 0 34 0l-17-37Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M187 163a5 5 0 0 1-2.08-.46l-48-22a5 5 0 0 1 0-9.08l48-22A5 5 0 0 1 187 109a27 27 0 0 1 0 54Zm-36-27 37 17a17 17 0 0 0 0-34Z"
                    fill="#1976D2"
                  />
                  <path
                    d="M91 163a27 27 0 0 1 0-54 5 5 0 0 1 2.08.46l48 22a5 5 0 0 1 0 9.08l-48 22A5 5 0 0 1 91 163Zm-1-44a17 17 0 0 0 0 34l37-17Z"
                    fill="#1976D2"
                  />
                </svg>
              }
              label="Kitchen & Bath Quote"
            />
            
            <ServiceButton
              href="/masonry-quote"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 52 52"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 128 128"
                >
                  <g id="_x35_5">
                    <path
                      d="M2.055 24.967v24.058a1 1 0 0 0 1 1h45.89a1 1 0 0 0 1-1V8.93a1 1 0 0 0-1-1H30.59a1 1 0 0 0-1 1v5.56l-2.723-5.015A2.094 2.094 0 0 0 25.17 8.31a2.122 2.122 0 0 0-1.898.838l-3.985 5.313-3.377-2.532a3.232 3.232 0 0 0-1.118-3.681l-7.49-5.618a3.274 3.274 0 0 0-3.93 5.24l7.49 5.618a3.236 3.236 0 0 0 3.848.042l3.377 2.532-3.985 5.314a2.11 2.11 0 0 0-.272 2.057c.079.199.19.374.317.535H3.055a1 1 0 0 0-1 1zm10.007-13.08L4.57 6.27A1.274 1.274 0 1 1 6.1 4.23l7.49 5.617c.563.423.678 1.22.255 1.784v.001a1.273 1.273 0 0 1-1.784.255zm17.527 22.1v6.02H13.233v-6.02h16.356zm6.146-8.02h12.21v6.02h-16.34V28.24l1.733.376a2.106 2.106 0 0 0 2.397-2.65zm5.032-8.019h7.178v6.02h-7.178v-6.02zM31.59 40.006v-6.02h7.178v6.02H31.59zm9.178-6.02h7.178v6.02h-7.178v-6.02zm-11.163-2h-7.178v-5.733l7.178 1.555v4.179zm-18.371 8.02H4.055v-6.02h7.178v6.02zm-7.178 2H20.41v6.02H4.055v-6.02zm18.356 0h7.178v6.02h-7.178v-6.02zm25.534 6.02H31.59v-6.02h16.356v6.02zM31.59 9.928h16.356v6.02H31.59v-6.02zm7.178 8.02v6.018h-4.032l-3.268-6.019h7.3zm-23.065 4.626 9.17-12.228h-.001c.026-.036.063-.049.111-.047.065.007.082.043.108.092l8.727 16.075c.01.018.033.066-.015.13-.047.063-.099.053-.08.057l-17.955-3.89c-.016-.002-.055-.01-.079-.069a.116.116 0 0 1 .014-.12zM4.055 25.967h16.02c.118 0 .231-.02.336-.057v6.077H4.055v-6.02z"
                      fill="#1976D2"
                    />
                    <path
                      d="m22.227 21.89 3.65-4.882a1 1 0 0 0-1.6-1.198l-3.652 4.881a1 1 0 0 0 1.602 1.199z"
                      fill="#1976D2"
                    />
                  </g>
                </svg>
              }
              label="Masonry Quote"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetQuoteModal;