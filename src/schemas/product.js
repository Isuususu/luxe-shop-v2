export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      title: "Specification",
      name: "specification",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "stars",
      title: "Stars",
      type: "number",
    },
    {
      name: "ratings",
      title: "Ratings",
      type: "number",
    },
  ],
};
