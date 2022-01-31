import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head'

const Register = () => {

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rpassword, setRpassword] = useState("");
   const [message, setMessage] = useState("");
   const [visible, setVisible] = useState(false);

   // Next Page management
   const router = useRouter()


   useEffect(() => {
      // console.log(getCookie('user'))
   }, []);


   // Register function logic
   let handleSubmit = async (e) => {
      e.preventDefault();
      try {
         let res = await fetch("https://my-ez-meal.herokuapp.com/api/post/registerUser.php", {
            method: "POST",
            body: JSON.stringify({
               username: username,
               email: email,
               pwd: password,
               rPwd: rpassword,
            }),
         });
         let resJson = await res.json();
         if (res.status === 200) {
            setUsername("");
            setEmail("");
            setPassword("")
            setRpassword("")
            setMessage(resJson);
            // console.log(resJson)
            // router.push("/login")
            setVisible(true)
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
            <title>EZ Meal | Inscription</title>
            <meta name='keywords' content='Repas'></meta>
         </Head>
         <motion.section 
            key={router.route}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-1/2 mx-auto">
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10'>Inscrivez vous</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative new-meal-form p-10">
               <label hmtlfor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nom d&apos;utilisateur</label>
               <input
                  type="text"
                  value={username}
                  placeholder="Nom d'utilisateur"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2.5 mb-6"
               />
               <label hmtlfor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Email</label>
               <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 mb-6"
               />
               <label hmtlfor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mot de passe</label>
               <input
                  type="password"
                  value={password}
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 mb-6"
               />
               <label hmtlfor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Répétez le mot de passe</label>
               <input
                  type="password"
                  value={rpassword}
                  placeholder="Répétez le mot de passe"
                  onChange={(e) => setRpassword(e.target.value)}
                  className="w-full p-2.5 mb-6"
               />

               <button
                  type="submit"
                  className="text-theme-white bg-theme font-bold rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center uppercase self-start"
               >
                  S&apos;inscrire
               </button>

               <div className="message">{message ? <p>{message}</p> : null}</div>
               <div className="">{visible ? <Link href="/login" passHref><a>Connectez vous</a></Link> : null}</div>
            </form>
         </motion.section>
      </AnimatePresence>
   );
}

export default Register;