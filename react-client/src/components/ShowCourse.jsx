import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single article
function ShowCourse(props) {
  let navigate = useNavigate()
  let {id} = useParams();
  //
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/courses/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    navigate('/editcourse/' + id);
    
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = {courseCode: data.courseCode, courseName:data.courseName, section:data.section, semester:data.semester};
    //
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        navigate('/listcourses')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
          <h1>Course Name: {data.courseName}</h1>
          <p>Course Code: {data.courseCode}</p>
          <p>Section: {data.section}</p>
          <p>Semester: {data.semester}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
        </p>
\    </div>
  );
}

export default ShowCourse;
