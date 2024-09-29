import React, { useState } from "react";
import { supabase } from "./client";

const App = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  console.log(formData);

  // Insert user's name into "Table_1"
  async function insertUserName(fullName) {
    try {
      const { error } = await supabase
        .from("Table_1")
        .insert({ firstName: fullName });
      if (error) throw error;
      console.log("User name added to Table_1:", fullName);
    } catch (error) {
      console.error("Error inserting user name:", error);
    }
  }

  // Handles user sign-up and calls insertUserName after successful sign-up
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) throw error;

      // Insert the user's full name into Table_1 after sign-up
      await insertUserName(formData.fullName);

      alert("Check your email for the verification link");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
