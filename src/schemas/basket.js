export default {
  name: 'basket',
  title: 'Basket',
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
