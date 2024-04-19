import React, { useState } from "react";

export const SignupView = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to
    // reload the entire page
    event.preventDefault();

    const data = {
      Email: email,
      Password: password,
      Name: name,
      Birthday: birthday
    };

    fetch("https://cf-2-movie-api.onrender.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        // Please review the response format of the API here
        // https://cf-2-movie-api.onrender.com/docs/#/User/post_users
        if (data.success) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert(`Signup failed: ${data.error.message}`);
        }
      })
      .catch(error => {
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
