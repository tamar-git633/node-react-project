import { useNavigate, useParams } from "react-router-dom"
import { useUpdateProductMutation } from "./productApiSlice"
import { useState, useEffect } from "react"
import { useAddProductMutation } from "./productApiSlice"
import { useDispatch } from "react-redux"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import React from "react";
import { Dialog } from 'primereact/dialog';

const UpdateProduct = () => {

     const [visible, setVisible] = useState(false);
   const footerContent = (
    <div>
        <Button label="ביטול" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
    </div>
);

    const [updateProduct, { isError, isSuccess, error, data }] = useUpdateProductMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { barcode } = useParams()
    const barcode2 = Number(barcode)

    const [formData, setFormData] = useState({
        barcode: barcode2,
        name: '',
        madeIn: '',
        designer: '',
        price: 0,
        amount: 0,
        isSale: false,
        percents: 0,
        category: ""
    })
    const categories =
        ['חדרי בנים', 'חדרי בנות', 'חדרי שינה','סלונים', 'מטבחים']
    const [, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        if (isSuccess) {
            alert("update successfully😀")
            navigate("/seeall")
        }
         if (isError)
            setErrorMessage("אחד או יותר מהנתונים שהזנת שגויים")
    }, [isSuccess, isError]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProduct(formData)
    }
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

   return (
        <div className="card flex justify-content-center">
            <form onSubmit={handleSubmit} className="form-addProduct w-full md:w-8 lg:w-6">
                <h2 className="title-addProduct">עדכון מוצר</h2>

                <div className="flex flex-column gap-4">

                    <div className="flex flex-column">
                        <label className="mb-1">שם מוצר</label>
                        <FloatLabel>
                            <InputText name="name" id="name" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">ארץ ייצור</label>
                        <FloatLabel>
                            <InputText name="madeIn" id="madeIn" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">מעצב</label>
                        <FloatLabel>
                            <InputText name="designer" id="designer" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">מחיר</label>
                        <FloatLabel>
                            <InputText name="price" id="price" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">כמות</label>
                        <FloatLabel>
                            <InputText name="amount" id="amount" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">במבצע?</label>
                        <FloatLabel>
                            <InputText name="isSale" id="isSale" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">אחוזי הנחה</label>
                        <FloatLabel>
                            <InputText name="percents" id="percents" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">כתובת תמונה</label>
                        <FloatLabel>
                            <InputText name="img" id="img" onChange={handleChange} />
                        </FloatLabel>
                    </div>

                    <div className="flex flex-column">
                        <label className="mb-1">קטגוריה</label>
                        <Dropdown
                            value={formData.category}
                            name="category"
                            onChange={handleChange}
                            options={categories}
                            placeholder="בחר קטגוריה"
                            className="w-full"
                        />
                    </div>

                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    <Button label="עדכן מוצר" icon="pi pi-check" onClick={load} type="submit" />
                </div>
            </form>
        </div>
    )
}
export default UpdateProduct
