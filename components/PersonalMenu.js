import Link from "next/link";
const PersonalMenu = () => {
   return (
      <div className="lg:min-h-screen flex flex-row lg:flex-col uppercase font-bold gap-6 lg:border-r border-color-black lg:pr-6 border-r-0 border-b lg:border-b-0 pb-4 lg:pb-0">
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
   );
}

export default PersonalMenu;