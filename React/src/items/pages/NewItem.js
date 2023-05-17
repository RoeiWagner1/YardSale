import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUM,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/Context/auth-context";
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

  const itemSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/items/new",
        "POST",
        JSON.stringify({
          title: formState.Inputs.title.value,
          description: formState.Inputs.description.value,
          address: formState.Inputs.address.value,
          price: formState.Inputs.price.value,
          mobile: formState.Inputs.mobile.value,
          creator: auth.userId,
        }), { "Content-Type": "application/json" });
        history.push('/');
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
}

export default NewItem;
