import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

function UsersItem(props) {
  return (
    <li className="user-item">
      <Card className="card__user">
        <Link to={`/${props.id}/items`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.itemsCount} {props.itemsCount === 1 ? "Item" : "Items"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UsersItem;
