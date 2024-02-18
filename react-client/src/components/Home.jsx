
import React, { Component }  from 'react';
//
// this is the home page component
function Home(props)
{


    return (
        <div>
            <h2> Dahye Lee - Lab Assignment1</h2>
            <p>React front-end calls Express REST API to add, 
            list, update, or delete a student, create an course, etc.</p>
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;