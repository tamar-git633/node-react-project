import { useNavigate } from "react-router-dom"
import { useAddProductMutation } from "./productApiSlice"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';

const AddProduct = () => {

    const [addProduct, { isError, isSuccess, error, data }] = useAddProductMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const categories =
        ['חדרי בנים', 'חדרי בנות', 'חדרי שינה', 'סלונים', 'מטבחים']

    const [formData, setFormData] = useState({
        barcode: 0,
        name: '',
        madeIn: '',
        designer: '',
        price: 0,
        amount: 0,
        isSale: false,
        percents: 0,
        img: "",
        rating: 0,
        category: "",
        quantity:0
    })
    const [, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        if (isSuccess) {
            alert("add successfully")
            navigate("/seeall");
        };
        if (isError)
            setErrorMessage("אחד או יותר מהנתונים שהזנת שגויים")
    }, [isSuccess, isError]);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (["price", "amount", "percents", "barCode"].includes(name))
            val = Number(value);
        if (name === "isSale")
            val = value.toLowerCase() === "true";
        setFormData({
            ...formData,
            [name]: val
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        addProduct(formData)
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form-addProduct">
            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <h2 className="title-addProduct">Add Product</h2>
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">BarCode</label>
                            <FloatLabel>
                                <InputText name="barcode" id="barcode" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Name</label>
                            <FloatLabel>
                                <InputText name="name" id="name" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">MadeIn</label>
                            <FloatLabel>
                                <InputText name="madeIn" id="madeIn" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Designer</label>
                            <FloatLabel>
                                <InputText name="designer" id="designer" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Price</label>
                            <FloatLabel>
                                <InputText name="price" id="price" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Amount</label>
                            <FloatLabel>
                                <InputText name="amount" id="amount" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">IsSale</label>
                            <FloatLabel>
                                <InputText name="isSale" id="isSale" type='Boolean' onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Percents</label>
                            <FloatLabel>
                                <InputText name="percents" id="percents" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Image</label>
                            <FloatLabel>
                                <InputText name="img" id="img" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <div className="card flex justify-content-center">
                                <Dropdown value={formData.category} name="category" onChange={(e) => handleChange(e)} options={categories}
                                    placeholder="Select a Category" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
                            </div>
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <Button label="Add Product" icon="pi pi-check" onClick={load} type="submit" />
                    </div>
                </div>
            </div>
        </form>
    )
}
export default AddProduct
