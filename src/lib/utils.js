import { client } from "./client";

// import confetti from "canvas-confetti";

// export const runConfetti = () => {
//   function randomInRange(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   confetti({
//     angle: randomInRange(55, 125),
//     spread: randomInRange(50, 70),
//     particleCount: randomInRange(50, 100),
//     origin: { y: 0.6 },
//   });
// };

//Fetch products from Sanity client
export default async function getProducts() {
  const query = '*[_type=="product"]';
  const projects = await client.fetch(query);

  return projects;
}

//Fetch single product from Sanity client
export async function getProduct(slug) {
  const query = `*[_type == 'product' && slug.current == $slug][0]`;
  const productData = await client.fetch(query, { slug: slug });
  return productData;
}
