import Link from "next/link";
import PersonalMenu from "../../components/PersonalMenu";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Personal = () => {
   // Next Page management
   const router = useRouter()

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
      <motion.section
         key={router.route}
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         exit="exit"
         className="px-4 md:px-0 mb-6"
         className="flex flex-col gap-4 px-4 md:px-0"
      >
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 lg:mb-10">espace personnel</h1>

         <article className="flex flex-col lg:flex-row justify-between">

            {/* LEFT SUBMENU START*/}
            <PersonalMenu />
            {/* LEFT SUBMENU END */}

            <div className="lg:w-4/5 p-10 mt-4 lg:mt-0 mx-6">
               <h2 className="text-xl md:text-2xl lg:text-4xl uppercase font-light md:mb-6 lg:mb-10">Liste des plats créés</h2>
               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic laboriosam ratione suscipit necessitatibus nihil impedit esse quod, consequatur eaque, magni inventore quas minus aspernatur ab exercitationem tenetur ullam eum voluptatem.</p>
            </div>
         </article>
      </motion.section>
      </AnimatePresence>
   );
}

export default Personal;