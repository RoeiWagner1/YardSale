import React from "react";
import {useParams} from 'react-router-dom';

import ItemList from "../components/ItemList";

const DUMMY_ITEMS = [
  {
    id: "t1",
    title: "שולחן לסלון",
    description: "במצב מעולה, נקנה לפני שנה בלבד",
    imageUrl:
      "https://www.turkiz.net/wp-content/uploads/2021/12/ebb401d5b2ad.jpg",
    address: "שדרות יצחק רגר 124, באר שבע",
    location: {
      lat: 31.2660031,
      lng: 34.7988395,
    },
    price: "מחיר: 225 שקל",
    mobile: "0506781104",
    creator: "u1",
  },
  {
    id: "t2",
    title: "שולחן עבודה",
    description: "במצב טוב, נמכר עקב מעבר דירה למרכז",
    imageUrl:
      "https://homepluss.co.il/wp-content/uploads/2022/04/20210925_205912-1-1.jpg",
    address: "דרך מצדה 19, באר שבע",
    location: {
      lat: 31.2581783,
      lng: 34.7950609,
    },
    price: "מחיר: 120 שקל",
    mobile: "0544535371",
    creator: "u2",
  },
];

function UserItems() {
  const userId = useParams().userId;
  const loadedItems = DUMMY_ITEMS.filter((item) => item.creator === userId);
  return <ItemList items={loadedItems} />;
}

export default UserItems;
