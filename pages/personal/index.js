import Link from "next/link";

const Personal = () => {
   return ( 
      <div className="flex flex-col gap-4">
         <h1>hello mister</h1>
         <Link href="/personal/createmeal">Create a new meal</Link>
         <Link href="/personal/changeuserinfo">Change personal info</Link>
      </div>
   );
}

export default Personal;