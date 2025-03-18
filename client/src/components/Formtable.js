import React from "react";
import "../App.css"
import { MdClose } from "react-icons/md";

const Formtable = ({ handleSubmit, handleOnChange, handleclose,rest}) => { 
   
    return(

              <div className="addContainer">
                <form onSubmit={handleSubmit}>
                  <div className="close-btn" onClick={handleclose}><MdClose /></div>
          
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>
          
                  <label htmlFor="course">Course:</label>
                  <input type="text" id="course" name="course" onChange={handleOnChange} value={rest.course}/>
          
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>
          
                  <label htmlFor="idNumber">IDNumber:</label>
                  <input type="number" id="idNumber" name="idNumber" onChange={handleOnChange} value={rest.idNumber}/>
          
                  <label htmlFor="mobile">Mobile:</label>
                  <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>
          
                  <button className="btn">Submit</button>
                </form>
              </div>
           
    )
}

export default Formtable