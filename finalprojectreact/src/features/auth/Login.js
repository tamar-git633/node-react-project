import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";

const Login = () => {
    const [login, { isError, isSuccess, error, data }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userName: '',
        passWord: ''
    });
    const [, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data));
            alert("הי ברוך שובך")
            navigate("/seeall");
        };
        if (isError) {
            const message = "משתמש לא קיים"
            setErrorMessage(message)
        };
    }, [isSuccess, data, dispatch, navigate, isError, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        login(formData);
    };
    const register = () => {
        navigate("/Register")
    }

    // return (
    // <div className="login-container">
    //     <h2 className="title-login">Login</h2>
    //     {errorMessage&&<p style={{color:"red"}}>{errorMessage}</p>}
    //     <form onSubmit={(e) => handleSubmit(e)} className="form-login">
    //         <div className="login-part">
    //             <label>userName:</label>
    //             <input onChange={(e) => handleChange(e)} name="userName" required />
    //         </div>
    //         <div className="login-part">
    //             <label>password:</label>
    //             <input onChange={(e) => handleChange(e)} name="passWord" required />
    //         </div>
    //           <div className="card flex justify-content-center">
    //     <Button label="Submit" type="submit" />
    // </div>
    //     </form>
    // </div>
    // );
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form-login">
            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <h2 className="title-login">Login</h2>
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Username</label>
                            <FloatLabel>
                                <InputText name="userName" id="username" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">password</label>
                            <FloatLabel>
                                <InputText name="passWord" id="passWord" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <Button label="Submit" icon="pi pi-check" onClick={load} type="submit" />
                        <p>הצטרף למאות לקוחות מרוצים – <a href="" onClick={register}>הירשם עכשיו</a></p>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default Login;