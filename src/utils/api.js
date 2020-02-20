export function fetchProducts(products) {
  return new Promise((resolve, reject) => {
    try {
      return resolve(products);
    } catch (error) {
      return reject(error);
    }
  });
}
