import host from "../../util/host.config";

// Generate route path information
export const getStaticPaths = async () => {
   const res = await fetch(`${host}api/post/readMeals.php`);
   const data = await res.json();

   // map data to an array of path objects with params (slug)
   const paths = data.map(meal => {
      return {
         params: { slug: meal.title }
      }
   })

   return {
      paths,
      fallback: false
   }
}

// TODO configurer le back propement en GET request pour plus de rapidité
export const getStaticProps = async (context) => {
   const slug = context.params.slug;
   const res = await fetch(`${host}api/post/readSingleMeal.php`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
         slug: slug
      }),
   });
   const data = await res.json();

   return {
      props: { meal: data }
   }
}

const Details = ({ meal }) => {
   // console.log(meal)
   return (
      <div>
         <h1>Details page</h1>
         <img src={`${host}upload/images/${meal.image}`} alt="" />
         <h2>{meal.title}</h2>
         <p>{meal.body}</p>
         <p>{meal.author}</p>
      </div>
   );
}

export default Details;