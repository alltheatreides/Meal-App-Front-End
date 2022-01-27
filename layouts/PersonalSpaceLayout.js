import Link from "next/link";
const PersonalSpaceLayout = ({ children }) => {
   return (
      <section className="flex flex-col gap-4 px-4 md:px-0">
         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-6 lg:mb-10">espace personnel</h1>
         <article className="flex justify-between">
            <div className="w-1/5 flex flex-col gap-6 border-l border-theme">
               <Link href="/personal">
                  Plats créés
               </Link>
               <Link href="/personal/createmeal">
                  Créer un nouveau plat
               </Link>
               <Link href="/personal/changeuserinfo">
                  Changer ses informations utilisateurs
               </Link>
            </div>

            <div className="w-4/5 px-6">
               {children}
            </div>
         </article>
      </section>
   );
}

export default PersonalSpaceLayout;