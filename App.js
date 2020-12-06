import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from './components/alert'

//first letter while importing the functional component should be capital

const initialExpenses = localStorage.getItem("expenses")? JSON.parse(localStorage.getItem("expenses")):[]


function App()  
  {

    const [expenses, setExpenses]=useState(initialExpenses)
    const [charge, setCharge]=useState("")
    const [amount, setAmount]=useState("")
    const [alert, setAlert]=useState({show:false})
    const [edit, setEdit]=useState(false)
    const [id, setId]=useState(0)

    const handleCharge = (e) => {
      setCharge(e.target.value)
    }

    const handleAmount = (e) => {
      setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const entry = {id: Math.random() * 10, charge, amount}
      if(charge!=="" && amount>0)
        { 
          if(edit){
            let tempExpenses = expenses.map((expense) => 
               expense.id === id?{...expense, charge, amount}:expense
            )
            setExpenses(tempExpenses)
            handleAlert({type:'success', text:"Item edited"})
            setEdit(false)
          }
          else{
            setExpenses([...expenses, entry])
            handleAlert({ type:'success', text:'Item added'})
          }
          
        }
      else{
          handleAlert({type:'danger', text:'Cannot add an item without charge or amount<=0'})
      }
      setCharge("")
      setAmount("")
    }

    const handleAlert = ({type,text}) => {
        setAlert({show:true, type, text})
        setTimeout(() => {
          setAlert({show:false})
        },5000)
    }

    const handleDelete = (id) => {
      const tempExpenses = expenses.filter((expense) => !(expense.id === id) && expense )
      setExpenses(tempExpenses)
      handleAlert({type:'danger', text:'Item deleted'})
    }

    const handleEdit = (id) => {
      setEdit(true)
      let expense=expenses.find((item) => item.id===id)
      setCharge(expense.charge)
      setAmount(expense.amount)
      setId(id)
    }

    const clearItems = () => {
      setExpenses([])
      handleAlert({type:'danger', text:"All items deleted"})
    }

    useEffect(() => {
      console.log("We called useEffect")
      localStorage.setItem("expenses", JSON.stringify(expenses))
    },[expenses])

    return (
      <>
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <Alert />
        <h1>Budget Calculator</h1>
        <main className="App">
          <ExpenseForm 
            charge={charge} 
            amount={amount} 
            handleCharge={handleCharge} 
            handleAmount={handleAmount}
            handleSubmit={handleSubmit}
            edit={edit}
          />
          <ExpenseList 
            expenses={expenses} 
            setExpenses={setExpenses} 
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearItems={clearItems}
          />
        </main>
        <h1>
          Total Spending: <span className="total">
            ${" "}
            {expenses.reduce((acc,curr)=>{
              return acc += Number(curr.amount)
            },0)}
          </span>
        </h1>
      </>
    )
  }

export default App;