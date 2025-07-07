import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosinstance'
import toast from 'react-hot-toast'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Inputs/Modal'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/layouts/DeleteAlert'

const Expense = () => {
  useUserAuth()
   const [expenseData,setExpenseData]=useState([])
  const [loading,setLoading]=useState(false)

  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,data:null
  })

  const [openAddExpenseModel,setOpenAddExpenseModel]=useState(false)
  // get all Income details
  const fetchExpenseDetails=async()=>{
    if(loading) return

    setLoading(true)
    try {
      const resp=await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)
      if(resp.data) setExpenseData(resp.data)
    } catch (error) {
      console.log("Something went wrong")
      
    }finally{
      setLoading(false)
    }
  }

  //  handle add income
  const handleAddExpense=async(expense)=>{
    const {category,amount,date,icon}=expense

    if(!category.trim()) {
      toast.error("Category is required") 
      return
    }
    if(!amount||isNaN(amount)||Number(amount)<=0){
       toast.error("Amount should be valid Number") 
      return
    }
    if(!date){
       toast.error("Date is required") 
      return
    }
    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,amount,date,icon
      })
      setOpenAddExpenseModel(false)
      toast.success("Expense Added SucessFully")
      fetchExpenseDetails()
    }
    catch(err){
      console.log("error",err.resp?.data?.message||err.message)
    }
  }
  // delete income
 const deleteExpense = async (id) => {
  try {
    console.log("Deleting ID:", id)
    const url = `${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`
    console.log("Endpoint:", url)
    await axiosInstance.delete(url)
    setOpenDeleteAlert({ show: false, data: null })
    toast.success("Expense Details Deleted Successfully")
    fetchExpenseDetails()
  } catch (err) {
    console.error("Delete Expense Error:", err)
    toast.error(err.response?.data?.message || "Failed to delete Expense")
  }
}



  // download income
  const handleDownloadExpenseDetails=async()=>{
      try {
    const response = await axiosInstance.get(
      API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      {
        responseType: "blob",
      }
    );

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expense_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading expense details:", error);
    toast.error("Failed to download expense details. Please try again.");
  }
  }


  useEffect(()=>{
      fetchExpenseDetails()
      return ()=>{}
    },[])
  return (
     <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview transactions={expenseData} onExpenseIncome={()=>setOpenAddExpenseModel(true)}/>

          </div>
          <ExpenseList transactions={expenseData} onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id})
          }}
          onDownload={handleDownloadExpenseDetails}/>

        </div>
        <Modal isOpen={openAddExpenseModel} onClose={()=>setOpenAddExpenseModel(false)}
        title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
         <Modal isOpen={openDeleteAlert.show} onClose={()=>{
          setOpenDeleteAlert({show:false,data:null}) 
        }}title="Delete Expense">
          <DeleteAlert content="Are you sure,you want to delete this expense details?" 
          onDelete={()=>deleteExpense(openDeleteAlert.data)}/>
        </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Expense
