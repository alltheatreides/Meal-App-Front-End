import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
   const res = await fetch("https://my-ez-meal.herokuapp.com/api/post/readMeals.php");

   const data = await res.json();

   return {
      props: {
         meals: data
      }
   }
}

const MealsList = ({ meals }) => {

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
            <title>EZ Meal | Liste des repas</title>
         </Head>
         <AnimatePresence>
            <motion.div
               key={router.route}
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
               className="px-4 md:px-0 mb-6"
            >
               <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10">Liste des plats</h1>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                  {
                     meals.map((meal, key) => (
                        <Link key={key} href={`/meals/${meal.title}`} passHref>
                           <div key={key} className='min-h-[20rem] md:min-h-[20rem] lg:min-h-[30rem] h-full grid content-end relative overflow-hidden'>
                              <img
                                 src={`https://my-ez-meal.herokuapp.com/upload/images/${meal.image}`}
                                 alt={meal.title}
                                 className="absolute inset-0 -z-10 rounded-lg opacity-80"
                              />
                              <div className='relative foodcardtext text-theme-white px-6 py-10 md:py-15'>
                                 <h5 className="mb-2 text-2xl font-bold uppercase">{meal.title}</h5>
                                 <p className="mb-3 font-normal">{meal.body.slice(0, 150)}...</p>
                              </div>
                           </div>
                        </Link>
                     ))
                  }
               </div>
            </motion.div>
         </AnimatePresence>
      </>
   );
}

export default MealsList;