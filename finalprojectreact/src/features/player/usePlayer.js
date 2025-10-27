import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"


const usePlayer = () => {

    const token = useSelector((state) => state.auth.token)
    const obj = jwtDecode(token)

    const {name, numBegin, numEnd, winner} = obj

    return {name, numBegin, numEnd, winner}
}

export default usePlayer