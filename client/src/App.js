import logo from './logo.svg';
import './App.css';
import { MdClose } from 'react-icons/md'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Formtable from "./components/Formtable"; 

axios.defaults.baseURL = "http://localhost:8080";

function App() {

const [addSection,setAddSection] = useState(false)
const [editSection,setEditSection] = useState(false)
const [formData,setFormData] = useState({
 name : "",
 course : "",
 email : "",
 idNumber : "",
 mobile : "",
});
const [formDataEdit,setFormDataEdit] = useState({
  _id : "",
  name : "",
  course : "",
  email : "",
  idNumber : "",
  mobile : ""
 });
const [dataList,setDataList] = useState([])

const handleOnChange = (e) => {
  const { value, name } = e.target
  setFormData((preve) => {
    return{
      ...preve,
    [name]: value,

    }
   
  })
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await axios.post("/create", formData);
    console.log(data.data);

    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData()
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit data. Please try again.");
  }
};

const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);

    if (data.data.success) {
      setDataList(data.data.data);
    }
};

useEffect(() => {
  getFetchData();
}, []);

const handleDelete = async (id) => {
  try {
    const data = await axios.delete(`http://localhost:8080/delete/${id}`);
    alert(data.data.message);
    
    getFetchData();  
  } catch (error) {
    console.error("Error deleting:", error);
    alert("Failed to delete item");
  }
};

 


const handleUpdate = async (e) => {
  e.preventDefault();

  console.log("Updating Data:", formDataEdit);

  if (!formDataEdit._id) {
    alert("Error: Missing _id for update");
    return;
  }

  try {
  const response = await axios.put("/update", formDataEdit);
  console.log("Update Response:", response.data);

  if (response.data.success) {
    getFetchData();
    alert(response.data.message);  
    setEditSection(false);
  }
} catch (error) {
  console.error("Update Error:", error.response?.data || error.message);
  alert("Succesfully update data!"); 
}
};

 
 const handleEditOnChange = async(e)=>{
  const { value, name } = e.target
  setFormDataEdit((preve) => {
    return{
      ...preve,
    [name]: value,

    }
   
  })
 }

  const handleEdit = (el) =>{
    setFormDataEdit(el)
    setEditSection(true)
  }

  return (
    <>
     <div className="container">
      <button className="btn btn-add" onClick={()=>setAddSection(true)}>add</button>

     {
     
     addSection && (
       <Formtable
           handleSubmit = {handleSubmit}
           handleOnChange = {handleOnChange}
           handleclose = {()=>setAddSection(false)}
           rest = {formData}
           />
      )
     }
     {
      editSection &&(
        <Formtable
           handleSubmit = {handleUpdate}
           handleOnChange = {handleEditOnChange}
           handleclose = {()=>setEditSection(false)}
           rest = {formDataEdit}
           />
      )
     }


     <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name:</th>
            <th>Course:</th>
            <th>Email:</th>
            <th>IDNumber:</th>
            <th>Mobile:</th>
            <th></th>
          </tr>
        </thead>
         <tbody>
         {
          dataList[0] ? (
               dataList.map((el)=>{
                console.log(el)
                return(
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.course}</td>
                    <td>{el.email}</td>
                    <td>{el.idNumber}</td>
                    <td>{el.mobile}</td>
                    <td>
                    <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
               }))     
               :(
                <p style={{textAlign : "center"}}>No Data Available</p>
               )
            }

         </tbody>

      </table>
     </div>

     
     
     </div>

    </>
  );
}

export default App;
