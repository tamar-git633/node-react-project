import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useSeeAllQuery } from "./productApiSlice"
import { useDeleteProductMutation, useUpdateProductMutation } from "./productApiSlice"
import { useAddProdToBasketMutation, useDeleteProdFromBasketMutation } from "../basket/basketApiSlice"
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';

const SeeAll = () => {

    const { data: products = [], isLoading, refetch } = useSeeAllQuery();
    const [deleteProduct, { isError, isSuccess, error, data }] = useDeleteProductMutation()
    const [updateProduct, { isSuccess2 }] = useUpdateProductMutation()
    const [addProdToBasket, { isSuccess3 }] = useAddProdToBasketMutation();
    const navigate = useNavigate()
    const [layout, setLayout] = useState('grid');
    const [value, setValue] = useState(null);
    const [ratings, setRatings] = useState({});
    const [searchParams] = useSearchParams()
    const [word, setWord] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        refetch()
    }, [refetch]);

    const addProd = async (product, barcode, token) => {
        await addProdToBasket({ barcode, token });
        const basket = JSON.parse(localStorage.getItem("basket")) || [];
        const index = basket.findIndex(p => p.barcode === product.barcode);
        if (index !== -1) {
            basket[index].quantity = (basket[index].quantity || 1) + 1;
        } else {
            basket.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        navigate("/basket");
    };

    const { category } = useParams()

    let filteredProducts = category
        ? products.filter(p => p.category.trim().toLowerCase() === category.trim().toLowerCase())
        : products;
    if (category === "search") {
        const w = localStorage.getItem("word") || "";
        filteredProducts = products.filter((item) => item.name.startsWith(w))
    }
    if (category === "sale") {
        filteredProducts = products.filter((item) => item.isSale == true)
    }


    const getSeverity = (product) => {
        if (product.amount == 0)
            return 'danger'
        if (product.amount > 20)
            return 'success';
        return 'warning';
    }
    const deleteProd = (barcode) => {
        deleteProduct({ barcode })
        if (isSuccess) {
            alert("delete successfully")
            refetch();
        }
    }

    const updateProd = (barcode) => {
        navigate(`/updateproduct/${barcode}`);
    };
    const handleRatingChange = (barcode, value) => {
        setRatings(prev => ({
            ...prev,
            [barcode]: value
        }));
    };
    console.log("category from params:", category)
    console.log("filteredProducts:", filteredProducts);

    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product._id || index}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`/Images/${product.img}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating
                                value={ratings[product.barcode] || 0}
                                onChange={(e) => handleRatingChange(product.barcode, e.value)}
                                cancel={false}
                            />
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.amount} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            {/* <span className="text-2xl font-semibold">מעצב:{product.designer}</span> */}
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" style={{ background: "green" }} disabled={product.amount === 'OUTOFSTOCK'} onClick={() => addProd(product, product.barcode, localStorage.getItem("token"))}></Button>
                            {localStorage.getItem("roles") == "manager" && <Button icon="pi pi-trash" style={{ background: "red" }} className="p-button-rounded p-button-danger" onClick={() => deleteProd(product.barcode)}></Button>}
                            {localStorage.getItem("roles") === "manager" && (
                                <Button
                                    icon="pi pi-pencil"
                                    style={{ background: "blue" }}
                                    className="p-button-rounded"
                                    onClick={() => updateProd(product.barcode)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (

            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                {console.log("price:", product.price, "typeof:", typeof product.price)}
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.amount} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`/Images/${product.img}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        {product.isSale && (
                            <Tag
                                value="ONSALE"
                                severity="danger"
                                rounded
                                className="text-white font-bold px-3 py-2"
                                style={{ backgroundColor: 'red', borderRadius: '50px' }}
                            />
                        )}
                        {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                        <div className="card flex justify-content-center">
                            <Rating
                                value={ratings[product.barcode] || 0}
                                onChange={(e) => handleRatingChange(product.barcode, e.value)}
                                cancel={false}
                            />
                        </div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" style={{ background: "green" }} disabled={product.amount === 0} onClick={() => addProd(product, product.barcode, localStorage.getItem("token"))}></Button>
                        {localStorage.getItem("roles") == "manager" && <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProd((product.barcode))}></Button>}
                        {localStorage.getItem("roles") === "manager" && (
                            <Button
                                icon="pi pi-pencil"
                                style={{ background: "blue" }}
                                className="p-button-rounded"
                                onClick={() => updateProd(product.barcode)}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={filteredProducts} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}


export default SeeAll;