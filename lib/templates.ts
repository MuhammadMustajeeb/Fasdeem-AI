// lib/templates.ts

export type Template = {
  id: string;
  name: string;
  description: string;
  data: {
    name: string;
    price: number;
    tone: string;
    length: string;
    language: string;
    category: string;
  };
};

export const templates: Template[] = [
  {
    id: "t1",
    name: "Trendy T-Shirt",
    description: "Catchy short copy for a fashion product",
    data: {
      name: "StreetStyle Oversized T-Shirt",
      price: 25,
      tone: "Casual",
      length: "Short",
      language: "English",
      category: "Fashion",
    },
  },
  {
    id: "t2",
    name: "Luxury Watch",
    description: "Premium and elegant copy for a luxury accessory",
    data: {
      name: "Aureus Gold Chrono Watch",
      price: 450,
      tone: "Luxury",
      length: "Medium",
      language: "English",
      category: "Accessories",
    },
  },
  {
    id: "t3",
    name: "Organic Coffee",
    description: "Warm and inviting copy for organic food product",
    data: {
      name: "Pure Brew Arabica Coffee",
      price: 15,
      tone: "Friendly",
      length: "Medium",
      language: "English",
      category: "Food & Beverage",
    },
  },
  {
    id: "t4",
    name: "Wireless Earbuds",
    description: "Energetic copy for a trending tech gadget",
    data: {
      name: "SonicBeat Wireless Earbuds",
      price: 79,
      tone: "Energetic",
      length: "Short",
      language: "English",
      category: "Electronics",
    },
  },
  {
    id: "t5",
    name: "Fitness App",
    description: "Motivational copy for digital product / SaaS",
    data: {
      name: "FitTrack Pro",
      price: 10,
      tone: "Motivational",
      length: "Long",
      language: "English",
      category: "Digital Product",
    },
  },
];
