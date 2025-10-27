import { useNumbersQuery, useEmailMutation } from "./actorApiSlice"
import "./actor.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Actor = () => {
    const { data, isLoading, refetch } = useNumbersQuery()
    const [sendEmail, { isSuccess }] = useEmailMutation()
    const userName = localStorage.getItem("name")

    const [count, setCount] = useState(0)
    const [index, setIndex] = useState(0)
    const [arrGetColors, setArrGetColors] = useState([])
    const [arrRes, setArrRes] = useState([])
    const [degel, setDegel] = useState(false)
    const navigate = useNavigate()
    const [currentColor, setCurrentColor] = useState(null);
    const [showCircles, setShowCircles] = useState(true)

    const [arrPlay, setArrPlay] = useState([])

    const arrColors = ['red', 'blue', 'yellow', 'green', 'pink', 'purple', 'orange', 'grey']

    useEffect(() => {
        if (data)
            setArrPlay([arrColors[data.num1], arrColors[data.num2], arrColors[data.num3], arrColors[data.num4]])
        if (isSuccess)
            console.log("email sent")
        console.log(arrPlay)
    }, [isSuccess, data])

    const getColor = (e) => {
        const color = e.target.value
        const newColors = [...arrGetColors, color]
        setArrGetColors(newColors)
        setCurrentColor(color)
        const newCount = count + 1
        setCount(newCount)
        setIndex(index + 1)
        console.log(newCount)
        if (newCount === 4) {
            checkFunc(newColors)
            setShowCircles(true)

        }
    }

   
    const checkFunc = async (colors) => {
         const newRes = []
        for (let index = 0; index < 4; index++) {
            let col = 'ttt'
            if (arrPlay[index] == colors[index])
                col = 'white'
            else for (let index2 = 0; index2 < 4; index2++) {
                if (arrPlay[index] == colors[index2])
                    col = 'black'
            }
            newRes.push(col)
        }
        setArrRes(newRes)
        console.log("תוצאה:", newRes)

        if (newRes.indexOf("black") == -1 && newRes.indexOf("ttt") == -1) {
            setDegel(true)
            alert("ניצחת😁")
            await sendEmail({ winner: userName })
        }
        else {
    setTimeout(() => {
        alert(newRes)
    setArrRes([])
    setArrGetColors([])
    setCount(0)
    setIndex(0)
    setShowCircles(false)
}, 500)
            return
        }
    }

    return (<>
        <div className="cls1">
            <span style={{ color: 'red' }}>הי {userName}</span>
            {degel == true ? (<div className="div3"><div>ניצחת!!!</div>
                <button onClick={() => { setDegel(false); setArrGetColors([]); setArrRes([]); setCount(0); setIndex(0); refetch() }}>למשחק חדש</button></div>) :
                (<>
                    <button value="red" style={{ backgroundColor: 'red' }} onClick={(e) => getColor(e)}>red</button>
                    <button value="blue" style={{ backgroundColor: 'blue' }} onClick={(e) => getColor(e)}>blue</button>
                    <button value="yellow" style={{ backgroundColor: 'yellow' }} onClick={(e) => getColor(e)}>yellow</button>
                    <button value="green" style={{ backgroundColor: 'green' }} onClick={(e) => getColor(e)}>green</button>
                    <button value="pink" style={{ backgroundColor: 'pink' }} onClick={(e) => getColor(e)}>pink</button>
                    <button value="purple" style={{ backgroundColor: 'purple' }} onClick={(e) => getColor(e)}>purple</button>
                    <button value="orange" style={{ backgroundColor: 'orange' }} onClick={(e) => getColor(e)}>orange</button>
                    <button value="grey" style={{ backgroundColor: 'grey' }} onClick={(e) => getColor(e)}>grey</button></>)}
            {showCircles && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    {arrGetColors.map((color, i) => (
                        <div
                            key={i}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: color,
                                margin: "0 5px"
                            }}
                        />
                    ))}
                </div>
            )}
            {/* {arrRes.length === 4 &&
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    {arrRes.map((col, i) => (
                        <div
                            key={i}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: col,
                                margin: "0 5px"
                            }}
                        />
                    ))}
                </div>
            } */}
        </div>
        {arrPlay}
    </>)
}


export default Actor