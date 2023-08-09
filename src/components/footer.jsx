import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogOut } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { setUserData } from '@/utils/UserSlice';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-400 py-2 flex-shrink-2">
      <div className="container mx-auto px-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-white">Experblooms</h3>
              <p className="text-gray-400 mt-2">
                Your go-to job portal for career opportunities.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white">Links</h4>
              <ul className="mt-2">
                <li className="mb-2">
                  <a
                    href={'/'}
                    className="text-gray-400 text-white transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
                {/*<li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Jobs</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</a>
                </li>
  */}
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-white">Follow Us</h4>
              <div className="mt-2">
                <a
                  href="#"
                  className="text-gray-400 text-white transition-colors duration-300 mr-1 "
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-400 text-white transition-colors duration-300 mr-1 "
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-gray-400 text-white transition-colors duration-300 mr-1"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 text-white transition-colors duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            © 2023 Experblooms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
