import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUM,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./ItemForm.css";

const NewItem = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
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
    false
  );

  const history = useHistory();

  const itemSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('price', formState.inputs.price.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('mobile', formState.inputs.mobile.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(
        "http://localhost:5000/api/items",
        "POST",
        formData
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="item-form" onSubmit={itemSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Input
          id="price"
          element="input"
          label="Price"
          validators={[VALIDATOR_NUM()]}
          errorText="Please enter a valid price (ILS only)."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="mobile"
          element="input"
          label="mobile"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid phone number (at least 10 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD ITEM
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewItem;
