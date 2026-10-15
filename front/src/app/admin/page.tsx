"use client";

import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProducts";
import { getAllProductsService } from "@/services/products.services";
import Swal from "sweetalert2";

const AdminPage = () => {
  const { dataUser } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!dataUser) {
      router.push("/login");
      return;
    }
    if (dataUser.user.role !== "admin") {
      router.push("/");
      return;
    }
    fetchProducts();
  }, [dataUser]);

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getAllProductsService();
    setProducts(data);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      categoryId: String(product.categoryId),
    });
    setImagePreview(product.image);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Estás segura?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: dataUser!.token },
      });

      if (!response.ok) throw new Error("Error al eliminar");

      await Swal.fire({ icon: "success", title: "Producto eliminado", timer: 1500, showConfirmButton: false });
      fetchProducts();
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el producto" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct && !imageFile) {
      Swal.fire({ icon: "warning", title: "Falta la imagen", text: "Seleccioná una imagen para el producto" });
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("categoryId", formData.categoryId);
    if (imageFile) data.append("image", imageFile);

    try {
      const url = editingProduct
        ? `http://localhost:3001/products/${editingProduct.id}`
        : "http://localhost:3001/products";

      const method = editingProduct ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: dataUser!.token },
        body: data,
      });

      if (!response.ok) throw new Error("Error al guardar");

      await Swal.fire({
        icon: "success",
        title: editingProduct ? "Producto actualizado" : "Producto creado",
        timer: 1500,
        showConfirmButton: false,
      });

      setShowForm(false);
      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", stock: "", categoryId: "" });
      setImageFile(null);
      setImagePreview(null);
      fetchProducts();
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar el producto" });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", stock: "", categoryId: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  if (!dataUser || dataUser.user.role !== "admin") return null;

  return (
    <section className="min-h-screen bg-slate-900 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Panel de administración</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer"
          >
            + Agregar producto
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingProduct ? "Editar producto" : "Nuevo producto"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-verdeclaro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría ID</label>
                  <input
                    type="number"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-verdeclaro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-verdeclaro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-verdeclaro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-verdeclaro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen {editingProduct && "(opcional — dejá vacío para mantener la actual)"}
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-3 w-24 h-24 object-cover rounded-lg" />
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer"
                >
                  {editingProduct ? "Guardar cambios" : "Crear producto"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos */}
        {isLoading ? (
          <div className="text-center text-white py-8">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                  <p className="text-verdeclaro font-bold mb-3">${product.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPage;