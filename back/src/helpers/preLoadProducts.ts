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
    categoryId: 8
  },
  {
  
    name: "Copete",
    description: "El Copete, científicamente conocido como Tagetes erecta, es una especie de planta que se ha ganado un lugar especial en jardines y paisajes gracias a su distintiva apariencia y sus múltiples usos. Originaria de México, esta planta pertenece a la familia Compositae y es conocida por su vibrante colorido y su capacidad para atraer a polinizadores.",
    price: 2500,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/21-1.png",
    categoryId: 8
  },
  {
   
    name: "Flor de azúcar",
    description: "La Begonia semperflorens, comunmente llamada Flor de azúcar, es originaria de Brasil. Sus tallos carnosos y ramificados le brindan un porte compacto y elegante, que se completa con sus hojas ovales y redondeadas que pueden asumir coloraciones rojizas en múltiples tonalidades. Sus flores reunidas en cimas axilares de color rosa, rojo o blanco, brotan durante todo el año y componen el toque final de la bella presencia que la Flor de Azúcar brinda a cualquier espacio.",
    price: 2000,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/1-10.png",
    categoryId: 8
  },
  {
    
    name: "Sansevieria",
    description: "La Sansevieria (ahora clasificada dentro del género Dracaena) es una de las plantas de interior más populares y resistentes, comúnmente llamada Lengua de suegra o Espada de San Jorge. Es perfecta para principiantes gracias a su gran tolerancia al descuido y su capacidad para purificar el aire de los ambientes.",
    price: 6000,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2020/12/16.jpg",
    categoryId: 7
  },
  {
   
    name: "Pothus",
    description: "El Pothus (Epipremnum aureum), planta nativa del sudeste asiático, es una liana que tiene la característica de trepar mediante raíces aereas. Sus hojas son de color verde intenso con variaciones, según la planta.",
    price: 6300,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/10-3.png",
    categoryId: 7
  },
  {
    
    name: "Hypoestes",
    description: "Hypoestes es un género de plantas con flores perteneciente a la familia Acanthaceae. El hypoestes phyllostachya, conocida como hoja de sangre, planta de lunares o paleta de pintor, es una planta herbácea originaria de las selvas tropicales de África y Asia.",
    price: 1500,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/11-1-1.png",
    categoryId: 7
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
  },
  {
    name: "Pezuña de vaca",
    description: "La pezuña de vaca (o pata de vaca) es un árbol de la familia de las leguminosas (Fabaceae), originario de Sudamérica. Es muy apreciado en jardinería por sus hermosas flores tipo orquídea y sus hojas profundamente bilobuladas, que simulan la huella de una pezuña",
    price: 44000,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2025/04/pezuna-de-vaca-vivero-agronomia-1.png",
    categoryId: 9
  },
  {
    name: "Blum Nórdico esmaltado",
    description: "Las macetas Blum Nórdico Esmaltado son la síntesis perfecta entre la calidez de la terracota y el minimalismo escandinavo. Fabricadas con arcilla cocida de alta calidad, estas piezas conservan la nobleza del material natural, permitiendo una óptima aireación de las raíces y ayudando a regular la humedad del sustrato de forma orgánica. Su acabado esmaltado no solo aporta un brillo sofisticado y una textura suave al tacto, sino que también actúa como una capa protectora que facilita la limpieza y asegura su durabilidad frente al paso del tiempo. Con una silueta nórdica de líneas limpias y armoniosas, esta maceta se convierte en un objeto de diseño capaz de elevar cualquier rincón, integrándose perfectamente en espacios modernos, industriales o minimalistas. ",
    price: 6200,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2025/12/Fotos-web-1.png",
    categoryId: 11
  },
  {
    name: "Blum Bomba",
    description: "Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar. Las macetas de terracota no se deterioran con los rayos UV, pudiendo permanecer a la intemperie sin daños. Su peso impide que el viento o alguna mascota las tire. Protegen mejor las raíces de las plantas frente a lluvias prolongadas, heladas o sol directo. Cuando se calienta la maceta, la humedad se evapora desde su exterior gracias a la porosidad del material. Su permeabilidad permite que las raíces de las plantas se nutran de aire y humedad, fundamentales para su buen desarrollo. Actúan como esponjas absorbiendo el exceso de humedad de la tierra. La nobleza y simplicidad de la terracota les otorga la facilidad de realizar diversas intervenciones, manualidades y trabajos de decoración sobre ellas, como por ejemplo pintarlas. ",
    price: 3300,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/bomba-macetas-blum-maceteria-de-barro-vivero-agronomia.png",
    categoryId: 11
  },
  {
    name: "Terrafertil Dark Green",
    description: "Terrafertil Dark Green, con Sulfato de Hierro desarrolla el verde intenso del follaje, especialmente en azaleas, camelias, gardenias, hortensias, cítricos y otras plantas que prefieren suelos ácidos.",
    price: 10800,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/6-7.png",
    categoryId: 14
  },
 {
    name: "Cactus injertado",
    description: "Conocido por sus vibrantes tonos rojos, naranjas, amarillos o rosados, el cactus injertado  aporta un toque de color único a cualquier espacio. Al no producir suficiente clorofila para sobrevivir por sí solo, se injerta sobre otro cactus verde que le sirve de soporte y nutrición. Compacto y fácil de cuidar, crece bien en macetas pequeñas, con buena luz indirecta y riegos moderados. Ideal para quienes buscan una planta llamativa, resistente y de bajo mantenimiento.",
    price: 16800,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2025/08/Fotos-web-1-1.png",
    categoryId: 16
  },
  {
    name: "Crasas",
    description: "Las crasas, también conocidas como suculentas, son plantas resistentes y de bajo mantenimiento que almacenan agua en sus hojas, tallos o raíces, lo que les permite sobrevivir en condiciones secas. Son ideales tanto para interiores como para exteriores, gracias a su variedad de formas, colores y tamaños. Estas plantas no solo embellecen cualquier espacio, sino que también mejoran la calidad del aire y requieren cuidados mínimos. ",
    price: 2500,
    stock: 10,
    image: "https://viveroagronomia.com.ar/wp-content/uploads/2024/07/14.png",
    categoryId: 17
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
