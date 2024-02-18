import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
// this component is used to edit an article
function EditCourse(props) {
  //
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  //
  const [course, setCourse] = useState({_id:'', courseCode: '', courseName: '', section:'', semester:'' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/courses/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {courseCode: course.courseCode, courseName:course.courseName, section:course.section, semester:course.semester};
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        navigate('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateCourse}>
            <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
                </Form.Group>
            <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course name" value={course.courseName} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control type="text" name="section" id="section" placeholder="Enter the section" value={course.section} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control type="text" name="semester" id="semester" placeholder="Enter the semester" value={course.semester} onChange={onChange} />
            </Form.Group>
            
          
        
          <Button variant="primary" type="submit">
            Update Course
          </Button>
        </Form>
    </div>
  );
}
//
export default EditCourse;
