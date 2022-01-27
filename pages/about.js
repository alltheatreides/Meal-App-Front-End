import Head from "next/head";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const About = () => {

   // Next Page management
   const router = useRouter()

   // Container apparition
   const containerVariants = {
      hidden: {
         opacity: 0,
         x: '100vw'
      },
      visible: {
         opacity: 1,
         x: 0,
         transition: { type: 'spring', delay: 0.5 }
      },
      exit: {
         x: "-100vh",
         transition: { ease: 'easeInOut' }
      }
   };

   return (
      <>
         <Head>
            <title>EZ Meal | A propos</title>
            <meta name='keywords' content='Repas'></meta>
         </Head>
         <AnimatePresence>
            <motion.section
               key={router.route}
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10'>A propos</h1>
               <p className="text-2xl">Ce site a été réalisé avec les technologies suivantes:</p>
               <div className="flex gap-6 mt-4">
                  <article>
                     <h3 className="text-xl">Front End</h3>
                     <ul className="text-xl w-48 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">React</li>
                        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">Next-JS</li>
                        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">Tailwind</li>
                        <li className="py-2 px-4 w-full border-b-lg border-gray-200 dark:border-gray-600">Framer Motion</li>
                     </ul>
                  </article>
                  <article>
                     <h3 className="text-xl">Back end</h3>
                     <ul className="text-xl w-48 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="py-2 px-4 w-full border-b border-gray-200 rounded-t-lg">PHP</li>
                        <li className="py-2 px-4 w-full rounded-b-lg">MYSQL</li>
                     </ul>
                  </article>
               </div>
            </motion.section>
         </AnimatePresence>
      </>
   );
}

export default About;