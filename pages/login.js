import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head'

const Login = () => {

   const [username, setUsername] = useState("");
   // const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   // const [rpassword, setRpassword] = useState("");
   const [message, setMessage] = useState("");

   // Next Page management
   const router = useRouter()

   function setCookie(name, value, days = 60) {
      var expires = "";
      if (days) {
         var date = new Date();
         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
         expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
   }

   function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
   }

   useEffect(() => {
      // console.log(getCookie('user'))
   }, []);


   // Register function logic
   let handleSubmit = async (e) => {
      e.preventDefault();
      try {
         let res = await fetch("https://my-ez-meal.herokuapp.com/api/post/loginUser.php", {
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            // headers: {
            //    "Authorization": btoa(username + ":" + password)
            // },
            body: JSON.stringify({
               username: username,
               pwd: password,
            }),
         });
         let resJson = await res.json();
         if (res.status === 200) {
            setUsername("");
            setPassword("")
            setCookie("mealAppUser", resJson.user_name, 60);
            setCookie("mealAppHash", resJson.hash, 60);
            router.push("/")
         } else {
            // console.log(resJson)
            setMessage(resJson);
         }
      } catch (err) {
         console.log(err);
      }
   };

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
      <AnimatePresence>
         <Head>
            <title>EZ Meal | Connexion</title>
            <meta name='keywords' content='Repas'></meta>
         </Head>
         <motion.section
            key={router.route}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-1/2 mx-auto"
         >
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10'>connectez vous</h1>
            {!getCookie("mealAppUser") ?
               (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative new-meal-form p-10">
                     <label hmtlfor="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nom d'utilisateur</label>
                     <input
                        type="text"
                        value={username}
                        placeholder="Nom"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2.5 mb-6"
                     />

                     <label hmtlfor="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mot de passe</label>
                     <input
                        type="password"
                        value={password}
                        placeholder="Mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 mb-6"
                     />

                     <button
                        type="submit"
                        className="text-theme-white bg-theme font-bold rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center uppercase self-start"
                     >
                        Login
                     </button>

                     <div className="message">{message ? <p>{message}</p> : null}</div>
                  </form>
               ) : (
                  <div className="container mx-auto text-center">
                     <h1 className="text-3xl font-bold">Whoops</h1>
                     <h2 className="text-2xl font-bold">La page n'a pas été trouvée</h2>

                     <p className="text-xl">Retournez à <Link href="/"><span className="text-blue-400 cursor-pointer">l'accueil</span></Link></p>
                  </div>
               )
            }
         </motion.section>
      </AnimatePresence>
   );
}

export default Login;