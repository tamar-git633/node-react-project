import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { OrderList } from 'primereact/orderlist';
import { ProductService } from '../product/ProductService';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useDeleteBasketMutation} from "./basketApiSlice"

const Order = ({ visible, onHide, totalSum}) => {
    const [products, setProducts] = useState([]);
    const [deleteBasket,{}] = useDeleteBasketMutation()
    const navigate=useNavigate()

  useEffect(() => {
        const token = localStorage.getItem('token');
        ProductService.getProductsSmall(token).then((data) => setProducts(data));
    }, []);


    const finishOrder=() =>{
        setProducts([])
        alert("הזמנתך בוצעה בהצלחה!!")
        onHide(false)
        deleteBasket()
        navigate("/seeall")
    }

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`images/${item.img}`} alt={item.name}  />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.quantity}</span>
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">{item.price} ₪</span>
            </div>
        );
    };


    return (
        <div className="card flex justify-content-center">
           <Dialog 
            header="להזמנה" 
            visible={visible} 
            maximizable 
            style={{ width: '50vw' }} 
            onHide={onHide}
        >
            <span>{`סכום סה"כ ₪${totalSum}`}</span>
            <div className="card xl:flex xl:justify-content-center">
                <OrderList 
                    dataKey="id" 
                    value={products} 
                    onChange={(e) => setProducts(e.value)} 
                    itemTemplate={itemTemplate} 
                    header="Products" 
                />
            </div>
            <Button label="לאישור ההזמנה" severity="success" onClick={()=> finishOrder()} />
        </Dialog>
        </div>
    )
}

export default Order;