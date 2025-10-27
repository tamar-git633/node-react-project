import { useSignUpFuncMutation } from "./playerApiSlice"
import { useNavigate } from "react-router-dom"
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import Game from "./Game";
// import usePlayer from "./usePlayer"

const SignUp = () => {

    const [signUpFunc, { isError, isSuccess,error, data }] = useSignUpFuncMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [count,setCount]=useState(1)
    const [arrPlayers,setArrPlayers]=useState([])
    const [playerName,setPlayerName]=useState('')
    const [formData, setFormData] = useState({
        name: '',
        numBegin: 0,
        numEnd: 0,
        winner: false
    })
     const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (isSuccess) {
           console.log(`success ${count} players`)
            setCount(count+1)
        };
        if (isError) {
            if (error.originalStatus === 409)
                setErrorMessage("משתמש קיים");
            if (error.originalStatus === 404)
                setErrorMessage("אחד או יותר מהשדות שהזנת שגויים");
        }
          console.log(arrPlayers)
    }, [isSuccess, isError, data, error, dispatch, navigate,arrPlayers]);

    const handleChange = (e) => {
        setPlayerName(e.target.value)
        setFormData({
            ...formData,
            name:e.target.value,
            numBegin:0,
            numEnd:0
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
         setArrPlayers(prev =>[...prev,formData.name])
        signUpFunc(formData)
    }

    return (
        <>
            <form>
                <div className="namePlayer">
                    <label className="w-6rem">Add-User {count}</label>
                    <FloatLabel>
                        <InputText name="name" onChange={(e) => handleChange(e)} />
                    </FloatLabel>
                </div>
               {count<=2 && <Button label="Submit" onClick={(e)=> handleSubmit(e)}/>}
                {errorMessage?<p style={{ color: "red" }}>{errorMessage}</p>:<p></p>}
                {count==3 &&<Game name={arrPlayers}></Game>}
            </form>
        </>
    )
}

export default SignUp