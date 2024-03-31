export default {
  name: 'rating',
  title: 'Rating',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
    },
    {
      name: 'value',
      title: 'Value',
      type: 'number',
    },
  ],
}
