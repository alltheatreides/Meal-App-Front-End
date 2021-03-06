import Link from 'next/link'
import { useRouter } from "next/router"
import React, { useEffect, useState } from 'react';
import { getCookies, getCookie, setCookies, removeCookies, checkCookies } from 'cookies-next';
import { motion } from 'framer-motion';

const NavBar = () => {

   const router = useRouter()

   useEffect(() => {

   }, []);

   let handleDisconnect = () => {
      if (getCookie('mealAppUser')) {
         removeCookies("mealAppUser")
         removeCookies("mealAppHash")

         // router.reload()
         router.push("/")
      }
   }
   
   return (
      <header>

         <nav className='container mx-auto flex justify-between items-end mt-6 mb-10 lg:mb-20 pb-4 lg:pb-8 border-b-2 border-grey-800'>
            <div className='flex gap-2 items-center'>

               {/* <Link href="/"><a className='w-2/12'><img src="/ezmeal.svg" alt="" /></a></Link> */}
               <Link href="/">
                  <a className=''>
                     <motion.svg width="88" height="50" viewBox="0 0 357 286" fill="none" xmlns="http://www.w3.org/2000/svg"
                        initial={{ y: -250 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
                     >
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7846 253.982H350.215C353.411 253.982 356 257.177 356 259.766V259.879C356 263.075 353.409 265.664 350.215 265.664H12.7846C9.5888 265.664 7 262.468 7 259.879V259.766C7 256.57 9.59085 253.982 12.7846 253.982V253.982Z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M326.634 268.447C320.85 274.231 307.833 285.803 306.386 285.803H56.1749C54.7277 285.803 43.1581 274.231 37.3735 268.447H326.633H326.634Z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M193.574 131.045C267.334 136.829 325.19 186.008 332.42 249.645H30.1444C38.8215 186.008 96.6745 136.836 168.991 131.045C164.651 97.7795 199.363 94.8875 193.579 131.045H193.574ZM61.9579 220.714H44.6021C64.8505 181.664 103.902 152.735 153.074 144.061C102.453 168.649 87.9879 184.557 61.9554 220.714H61.9579Z" fill="currentColor" />
                        <path d="M49.948 152.813C52.1051 154.97 55.6033 154.97 57.7605 152.813C59.9177 150.656 59.9176 147.158 57.7605 144.998L8.97273 96.2103C6.78108 94.4575 3.62308 94.6252 1.63106 96.6048C-0.360844 98.5819 -0.550682 101.737 1.18484 103.941L49.948 152.813Z" fill="currentColor" />
                        <path d="M296.966 141.697C298.018 142.716 299.432 143.275 300.896 143.252C302.36 143.229 303.756 142.625 304.775 141.573L352.17 92.651C354.294 90.459 354.237 86.9643 352.047 84.8424C349.856 82.7205 346.362 82.7742 344.238 84.9662L296.842 133.888C295.823 134.94 295.264 136.354 295.287 137.818C295.31 139.282 295.914 140.678 296.966 141.697Z" fill="currentColor" />
                        <path d="M127.743 74.1799C128.504 77.1382 131.522 78.9181 134.48 78.1539C135.9 77.789 137.118 76.8745 137.863 75.6098C138.61 74.3476 138.822 72.8388 138.457 71.4189L121.89 5.15259C121.129 2.19428 118.111 0.414366 115.153 1.17611C112.194 1.93786 110.414 4.95537 111.176 7.91381L127.743 74.1799Z" fill="currentColor" />
                        <path d="M211.565 72.2805C210.692 75.2079 212.36 78.289 215.289 79.1597C216.693 79.5794 218.209 79.4237 219.499 78.7241C220.789 78.0278 221.749 76.8445 222.169 75.4397L242.145 10.1204C243.018 7.19296 241.35 4.11193 238.423 3.23905C235.495 2.36616 232.414 4.0338 231.542 6.96138L211.565 72.2805Z" fill="currentColor" />
                        <path d="M119.836 112.425L117.738 124.574L128.644 118.83L139.55 124.574L137.452 112.425L146.288 103.81L134.082 102.044L128.644 91L123.206 102.044L111 103.81L119.836 112.425Z" fill="currentColor" />
                        <path d="M246.056 121.981L249.783 130.372L254.201 122.284L263.34 121.345L257.018 114.664L258.951 105.661L250.638 109.61L242.66 105L243.846 114.138L237 120.294L246.056 121.981Z" fill="currentColor" />
                        <path d="M69.0783 112.342L75.2365 105.493L84.3749 106.709L79.7624 98.7284L83.7389 90.4451L74.7381 92.3237L68.0843 86L67.0908 95.1384L59 99.529L67.3944 103.284L69.0783 112.342Z" fill="currentColor" />
                     </motion.svg>
                  </a>
               </Link>
               <Link href="/">
                  <motion.a
                     initial={{ y: -250 }}
                     animate={{ y: 0 }}
                     transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                     className='text-2xl self-end cursor-pointer'
                  >EZ MEAL</motion.a>
               </Link>
            </div>

            <motion.div
               initial={{ y: -250 }}
               animate={{ y: 0 }}
               transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}

               className='md:flex gap-6 items-center whitespace-nowrap hidden'>

               <Link href="/" passHref>Accueil</Link>
               <Link href="/about" passHref>?? propos</Link>
               <Link href="/meals" passHref>Liste des plats</Link>
               {
                  (getCookie("mealAppUser") == "" || !checkCookies("mealAppUser")) &&
                  <Link href="/login" passHref>Connexion</Link>
               }
               {
                  !checkCookies("mealAppUser") &&
                  <Link href="/register" passHref>S&apos;inscrire</Link>
               }
               {
                  getCookie("mealAppUser") && getCookie("mealAppUser") != "" &&
                  <Link href="/personal" passHref>Espace Personnel</Link>
               }
               {
                  (getCookie("mealAppUser") && getCookie("mealAppUser") != "") &&
                  <button onClick={handleDisconnect}>Se d??connecter</button>
               }
            </motion.div>



         </nav>
      </header>
   );
}

export default NavBar;