"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "react-hot-toast";
import { useSession } from "@supabase/auth-helpers-react";

export default function AdminDashboard() {
  const session = useSession();
  const user = session?.user;

  // Optional: Admin protection
  if (!user)
    return <p className="text-center mt-10">Please log in to access admin.</p>;
  if (user.email !== "mprogramming48@gmail.com") {
    return <p className="text-center mt-10">Access denied: Not admin.</p>;
  }

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load products");
      return;
    }
    setProducts(data || []);
  };

  const handleSubmit = async () => {
    if (!name || !price) return toast.error("Name and price are required");
    if (!user) return toast.error("User not logged in");

    const res = await fetch("/api/upload-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        description,
        whatsapp,
        image: `https://picsum.photos/seed/${Math.random()}/400/300`,
        user_id: user.id,
      }),
    });

    let result;
    try {
      result = await res.json();
    } catch (err) {
      return toast.error("Failed to parse server response");
    }

    if (!result.success) {
      toast.error("Upload failed: " + result.error);
    } else {
      toast.success("Product uploaded");
      setName("");
      setPrice("");
      setDescription("");
      setWhatsapp("");
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch("/api/delete-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();

    if (!result.success) {
      toast.error("Delete failed: " + result.error);
    } else {
      toast.success("Deleted");
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-2xl font-bold">📦 Admin Product Uploader</h1>

      {/* Upload Form */}
      <div className="space-y-4 bg-gray-100 p-4 rounded-md">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="WhatsApp number (e.g. 923001234567)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="input input-bordered w-full"
        />

        <button onClick={handleSubmit} className="btn btn-primary w-full">
          Upload Product
        </button>
      </div>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      {/* Product List */}
      <div className="space-y-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">Price: Rs {p.price}</p>
              <p className="text-sm text-green-700">
                {p.whatsapp && (
                  <a
                    href={`https://wa.me/${
                      p.whatsapp
                    }?text=Hi, I want to buy ${encodeURIComponent(p.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    📲 WhatsApp Link
                  </a>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setEditing(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-lg font-bold">Edit Product</h2>
            <input
              type="text"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: e.target.value })
              }
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={editing.whatsapp || ""}
              onChange={(e) =>
                setEditing({ ...editing, whatsapp: e.target.value })
              }
              className="input input-bordered w-full"
              placeholder="Edit WhatsApp number"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                className="btn btn-ghost"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const { error } = await supabase
                    .from("products")
                    .update({
                      name: editing.name,
                      price: editing.price,
                      whatsapp: editing.whatsapp,
                    })
                    .eq("id", editing.id);

                  if (error) toast.error("Update failed");
                  else {
                    toast.success("Product updated");
                    fetchProducts();
                    setEditing(null);
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
