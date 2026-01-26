
const HomePage = () => {
return (
<section className="bg-salmon">
<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">
        <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl  text-verdeclaro">
          Todo lo que crece con amor, florece con valor.
          </h1>
        <h2>Año nuevo....¿Plantas nuevas? Renová tu hogar con naturaleza. </h2>
          <a
            href="/products"
           className="inline-flex items-center justify-center mt-5
    px-5 py-3 text-base font-medium text-center
    text-white
    bg-verdeoscuro
    border border-verdeoscuro
    rounded-lg
    hover:bg-salmon
    hover:border-slate-900
    hover:text-verdeoscuro
    transition-colors"
          >
         Ir a Productos
         </a>
       </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex ">
          <img
           src="https://www.dzoom.org.es/wp-content/uploads/2010/03/flores-primavera-flor-color-portada-flor-colores-810x540.jpg"
           alt="mockup"

         />
        </div>
      </div>
     </section>
   );
 };
 export default HomePage;



