"use client";

import Link from "next/link";
import { NavItems } from "@/utils/Navitems";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { PATHROUTES } from "@/utils/PathRoutes";
import { useCart } from "@/app/contexts/Cartcontext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProducts";
import { getCategories } from "@/services/category.service";
import { getAllProductsService } from "@/services/products.services";
import Container from "./Container";

const Navbar = () => {
  const { dataUser, logout } = useAuth();
  const { getItemCount } = useCart();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // =========================================================
  // OBTENER CATEGORÍAS
  // =========================================================

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // =========================================================
  // CERRAR RESULTADOS DE BÚSQUEDA AL HACER CLICK AFUERA
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================================================
  // BÚSQUEDA DE PRODUCTOS
  // =========================================================

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await getAllProductsService(search);

      setSearchResults(results);
      setShowResults(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================================================
  // SELECCIONAR PRODUCTO
  // =========================================================

  const handleSelectProduct = (productId: number) => {
    setSearch("");
    setShowResults(false);

    router.push(`/product/${productId}`);
  };

  // =========================================================
  // BUSCAR CON ENTER
  // =========================================================

  const handleSearchEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && search.trim()) {
      setShowResults(false);

      router.push(`/products?search=${search}`);
    }
  };

  // =========================================================
  // RESALTAR COINCIDENCIA DE BÚSQUEDA
  // =========================================================

  const highlightMatch = (text: string, query: string) => {
    const index = text
      .toLowerCase()
      .indexOf(query.toLowerCase());

    if (index === -1) {
      return <span>{text}</span>;
    }

    return (
      <>
        <span>{text.slice(0, index)}</span>

        <span className="font-bold text-verdeclaro">
          {text.slice(index, index + query.length)}
        </span>

        <span>
          {text.slice(index + query.length)}
        </span>
      </>
    );
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="w-full bg-[#fbf7ec] shadow-sm">

      {/* ===================================================== */}
      {/* PRIMERA FILA */}
      {/* ===================================================== */}

      <div className="border-b border-[#e8e0cc]">

        <Container>

          <div className="grid grid-cols-3 items-center h-24 overflow-visible">

            {/* ================================================= */}
            {/* LOGO */}
            {/* ================================================= */}

            <Link href="/">
              <Image
                src="/Gemini1.jpg"
                alt="Logo"
                width={300}
                height={100}
                className="object-contain h-24 w-auto py-2 mix-blend-multiply -ml-10"
              />
            </Link>


            {/* ================================================= */}
            {/* BUSCADOR */}
            {/* ================================================= */}

            <div
              className="flex-1 mx-8 max-w-xl relative z-50"
              ref={searchRef}
            >

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={handleSearchEnter}
                placeholder="Buscar productos..."
                className="w-full border border-[#c8c0aa] rounded-full px-5 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-verdeclaro"
              />


              {/* RESULTADOS */}

              {showResults && (

                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-[60] overflow-hidden border border-[#e8e0cc]">

                  {searchResults.length > 0 ? (

                    <>

                      {searchResults.map((product) => (

                        <div
                          key={product.id}
                          onClick={() =>
                            handleSelectProduct(product.id)
                          }
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />

                          <div>

                            <p className="text-sm text-gray-800">
                              {highlightMatch(
                                product.name,
                                search
                              )}
                            </p>

                            <p className="text-xs text-gray-500">
                              ${product.price}
                            </p>

                          </div>

                        </div>

                      ))}


                      {/* VER TODOS */}

                      <div
                        onClick={() => {
                          setShowResults(false);

                          router.push(
                            `/products?search=${search}`
                          );
                        }}
                        className="px-4 py-2 text-sm text-verdeclaro hover:bg-gray-50 cursor-pointer text-center font-medium"
                      >
                        Ver todos los resultados para "{search}"
                      </div>

                    </>

                  ) : (

                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      No se encontraron productos
                    </div>

                  )}

                </div>

              )}

            </div>


            {/* ================================================= */}
            {/* CARRITO */}
            {/* ================================================= */}

            <div className="flex justify-end">
              <Link
                href={PATHROUTES.CART}
                className="relative"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-verdeclaro"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />

                </svg>


                {/* CANTIDAD DEL CARRITO */}

                {getItemCount() > 0 && (

                  <span className="absolute -top-2 -right-2 bg-verdeclaro text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>

                )}

              </Link>
            </div>

          </div>

        </Container>

      </div>


      {/* ===================================================== */}
      {/* SEGUNDA FILA */}
      {/* ===================================================== */}

      <Container>

        <div className="grid grid-cols-3 items-center py-3">


          {/* ================================================= */}
          {/* IZQUIERDA - CATEGORÍAS */}
          {/* ================================================= */}

          <div
            className="relative justify-self-start"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => {
              setMenuOpen(false);
              setOpenCategory(null);
            }}
          >

            <button className="flex items-center gap-1 text-verdeclaro font-sans text-lg font-medium">

              {/* HAMBURGUESA */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />

              </svg>


              Categorías


              {/* FLECHA */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />

              </svg>

            </button>


            {/* ================================================= */}
            {/* MENÚ CATEGORÍAS */}
            {/* ================================================= */}

            {menuOpen && (

              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-56 z-50">

                {categories.map((category) => (

                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() =>
                      setOpenCategory(category.id)
                    }
                    onMouseLeave={() =>
                      setOpenCategory(null)
                    }
                  >

                    {/* CATEGORÍA */}

                    <div
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {

                        setMenuOpen(false);

                        router.push(
                          `/products?categoryId=${category.id}`
                        );

                      }}
                    >

                      <span>
                        {category.name}
                      </span>


                      {category.subcategories.length > 0 && (
                        <span>▶</span>
                      )}

                    </div>


                    {/* SUBCATEGORÍAS */}

                    {openCategory === category.id &&
                      category.subcategories.length > 0 && (

                        <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg py-2 w-48">

                          {category.subcategories.map(
                            (sub) => (

                              <div
                                key={sub.id}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => {

                                  setMenuOpen(false);
                                  setOpenCategory(null);

                                  router.push(
                                    `/products?categoryId=${sub.id}`
                                  );

                                }}
                              >

                                {sub.name}

                              </div>

                            )
                          )}

                        </div>

                      )}

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* ================================================= */}
          {/* CENTRO - NAVEGACIÓN */}
          {/* ================================================= */}

          <nav className="flex items-center justify-center gap-6">

            {NavItems.map((navigationItem) => (

              <Link
                key={navigationItem.id}
                href={navigationItem.route}
                className="text-verdeclaro text-lg whitespace-nowrap"
              >
                {navigationItem.nameToRender}
              </Link>

            ))}


            {/* MI CUENTA */}

            {dataUser && (

              <Link
                href={PATHROUTES.DASHBOARD}
                className="text-verdeclaro text-lg whitespace-nowrap"
              >
                Mi cuenta
              </Link>

            )}

          </nav>


          {/* ================================================= */}
          {/* DERECHA - SIGN IN / SIGN OUT */}
          {/* ================================================= */}

          <div className="justify-self-end">

            {dataUser ? (

              <button
                onClick={logout}
                className="text-verdeclaro text-lg whitespace-nowrap"
              >
                Sign Out
              </button>

            ) : (

              <Link
                href={PATHROUTES.LOGIN}
                className="text-verdeclaro text-lg whitespace-nowrap"
              >
                Sign In / Sign Up
              </Link>

            )}

          </div>

        </div>

      </Container>

    </div>
  );
};

export default Navbar;