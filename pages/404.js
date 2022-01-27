import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Error = () => {

   const router = useRouter()

   useEffect(() => {
      setTimeout( () => {
         router.push("/")
      }, 3000)
   }, []);


   return (
      <div className="container mx-auto text-center">
         <h1 className="text-3xl font-bold">Whoops</h1>
         <h2 className="text-2xl font-bold">La page n'a pas été trouvée</h2>

         <p className="text-xl">Retournez à <Link href="/"><span className="text-blue-400 cursor-pointer">l'accueil</span></Link></p>
      </div>
   );
}

export default Error;