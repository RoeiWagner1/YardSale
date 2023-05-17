import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from '../../shared/components/UIElements/Card'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUM,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./ItemForm.css";

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

function UpdateItem() {
  const [isLoading, setIsLoading] = useState(true);

  const itemId = useParams().itemId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      mobile: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  const identifiedItem = DUMMY_ITEMS.find((t) => t.id === itemId);

  useEffect(() => {
    if(identifiedItem){
      setFormData(
        {
          title: {
            value: identifiedItem.title,
            isValid: true,
          },
          address: {
            value: identifiedItem.address,
            isValid: true,
          },
          price: {
            value: identifiedItem.price,
            isValid: true,
          },
          description: {
            value: identifiedItem.description,
            isValid: true,
          },
          mobile: {
            value: identifiedItem.mobile,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedItem]);

  const itemUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedItem) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find item!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="item-form" onSubmit={itemUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
      />
      <Input
        id="price"
        element="input"
        label="Price"
        validators={[VALIDATOR_NUM()]}
        errorText="Please enter a valid price (ILS only)."
        onInput={inputHandler}
        initialValue={formState.inputs.price.value}
        initialValid={formState.inputs.price.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="mobile"
        element="input"
        label="mobile"
        validators={[VALIDATOR_NUM(10)]}
        errorText="Please enter a valid phone number (at least 10 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.mobile.value}
        initialValid={formState.inputs.mobile.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE ITEM
      </Button>
    </form>
  );
}

export default UpdateItem;
