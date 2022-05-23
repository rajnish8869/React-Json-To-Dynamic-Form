import React, { useState } from "react";
import Field from "./field";
import data from "./data.json";
const Form = () => {
  var [dataField, setDataField] = useState(data);

  console.log("dataField", dataField);

  var [formValidstatus, setFormValidStatus] = useState(false);

  const fieldChange = (event, field, index) => {
    const updatedField = { ...field };
    updatedField.value = event.target.value;
    updatedField.valid = checkValidity(updatedField);

    const updatedFields = [...dataField];
    updatedFields.splice(index, 1, updatedField);
    let formValid = true;
    for (let field of updatedFields) {
      if (!field.valid) {
        formValid = false;
      }
    }
    setDataField(updatedFields);

    setFormValidStatus(formValid);

    console.log("field changed");
    console.log("event", event);
    console.log("field", field);
    console.log("index", index);
  };

  const checkValidity = (field) => {
    const rules = field.validation;
    const value = field.value;
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.pattern) {
      // const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = rules.pattern.test(value) && isValid;
    }

    return isValid;
  };

  const fieldBlur = (event, field, index) => {
    if (field.touched) {
      return;
    }
    const updatedField = { ...field };
    updatedField.touched = true;
    updatedField.valid = checkValidity(updatedField);
    const updatedFields = [...dataField];
    updatedFields.splice(index, 1, updatedField);

    setDataField(updatedFields);
    console.log("event", event);
    console.log("field", field);
    console.log("index", index);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    alert("data submitted");
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      {dataField.map((field, index) => {
        return (
          <Field
            key={field.id}
            fieldConfig={field}
            focused={(event) => fieldBlur(event, field, index)}
            changed={(event) => fieldChange(event, field, index)}
          />
        );
      })}
      <button type="submit" disabled={!formValidstatus}>
        Submit
      </button>
    </form>
  );
};

export default Form;
