import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"

const useAuth = () => {

    const token = useSelector((state) => state.auth.token)
    const obj = jwtDecode(token)

    const {firstName, lastName, userName, roles, phone, email} = obj

    return {firstName, lastName, userName, roles, phone, email}
}

export default useAuth