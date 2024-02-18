import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single user
function ShowStudent(props) {
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
   navigate('/edit/' + id);
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const student = {firstName:data.firstName,lastName:data.lastName,studentNumber:data.studentNumber, password:data.password,address:data.address,
                    city:data.city, phoneNumber:data.phoneNumber,email:data.email,program:data.program,techSkills:data.techSkills,favouriteTopics:data.favouriteTopics};
  
    axios.delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <h1>Student Name: {data.firstName}, {data.lastName}</h1>
          <p>Student Number: {data.studentNumber}</p>
          <p>Address: {data.address}</p>
          <p>City: {data.city}</p>
          <p>Phone Number: {data.phoneNumber}</p>
          <p>Email: {data.email}</p>
          <p>Program: {data.program}</p>
          <p>Tech Skills: {data.techSkills}</p>
          <p>Favourite Topics: {data.favouriteTopics}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteStudent(data._id) }}>Delete</Button>
        </p>
    </div>
  );
}
//
export default ShowStudent;
