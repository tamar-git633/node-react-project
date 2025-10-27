export const ProductService = {
  getProductsData(category = "") {
    const url = category 
        ? `http://localhost:2500/api/product/seeall/${category}` 
        : `http://localhost:2500/api/product/seeall`;

    return fetch(url)
        .then(res => res.json());
},

 async getProductsMini() {
    const data = await this.getProductsData();
    return data.slice(0, 5);
},

getProductsSmall(token) {
        return fetch("http://localhost:2500/api/product/viewbasket", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => data.basket || []);
    },
    

async getProducts() {
    return await this.getProductsData();
},

async getProductsWithOrdersSmall() {
    const data = await this.getProductsWithOrdersData();
    return data.slice(0, 10);
},

async getProductsWithOrders() {
    return await this.getProductsWithOrdersData();
},
async getProductsWithOrdersData() {
    const res = await fetch("http://localhost:2500/api/product/withorders");
    return await res.json();
}
};

export default ProductService