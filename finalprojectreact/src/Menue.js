import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { clearToken } from "../src/features/auth/authSlice"
import { useDispatch } from 'react-redux';
import SeeAll from './features/product/SeeAll';
import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useSeeAllQuery } from "./features/product/productApiSlice"

const Menue = () => {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const { data: products = [], isLoading, refetch } = useSeeAllQuery();
    const [flag, setFlag] = useState(false)
    const [arrProducts, setArrProducts] = useState([])

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        dispatch(clearToken())
        navigate("/login")
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    const search = (word) => {
        console.log(arrProducts)
        localStorage.setItem("word", word)
        navigate("/seeall/search")
    }


    const [selectedCategory, setSelectedCategory] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = [
        {
            label: 'רישום',
            icon: 'pi pi-edit',
            command: () => navigate("/register")
        },
        {
            label: 'התחבר',
            icon: 'pi pi-sign-in',
            command: () => navigate("/login")
        },
        localStorage.getItem("token") ? {
            label: 'קטגוריות',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'הכל',
                    icon: 'pi pi-bolt',
                    command: () => navigate(`/seeall`)
                },
                {
                    label: 'במבצע',
                    icon: 'pi pi-lightbulb',
                    command: () => navigate(`/seeall/sale`)
                },
                {
                    label: 'חדרי בנים',
                    icon: 'pi pi-user',
                    command: () => navigate(`/seeall/חדרי בנים`)
                },
                {
                    label: 'חדרי בנות',
                    icon: 'pi pi-desktop',
                    command: () => navigate(`/seeall/חדרי בנות`)
                },
                {
                    label: 'חדרי שינה',
                    icon: 'pi pi-image',
                    command: () => navigate(`/seeall/חדרי שינה`)
                },
                {
                    label: 'סלונים',
                    icon: 'pi pi-home',
                    command: () => navigate(`/seeall/סלונים`)

                },
                {
                    label: 'מטבחים',
                    icon: 'pi pi-shop',
                    command: () => navigate(`/seeall/מטבחים`)
                }

            ]
        }
            : {},

        localStorage.getItem("token") ? {
            label: 'התנתק',
            icon: 'pi pi-palette',
            command: () => {
                setVisible(true)
            }
        } : {},
        localStorage.getItem("token") ?
            {
                label: 'סל קניות',
                icon: 'pi pi-shopping-bag',
                command: () => navigate("/basket")
            } : {},
        localStorage.getItem("roles") === "manager" ? {
            label: 'הוסף מוצר',
            icon: 'pi pi-cart-plus',
            command: () => navigate("/addproduct")
        } : {},
        localStorage.getItem("token") ? {
            label: 'מוצרים',
            icon: 'pi pi-image',
            command: () => navigate("/seeall")
        } : {},
    ]


    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => search(e.target.value)} />
            {/* {flag &&< SeeAll arrProducts={arrProducts}/>} */}
        </div>
    );


    return (<>
        <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="האם אתה בטוח שברצונך להתנתק?"
            header="אישור התנתקות"
            icon="pi pi-exclamation-triangle"
            accept={() => {
                dispatch(clearToken());
                navigate("/login");
            }}
            reject={() => setVisible(false)}
        />
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    </>
    )
}

export default Menue