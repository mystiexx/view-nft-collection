import React from "react";
import "./Card.css";

const Card = ({ data }) => {
  return (
    <div className="card" key={data.id}>
      <div className="card-img">
        <img src={data.meta.content[0].url} alt={data.name} />
      </div>
      <div className="card-body">
        <h4 className="card-title">{data.meta.name}</h4>
        <p className="card-text">{data.meta.description}</p>
        <p>Contract Address: </p>
        <p>{data.contract}</p>
        <p>Collection Address</p>
        <p>{data.collection}</p>
      </div>
    </div>
  );
};

export default Card;
