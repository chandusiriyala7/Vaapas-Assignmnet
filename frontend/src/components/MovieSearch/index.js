import React , {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import MovieCard from '../MovieCard'

function MovieSearch(){

    const [searchInput,setSearchInput] = useState('');
    const [apiData,setApiData] = useState([])
    const [loader,setLoader] = useState(false); 
   

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchInput === '') {
            alert("Please Enter Movie Title And Search");
            return; 
        }else{
    
        setLoader(true);
        const filter = searchInput.replaceAll(" ", "+");
        setSearchInput(filter);
        }
    
        try {
            const response = await axios.get(`https://openlibrary.org/search.json?q=${searchInput}&limit=10`);
            console.log(response.data.docs);
            setApiData(response.data.docs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false); 
            setSearchInput(''); 
        }
    };
    
    

    return(
        <>
     <Navbar expand="lg" className="bg-body--black">
      <Container fluid>
        <Navbar.Brand href="#"><img className='logo' src = " data:image/png;base64,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"/></Navbar.Brand>
      
       
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 ml-5"
              aria-label="Search"
             onChange = {(e) =>{setSearchInput(e.target.value)}}
             value = {searchInput}
            />
            <Button variant="outline-success" onClick = {handleSearch}>Search</Button>
          </Form>
  
      </Container>
    </Navbar>
    {loader ? 
    (<div className='loader'></div>) : (
    <div>
        {
            apiData.length > 0 ? (
        <ul  className='card-container'>
            {
                apiData.map(each=>
                    <MovieCard key ={uuid()} movieDetails = {each}/>
           ) }
        </ul>
            ) : (
                <div className='message'> <h1>Enter Movie Name To Get Details !!!</h1></div>
            )
        }
       
    </div>
    )}
        </>
    )
}

export default MovieSearch