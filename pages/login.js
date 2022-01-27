import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {

   const [username, setUsername] = useState("");
   // const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   // const [rpassword, setRpassword] = useState("");
   const [message, setMessage] = useState("");

   const router = useRouter()

   function setCookie(name, value, days=60) {
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
         let res = await fetch("http://localhost/3WA FINAL/PHP REST API BACK/api/post/loginUser.php", {
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

   return (
      <div className="text-black">
         {!getCookie("user") ?
            (
               <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                     type="text"
                     value={username}
                     placeholder="Name"
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  {/* <input
                     type="text"
                     value={email}
                     placeholder="Email"
                     onChange={(e) => setEmail(e.target.value)}
                  /> */}
                  <input
                     type="text"
                     value={password}
                     placeholder="Password"
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  <button type="submit">Login</button>

                  <div className="message">{message ? <p>{message}</p> : null}</div>
               </form>
            ) : (
               <h1>hi</h1>
            )
         }
         {/* <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
               type="text"
               value={username}
               placeholder="Name"
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="text"
               value={password}
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

            <div className="message">{message ? <p>{message}</p> : null}</div>
         </form> */}
      </div>
   );
}

export default Login;