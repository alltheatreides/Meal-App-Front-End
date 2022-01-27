import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export const getStaticProps = async () => {
   const res = await fetch("http://localhost/3WA FINAL/PHP REST API BACK/api/post/readMeals.php");

   const data = await res.json();

   return {
      props: {
         meals: data
      }
   }
}

const MealsList = ({ meals }) => {
   return (
      <>
         <Head>
            <title>EZ Meal | Liste des repas</title>
         </Head>
         <div>
            <h1>Meals list</h1>
            {
               meals.map((meal, key) => (
                  <Link key={key} href={`/meals/${meal.title}`}>
                     {meal.title}
                  </Link>
               ))
            }
         </div>
      </>
   );
}

export default MealsList;