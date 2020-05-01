import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),
  terms: yup.boolean().oneOf([true], "please agree to terms of use")
});

export default function Form() {
  
  const [buttonDisabled, setButtonDisabled] = useState(true);


  const [formState, setFormState] = useState({
    name: "",
    email: "",
    terms: "",
    password: ""
  });

 
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    terms: "",
    password: ""
  });

  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    });
  }, [formState]);

 
  const formSubmit = e => {
    e.preventDefault();
    console.log("submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); 
        console.log("success", res);
      })
      .catch(err => console.log(err.response));
  };

  const inputChange = e => {
    e.persist();

    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
          data-cy="name"
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
          data-cy="email"
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <label htmlFor="terms">
        Please agree to the terms
        <input
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        
      </label>
      
      

      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}
