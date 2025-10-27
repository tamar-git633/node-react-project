import { Outlet } from "react-router-dom"
import Menue from "./Menue"

const LayOut= () =>{
    return (
        <>
        <Menue></Menue>
        <main>
        <Outlet></Outlet>
        </main>
        </>
    )
}
export default LayOut