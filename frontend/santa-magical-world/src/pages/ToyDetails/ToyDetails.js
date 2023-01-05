import "./ToyDetails.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ToyDetails = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/toy/${id}`);
        // console.log(response.data);
        setDetail(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="container">
      <Link to="/">Toys List</Link>
      {detail.map((element, index) => {
        return (
          <div key={index} className="detail-container">
            <p>{element.name}</p>
            <p>{element.description}</p>
            <p>{element.price} €</p>
          </div>
        );
      })}
    </div>
  );
};

export default ToyDetails;
