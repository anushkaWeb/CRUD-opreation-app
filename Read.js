
//DISPLAY THE DATA


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState(""); 
  const[inputText, setInputText]=useState('');

  function getData() {
    axios
      .get("https://62a59821b9b74f766a3c09a4.mockapi.io/crud-youtube")
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios //through axios we read API
      .delete(`https://62a59821b9b74f766a3c09a4.mockapi.io/crud-youtube/${id}`)
      .then(() => {
        getData(); //after the delete again call the getData function to show undeleted/remaining data..
      });
  }
//here onClick on edit button  we save data on localStorage...
  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);  //this function call only one time when function is render..
 const inputhandler=(e)=>{
    setInputText(e.target.value.toLowerCase()); //toLowerCase means whether user write capital or smaller fetch both
 }
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <div class="mb-3">
    <input type="search" class="form-control" placeholder="type here" onChange={inputhandler} />
    
  </div>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {data
        .filter((el)=>{
            if(el===''){
                return el //return all data
            }else{
                return(el.name.toLowerCase().includes(inputText) ||el.email.toLowerCase().includes(inputText));
            }
        })
        
       .map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
               
                  <th scope="row">{eachData.id}</th>  {/* //access data */}
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          )
                        }
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(eachData.id)} //here we pass id through id we delete the data..
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
         } )}
      </table>
    </>
  );
};

export default Read;