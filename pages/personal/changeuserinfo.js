import axios from "axios";
import { getCookie, setCookies } from "cookies-next";
import { useEffect, useState } from "react";
import PersonalMenu from "../../components/PersonalMenu";

const ChangeUserInfo = () => {

   // const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rpassword, setRpassword] = useState("");
   const [message, setMessage] = useState("");

   useEffect(() => {
      // if (getCookie("mealAppUser")) {
      //    setUsername(getCookie("mealAppUser"))
      // }
   }, []);


   // Register function logic
   let handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = {
            username: getCookie("mealAppUser"),
            email: email,
            pwd: password,
            rPwd: rpassword,
         }

         const response = await axios.put('https://my-ez-meal.herokuapp.com/api/post/updateUser.php', data, {
            headers: { 'Content-Type': 'application/json' },
            auth: {
               username: getCookie("mealAppUser"),
               password: getCookie("mealAppHash")
            },
         });
         if (response.status === 200) {
            // setUsername(getCookie("mealAppUser"));
            setEmail("");
            setPassword("")
            setRpassword("")
            setMessage("Vos informations ont bien été mises à jour");
         } else {
            setMessage(response.data.error);
         }
         console.log(response)
      } catch (err) {
         console.log(err);
         setMessage(err)
      }
      // try {
      //    let res = await fetch("https://my-ez-meal.herokuapp.com/api/post/updateUser.php", {
      //       method: "PUT",
      //       credentials: 'include',
      //       mode: 'cors',
      //       body: JSON.stringify({
      //          username: username,
      //          email: email,
      //          pwd: password,
      //          rPwd: rpassword,
      //       }),
      //    });
      //    let resJson = await res.json();
      //    if (res.status === 200) {
      //       setUsername("");
      //       setEmail("");
      //       setPassword("")
      //       setRpassword("")
      //       // setMessage(resJson);
      //       console.log(resJson)
      //    } else {
      //       console.log(resJson)
      //       // setMessage(resJson);
      //    }
      // } catch (err) {
      //    console.log(err);
      // }
   };

   return (
      <section className="flex flex-col gap-4 px-4 md:px-0">
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10">espace personnel</h1>

         <article className="flex flex-col lg:flex-row justify-between">

            {/* LEFT SUBMENU START*/}
            <PersonalMenu />
            {/* LEFT SUBMENU END */}

            <div className="lg:w-4/5 p-10 mt-4 lg:mt-0 mx-6 relative new-meal-form">

               <h2 className="text-xl md:text-2xl lg:text-4xl uppercase font-light mb-4 md:mb-6 lg:mb-10">Changez vos informations utilisateur</h2>
               
               <form onSubmit={handleSubmit} className="flex flex-col md:w-3/6">
                  {/* <input
                  type="text"
                  value={username}
                  placeholder="Nouveau nom d'utilisateur"
                  onChange={(e) => setUsername(e.target.value)}
               /> */}
                  <input
                     type="text"
                     value={email}
                     placeholder="Nouveau mail"
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full p-2.5 mb-6"
                  />
                  <input
                     type="text"
                     value={password}
                     placeholder="Nouveau mot de passe"
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full p-2.5 mb-6"
                  />
                  <input
                     type="text"
                     value={rpassword}
                     placeholder="Répétez le nouveau mot de passe"
                     onChange={(e) => setRpassword(e.target.value)}
                     className="w-full p-2.5 mb-6"
                  />

                  <button 
                     type="submit"
                     className="text-theme-white bg-theme font-bold rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center uppercase self-start"
                  >
                     Mettre à jour
                  </button>

                  <div className="message">{message ? <p>{message}</p> : null}</div>
               </form>
            </div>

         </article>
      </section>
   );
}

export default ChangeUserInfo;