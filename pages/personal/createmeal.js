import { getCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";

const CreateMeal = () => {

   const [category, setCategory] = useState("");
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");
   const [author, setAuthor] = useState("");
   const [message, setMessage] = useState("");

   const [currentCategory, setCurrentCategory] = useState('Choisissez un type de repas')
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
      <div className="text-black">
         <h1 className="mb-6">Create your new meal here</h1>

         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <select
               onChange={(e) => changeCategory(e.target.value)}
               value={currentCategory}
            >
               <option value="Choisissez un type de repas">Choisissez un type de repas</option>
               <option value="Petit Déjeuner">Petit Déjeuner</option>
               <option value="Déjeuner">Déjeuner</option>
               <option value="Dîner">Dîner</option>
            </select>

            <input
               type="text"
               value={title}
               placeholder="Nom du repas"
               onChange={(e) => setTitle(e.target.value)}
            />
            <input
               type="text"
               value={body}
               placeholder="Description du repas"
               onChange={(e) => setBody(e.target.value)}
            />

            <button type="submit">Create</button>

            <div className="message">{message ? <p>{message}</p> : null}</div>
         </form>
      </div>
   );
}

export default CreateMeal;