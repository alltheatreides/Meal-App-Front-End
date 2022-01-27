import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = ({children}) => {
   return ( 
      <div className="content container mx-auto md:fixed">
         <NavBar></NavBar>
         <main className="">
            { children }
         </main>
         {/* <Footer></Footer> */}
      </div>
   );
}

export default Layout;