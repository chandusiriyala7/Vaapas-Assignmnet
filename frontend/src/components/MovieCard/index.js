import {useEffect, useState} from 'react'
import axios from 'axios'
import './index.css'

const MovieCard = (props) =>{
    const {movieDetails} = props
    const {title,author_name,first_publish_year} = movieDetails

    const [dogImage , setDogImage] = useState()

    useEffect(()=>{
        axios.get("https://dog.ceo/api/breeds/image/random").then((res) =>{
            setDogImage(res.data.message)
        }).catch((error)=>{
            console.log(error)
        })
    } , [])
   


    return(
        <li className="card">
            <img src = {dogImage} alt = "random-dog-image" className="dog-image" />
            <h2><strong>{title}</strong> </h2>
            <p><strong>Author :</strong> {author_name}</p>
            <p><strong> Published Year :</strong> {first_publish_year}</p>
        </li>
    )
}

export default MovieCard