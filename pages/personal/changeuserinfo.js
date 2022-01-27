import axios from "axios";
import { getCookie, setCookies } from "cookies-next";
import { useEffect, useState } from "react";

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

         const response = await axios.put('http://localhost/3WA FINAL/PHP REST API BACK/api/post/updateUser.php', data, {
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
      //    let res = await fetch("http://localhost/3WA FINAL/PHP REST API BACK/api/post/updateUser.php", {
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
      <div>
         <h1>Changez vos informations utilisateur</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            />
            <input
               type="text"
               value={password}
               placeholder="Nouveau mot de passe"
               onChange={(e) => setPassword(e.target.value)}
            />
            <input
               type="text"
               value={rpassword}
               placeholder="Répétez le nouveau mot de passe"
               onChange={(e) => setRpassword(e.target.value)}
            />

            <button type="submit">Update</button>

            <div className="message">{message ? <p>{message}</p> : null}</div>
         </form>
      </div>
   );
}

export default ChangeUserInfo;