
export default function Existance(productParam, productsParam){
    const res = productsParam.filter(product=>product.product._id === productParam.product._id);
    return (res.length > 0) ? true : false;
}