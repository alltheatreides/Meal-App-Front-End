import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Register = () => {

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rpassword, setRpassword] = useState("");
   const [message, setMessage] = useState("");
   const [visible, setVisible] = useState(false);

   const router = useRouter()


   useEffect(() => {
      // console.log(getCookie('user'))
   }, []);


   // Register function logic
   let handleSubmit = async (e) => {
      e.preventDefault();
      try {
         let res = await fetch("http://localhost/3WA FINAL/PHP REST API BACK/api/post/registerUser.php", {
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

   return (
      <div>
         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
               type="text"
               value={username}
               placeholder="Name"
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="text"
               value={email}
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type="text"
               value={password}
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
            <input
               type="text"
               value={rpassword}
               placeholder="Repeat Password"
               onChange={(e) => setRpassword(e.target.value)}
            />

            <button type="submit">Create</button>

            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="">{visible ? <Link href="/login"><a>Connectez vous</a></Link> : null}</div>
         </form>
      </div>
   );
}

export default Register;