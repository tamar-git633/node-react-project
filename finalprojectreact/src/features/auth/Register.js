import { useRegisterMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { setToken } from "./authSlice";
import { Checkbox } from "primereact/checkbox";
import { InputMask } from "primereact/inputmask";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Register = () => {

    const [register, { isError, isSuccess, error, data }] = useRegisterMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        passWord: '',
        phone: '',
        address: ''
    });
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        };
        if (isError) {
            if (error.originalStatus === 409)
                setErrorMessage("משתמש קיים");
            if (error.originalStatus === 404)
                setErrorMessage("אחד או יותר מהשדות שהזנת שגויים");
        }
    }, [isSuccess, isError, data, error, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        register(formData)
    }

    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    };
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };


    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form-register">
            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <h2 className="title-register">Register</h2>
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">FirstName</label>
                            <FloatLabel>
                                <InputText name="firstName" id="firstName" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">LastName</label>
                            <FloatLabel>
                                <InputText name="lastName" id="lastName" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">UserName</label>
                            <FloatLabel>
                                <InputText name="userName" id="userName" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Email</label>
                            <FloatLabel>
                                <InputText name="email" id="email" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="email">Password</label>
                            <FloatLabel>
                                <InputText name="passWord" id="passWord" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Address</label>
                            <FloatLabel>
                                <InputText name="address" id="address" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Phone</label>
                            <FloatLabel>
                                <InputMask name="phone" onChange={(e) => handleChange(e)} id="phone" mask="999-9999999" />
                            </FloatLabel>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient2" name="get" value="get" onChange={onIngredientsChange} checked={ingredients.includes('get')} />
                            <label htmlFor="ingredient2" className="ml-2">לקבלת עדכונים</label>
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <Button label="Submit" icon="pi pi-check" onClick={load} type="submit" />
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Register