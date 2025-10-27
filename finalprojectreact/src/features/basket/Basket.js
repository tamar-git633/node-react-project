import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useDeleteProdFromBasketMutation, useViewBasketQuery, usePlusProdMutation, useMinusProdMutation } from "./basketApiSlice"
import { InputNumber } from 'primereact/inputnumber';
import { ColorPicker } from 'primereact/colorpicker';
import Order from "./Order"
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Basket = () => {
    const token = localStorage.getItem("token")
    const t=jwtDecode(token)
    const userName=t.firstName
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [deleteProdFromBasket, { }] = useDeleteProdFromBasketMutation()
    const [plusProd, { }] = usePlusProdMutation()
    const [minusProd, { }] = useMinusProdMutation()
    const { data, refetch } = useViewBasketQuery(token);
    const products = data?.basket || [];
    const totalSum = data?.totalSum || 0;
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(false);
    const navigate=useNavigate()

    useEffect(() => {
        refetch()
    }, []);

    const deleteProd = async (barcode, token) => {
        await deleteProdFromBasket({ barcode, token })
        refetch();
    }
    const plusProduct = ({ barcode, token }) => {
        plusProd({ barcode, token })
        refetch()
    }
    const minusProduct = ({ barcode, token }) => {
        minusProd({ barcode, token })
        refetch()
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
    };

    const imageBodyTemplate = (product) => {
        return <img src={`/images/${product.img}`} alt={product.img} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.amount} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product) => {
        if (product.amount > 10) return 'success';
        else if (product.amount > 0) return 'warning';
        else return 'danger';
    };
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <span>{`😁${userName} שלום לך`}</span>
            <span>{`סכום סה"כ ₪${totalSum}`}</span>
            <Button icon="pi pi-shopping-bag" severity="warning" label="להזמנה" onClick={() => products.length > 0 ? setVisible(true) : alert("הסל ריק")}/>
            <Button icon="pi pi-refresh" rounded raised />
             <Button icon="pi pi-refresh" rounded raised label="לחזרה לחנות" style={{ backgroundColor: 'red' }}  onClick={() => navigate("/seeall")}></Button>
        </div>
    );
    const footer = `In total there are ${products.length} products. Selected: ${selectedProducts.length}`;
    return (<>
        <div className="card">

            <DataTable value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="barcode" header={header} footer={footer}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="name" header="Name"></Column>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                <Column field="category" header="Category"></Column>
                <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
                <Column header="Quantity" body={(product) => (
                    <div className="card flex justify-content-center">
                        <InputNumber
                            value={product.quantity || 1}
                            onValueChange={(e) => {
                                const newValue = e.value;
                                const oldValue = product.quantity || 1;

                                if (newValue > oldValue) {
                                    plusProduct({ barcode: product.barcode, token });
                                } else if (newValue < oldValue) {
                                    minusProduct({ barcode: product.barcode, token });
                                }

                                setValue(newValue);
                            }}
                            showButtons
                            buttonLayout="vertical"
                            style={{ width: '4rem' }}
                            inputStyle={{ pointerEvents: 'none' }}
                            decrementButtonClassName="p-button-secondary"
                            incrementButtonClassName="p-button-secondary"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                        />
                    </div>
                )}
                />
                <Column
                    field="delete"
                    header="Delete"
                    body={(product) => (
                        <Button
                            icon="pi pi-trash"
                            onClick={() => deleteProd(product.barcode, localStorage.getItem("token"))}
                            className="p-button-rounded p-button-danger"
                        />
                    )}
                ></Column>
            </DataTable>
            <Order visible={visible} onHide={() =>setVisible(false)} totalSum={totalSum}></Order>
             <Button icon="pi pi-refresh" rounded raised label="לחזרה לחנות" style={{ backgroundColor: 'red' }}  onClick={() => navigate("/seeall")}></Button>
        </div>
    </>
    )
}

export default Basket