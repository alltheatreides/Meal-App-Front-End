import Link from "next/link";
import PersonalMenu from "../../components/PersonalMenu";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const Personal = () => {
   // Next Page management
   const router = useRouter()

   // FRAMER MOTION START
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
   // FRAMER MOTION END

   const [data, setData] = useState(null);

   // API MANAGEMENT
   // GET
   async function getMealsByUser(e) {
      try {
         const response = await axios.get('https://my-ez-meal.herokuapp.com/api/post/readMealsCreated.php', {
            headers: { 'Content-Type': 'application/json' },
            auth: {
               username: getCookie("mealAppUser"),
               password: getCookie("mealAppHash")
            },
         });

         const meals = await response.data
         setData(meals)

      } catch (e) {
         console.log(e)
      }
   }
   // POST IMAGE
   const [selectedFile, setSelectedFile] = React.useState(null);

   const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
   }

   async function postMealPicture(e) {
      e.preventDefault()
      try {
         const formData = new FormData();
         formData.append("meal_name", e.target.platimage.name);
         formData.append("plat-image", selectedFile);

         const response = await axios.post('https://my-ez-meal.herokuapp.com/api/post/uploadPicture.php', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            auth: {
               username: getCookie("mealAppUser"),
               password: getCookie("mealAppHash")
            },
         });

         console.log(response)
         // const test = await response
         // console.log(test)

      } catch (e) {
         console.log(e)
      }
   }

   // Use Effect Hooks: launches the api data request and refreshes the DOM when data is received
   useEffect(() => {
      getMealsByUser()
   }, [setData, postMealPicture]);


   return (
      <AnimatePresence>
         <motion.section
            key={router.route}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-4 px-4 md:px-0 mb-6"
         >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10">espace personnel</h1>

            <article className="flex flex-col lg:flex-row justify-between">

               {/* LEFT SUBMENU START*/}
               <PersonalMenu />
               {/* LEFT SUBMENU END */}
               <div className="w-full">
                  <h2 className="text-center lg:text-left lg:ml-16 text-xl md:text-2xl lg:text-4xl uppercase font-light mt-4 md:mt-6 lg:mt-10">Liste des plats créés</h2>
                  <ul className="lg:w-4/5 md:p-10 mt-4 md:mt-0 mx-6 grid md:grid-cols-2 gap-6 mb-6">
                     {data == null
                        ? <p>Loading...</p>
                        : data.map((meal, key) => (
                           <li key={key} className='min-h-[20rem] md:min-h-[20rem] lg:min-h-[30rem] h-full mb-4 grid content-end relative overflow-hidden'>
                              <img
                                 src={`https://my-ez-meal.herokuapp.com/upload/images/${meal.image}`}
                                 alt={meal.title}
                                 className="absolute inset-0 -z-10 rounded-lg opacity-80 min-h-full"
                              />
                              <div className='relative foodcardtext text-theme-white px-6 py-10 md:py-15'>
                                 <Link href={`/meals/${meal.title}`}>
                                    <a className="mb-2 text-2xl font-bold uppercase cursor-pointer">{meal.title}</a>
                                 </Link>
                                 <p className="mb-3 font-normal">{meal.body.slice(0, 150)}...</p>

                                 <form onSubmit={postMealPicture}>
                                    <label>Changer l&apos;image</label>
                                    <input
                                       type="file"
                                       id="platimage" name={meal.title}
                                       accept="image/png, image/jpeg"
                                       onChange={handleFileSelect}
                                       className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
                                    />
                                    <input type="submit" value="Envoyer" />
                                 </form>
                                 {/* <input type="file"
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer">
                                    id="plat-image" name="plat-image"
                                    accept="image/png, image/jpeg"
                                 </input>
                                 <button type="image" onClick={postMealPicture}>Envoyer</button> */}

                              </div>
                           </li>
                        ))
                     }
                  </ul>
               </div>
            </article>
         </motion.section>
      </AnimatePresence >
   );
}

export default Personal;