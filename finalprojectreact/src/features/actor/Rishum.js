import {useRishumMutation} from "./actorApiSlice"
import { useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import {actorSlice} from "./actorSlice"

const Rishum=()=>{

const [rishumFunc,{isSuccess}]=useRishumMutation()
const navigate=useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        name: '',
    })
     const handleChange = (e) => {
        setFormData({
            ...formData,
            name:e.target.value,
        })
    }
    const handleSubmit = (e) => {
        localStorage.setItem("name",formData.name)
        e.preventDefault()
        rishumFunc(formData)
    }
     useEffect(() => {
            if (isSuccess) {
               alert('נרשמת בהצלחה')
               navigate("/actor")
            }
        }, [isSuccess]);

    return(<>
           <form>
                    <div className="namePlayer">
                        <label className="w-6rem">הכנס שם</label>
                        <FloatLabel>
                            <InputText name="name" onChange={(e) => handleChange(e)} />
                        </FloatLabel>
                    </div>
                   <Button label="Submit" onClick={(e)=> handleSubmit(e)}/>
                    {errorMessage?<p style={{ color: "red" }}>{errorMessage}</p>:<p></p>}
                </form>
    </>)
}
export default Rishum