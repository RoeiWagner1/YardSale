import React from "react";

import Card from "../../shared/components/UIElements/Card";
import OneItem from "./OneItem"
import Button from "../../shared/components/FormElements/Button";
import './ItemList.css'

function ItemList(props) {
  if(props.items.length === 0){
    return (
      <div className="item-list center">
        <Card>
          <h2>No items found. Maybe create one?</h2>
          <Button to="/items/new">Add New Item</Button>
        </Card>
      </div>
    );
  }

  return (
  <ul className="item-list">
    {props.items.map(item => (
    <OneItem 
      key={item.id} 
      id={item.id} 
      image={item.imageUrl} 
      title={item.title} 
      price={item.price}
      mobile={item.mobile} 
      description={item.description} 
      address={item.address} 
      creatorId={item.creator} 
      coordinates={item.location}/>
      ))}
  </ul>
  );
}

export default ItemList;
