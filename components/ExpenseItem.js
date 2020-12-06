import React from "react"
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
    const{id, charge, amount} = expense

    return(
        <li className="item"> 
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                <button className="edit-btn" aria-label="edit button"></button>
                <MdEdit onClick={() => handleEdit(id)}/>
                <button className="clear-btn" aria-label="delete button"></button>
                <MdDelete onClick={() => handleDelete(id)} />
            </div>
        </li>
    )
}

export default ExpenseItem