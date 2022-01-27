import { getCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
import PersonalSpaceLayout from "../../layouts/PersonalSpaceLayout";
import Link from "next/link";
import PersonalMenu from "../../components/PersonalMenu";

const CreateMeal = () => {

   const [category, setCategory] = useState("");
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");
   const [author, setAuthor] = useState("");
   const [message, setMessage] = useState("");

   const [currentCategory, setCurrentCategory] = useState('Choisissez un type de plat')
   const changeCategory = (newCategory) => {
      setCurrentCategory(newCategory)
   }

   // Register function logic
   let handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = {
            category_name: currentCategory,
            title: title,
            body: body,
            author: getCookie("mealAppUser"),
            cookie: getCookie("mealAppHash"),
         }

         const response = await axios.post('http://localhost/3WA FINAL/PHP REST API BACK/api/post/createMeal.php', data, {
            headers: { 'Content-Type': 'application/json' },
            auth: {
               username: getCookie("mealAppUser"),
               password: getCookie("mealAppHash")
            },
         });
         if (response.status === 200) {
            setTitle("");
            setBody("");
            setAuthor("");
            setCurrentCategory("Choisissez un type de repas")
            setMessage(response.data);
         } else {
            setMessage(response);
         }
         console.log(response)
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <section className="flex flex-col gap-4 px-4 md:px-0">
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10">espace personnel</h1>

         <article className="flex flex-col lg:flex-row justify-between">

            {/* LEFT SUBMENU START*/}
               <PersonalMenu/>
            {/* LEFT SUBMENU END */}

            {/* CREATE YOUR MEAL FORM START*/}
            <div className="lg:w-4/5 p-10 mt-4 lg:mt-0 mx-6 relative new-meal-form">
               <h2 className="text-xl md:text-2xl lg:text-4xl uppercase font-light mb-4 md:mb-6 lg:mb-10">Creer un nouveau plat</h2>

               <form onSubmit={handleSubmit} className="flex flex-col md:w-3/6">
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Choisissez une catégorie de plat</label>
                  <select
                     id="category"
                     onChange={(e) => changeCategory(e.target.value)}
                     value={currentCategory}
                     // className="min-h-[5rem] p-4"
                     className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                     <option value="Choisissez un type de plat">Choisissez une catégorie de plat</option>
                     <option value="Petit Déjeuner">Petit Déjeuner</option>
                     <option value="Déjeuner">Déjeuner</option>
                     <option value="Dîner">Dîner</option>
                  </select>

                  <input
                     type="text"
                     value={title}
                     placeholder="Nom du plat"
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full p-2.5 mb-6"
                  />
                  <textarea
                     type="text"
                     value={body}
                     placeholder="Description du plat"
                     onChange={(e) => setBody(e.target.value)}
                     className="w-full p-2.5 mb-6"
                  />

                  <button 
                     type="submit"
                     className="text-theme-white bg-theme font-bold rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center uppercase self-start"
                  >
                     Create
                  </button>

                  <div className="message">{message ? <p>{message}</p> : null}</div>
               </form>
            </div>
            {/* CREATE YOUR MEAL FORM END*/}

         </article>
      </section>

   );
}

export default CreateMeal;