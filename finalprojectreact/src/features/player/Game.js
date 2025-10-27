import { data } from "react-router-dom"
import { useGameQuery } from "./playerApiSlice"
import './game.css';
import { useState } from "react";
import { useEffect } from "react";
import { useLogMutation } from "./playerApiSlice"
import { useNavigate } from "react-router-dom";

const Game = ({ name }) => {

    const { data: nums = {}, isLoading, refetch } = useGameQuery()
    const [logFunc, { }] = useLogMutation()
    const { start1, start2, end1, end2 } = nums
    const [Tstart1, setTstart1] = useState(0)
    const [Tstart2, setTstart2] = useState(0)
    const [Tend1, setTend1] = useState(0)
    const [Tend2, setTend2] = useState(0)
    const navigate=useNavigate()

    const [active1, setActive1] = useState(true)
    const [active2, setActive2] = useState(false)
    const [winner1, setWinner1] = useState(false)
    const [winner2, setWinner2] = useState(false)
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    
    useEffect(() => {
        if (start1 != undefined) {
            setTstart1(start1)
            setTstart2(start2)
            setTend1(end1)
            setTend2(end2)
            if (winner1 || winner2)
                log()
        }
    }, [start1, start2, end1, end2,winner1, winner2]
    )

    const log = async () => {
        // const content = `${name[0]}, numSteps: ${count1}, winner? ${winner1},
        // ${name[1]}, numSteps: ${count2}, winner? ${winner2}`
        const content = {
            content: `${name[0]}, numSteps: ${count1}, winner? ${winner1},
         ${name[1]}, numSteps: ${count2}, winner? ${winner2}`
        }
        await logFunc(content)
    }

    const fuction1= () =>{
        navigate("/signup")
    }

    const plus1 = () => {
        const newValue = Tstart1 + 1
        setTstart1(newValue)
        if (newValue == end1) {
            setWinner1(true)
        }
        setActive1(false)
        setActive2(true)
        setCount1(count1 + 1)
    }
    const minus1 = () => {
        const newValue = Tstart1 - 1
        setTstart1(newValue)
        if (newValue == end1) {
            setWinner1(true)
        }
        setActive1(false)
        setActive2(true)
        setCount1(count1 + 1)
    }
    const pi2 = () => {
        const newValue = Tstart1 * 2
        setTstart1(newValue)
        if (newValue == end1) {
            setWinner1(true)
        }
        setActive1(false)
        setActive2(true)
        setCount1(count1 + 1)
    }
    const s2 = () => {
        const newValue = Tstart1 / 2
        setTstart1(newValue)
        if (newValue == end1) {
            setWinner1(true)
        }
        setActive1(false)
        setActive2(true)
        setCount1(count1 + 1)
    }
    const Splus1 = () => {
        const newValue = Tstart2 + 1
        setTstart2(newValue)
        if (newValue == end2) {
            setWinner2(true)
        }
        setActive2(false)
        setActive1(true)
        setCount2(count2 + 1)
    }
    const Sminus1 = () => {
        const newValue = Tstart2 - 1
        setTstart2(newValue)
        if (newValue == end2) {
            setWinner2(true)
        }
        setActive2(false)
        setActive1(true)
        setCount2(count2 + 1)
    }
    const Spi2 = () => {
        const newValue = Tstart2 * 2
        setTstart2(newValue)
        if (newValue == end2) {
            setWinner2(true)
        }
        setActive2(false)
        setActive1(true)
        setCount2(count2 + 1)
    }
    const Ss2 = () => {
        const newValue = Tstart2 / 2
        setTstart2(newValue)
        if (newValue == end2) {
            setWinner2(true)
        }
        setActive2(false)
        setActive1(true)
        setCount2(count2 + 1)
    }

    return (<>
        {(winner1 || winner2) && <button onClick={()=> fuction1()}>play again</button>}
        {(!winner1 && !winner2) &&
            <div> <div>
                name1: {name[0]},<br></br>
                startnum1: {start1},<br></br>
                endnum1: {end1},<br></br>
                name2: {name[1]}<br></br>
                startnum2: {start2},<br></br>
                endnum2: {end2}<br></br>
            </div><div className="div2">
                    {active1 && !active2 &&
                        <div className="div1">{end1}
                            <div className="div3">{Tstart1}</div>
                            <div><button onClick={() => plus1()}>+1</button>
                                <button onClick={() => minus1()}>-1</button>
                                <button onClick={() => pi2()}>X2</button>
                                <button onClick={() => s2()}>:2</button>
                            </div>
                        </div>}

                    {active2 && !active1 &&
                        <div className="div1">{end2}
                            <div className="div3">{Tstart2}</div>
                            <div><button onClick={() => Splus1()}>+1</button>
                                <button onClick={() => Sminus1()}>-1</button>
                                <button onClick={() => Spi2()}>X2</button>
                                <button onClick={() => Ss2()}>:2</button>
                            </div>
                        </div>}
                </div>
            </div>}
        {winner1 && <div>{`the winner ${name[0]}!!!`}</div>}
        {winner2 && <div>{`the winner ${name[1]}!!!`}</div>}
    </>
    )
}

export default Game