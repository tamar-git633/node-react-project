import { useDeleteProductMutation } from "./productApiSlice"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const DeleteProduct = () => {
    const [deleteProduct, { isError, isSuccess, error, data }] = useDeleteProductMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            alert("delete successfully")
            navigate("/seeall");
        };
    }, [isSuccess]);
    const handleSubmit = (e) => {
        e.preventDefault()
        const barcode = e.target.elements.barcode.value
        deleteProduct({ barcode })
    }
    return (
        <div className="deleteProduct-container">
            <h2 className="title-adeleteProduct">DeleteProduct</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="form-deleteProduct">
                <div className="deleteProduct-part">
                    <label>barcode:</label>
                    <input name="barcode" required />
                </div>
                <button type="submit">DeleteProducr</button>
            </form>
        </div>
    )
}
export default DeleteProduct