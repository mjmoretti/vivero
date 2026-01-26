import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
   
    name: "Lavanda",
    description: "La Lavanda, Lavandula Dentata o Lavanda Dentata es una planta perenne, aromática de porte robusto. La Lavanda es conocida por su particular aróma y el intenso color de sus flores. Pertenece a la familia Lamiaceae y es originaria de la región mediterránea, Canarias, Madeira y Sureste de Asia.",
    price: 1800,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2020/12/Fotos-web-3.png",
    categoryId: 1
  },
  {
  
    name: "Copete",
    description: "El Copete, científicamente conocido como Tagetes erecta, es una especie de planta que se ha ganado un lugar especial en jardines y paisajes gracias a su distintiva apariencia y sus múltiples usos. Originaria de México, esta planta pertenece a la familia Compositae y es conocida por su vibrante colorido y su capacidad para atraer a polinizadores.",
    price: 2500,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/21-1.png",
    categoryId: 2
  },
  {
   
    name: "Flor de azúcar",
    description: "La Begonia semperflorens, comunmente llamada Flor de azúcar, es originaria de Brasil. Sus tallos carnosos y ramificados le brindan un porte compacto y elegante, que se completa con sus hojas ovales y redondeadas que pueden asumir coloraciones rojizas en múltiples tonalidades. Sus flores reunidas en cimas axilares de color rosa, rojo o blanco, brotan durante todo el año y componen el toque final de la bella presencia que la Flor de Azúcar brinda a cualquier espacio.",
    price: 2000,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/1-10.png",
    categoryId: 3
  },
  {
    
    name: "Sansevieria",
    description: "Stay connected and healthy with the Apple Watch Series 6: track your workouts, monitor your health, and stay in touch with the people and information you care about most. Experience the future of health and wellness with the Apple Watch Series 6.",
    price: 6000,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2020/12/16.jpg",
    categoryId: 4
  },
  {
   
    name: "Pothus",
    description: "El Pothus (Epipremnum aureum), planta nativa del sudeste asiático, es una liana que tiene la característica de trepar mediante raíces aereas. Sus hojas son de color verde intenso con variaciones, según la planta.",
    price: 6300,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/10-3.png",
    categoryId: 5
  },
  {
    
    name: "Hypoestes",
    description: "Hypoestes es un género de plantas con flores perteneciente a la familia Acanthaceae. El hypoestes phyllostachya, conocida como hoja de sangre, planta de lunares o paleta de pintor, es una planta herbácea originaria de las selvas tropicales de África y Asia.",
    price: 1500,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/11-1-1.png",
    categoryId: 6
  },
  {
    
    name: "Cretona",
    description: "La Cretona es una planta originaria de la India, Java y las regiones de clima tropical del sureste asiático. Se trata de una planta de naturaleza herbácea o semiarbustiva, que puede ser perenne o anual. Sus hojas son opuestas, simples, en forma de corazón y son su principal atractivo ya que se cultiva por la belleza de su color, muy variado y decorativo. Tiene multitud de variedades cuyos colores varían entre el verde y el amarillo, el rojo, el bronce, el púrpura y el gris, todos ellos variadamente jaspeados.",
    price: 2600,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/Cretona.png",
    categoryId: 7
  },
  {
    
    name: "Clavelina",
    description: "La Clavelina (Dianthus chinensis) es originaria de Corea, Mongolia y China; es este último país el que le da el nombre con el que se conoce de forma popular: clavel chino. Esta disparidad geográfica que mencionamos nos da una pista de una de sus bondades: es una planta sumamente versátil, capaz de resistir el calor pero también el frío. Siempre sorprende con lo colorido de sus flores y la gran variedad de las mismas: rojo, escarlata, blanco, rosa, rosa carmín, púrpura y mezcla de todas las anteriores.",
    price: 2000,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2020/12/8-2.png",
    categoryId: 8
  }
]


export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
