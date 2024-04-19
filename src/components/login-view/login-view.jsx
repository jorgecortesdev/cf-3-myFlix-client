import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to
    // reload the entire page
    event.preventDefault();

    const data = {
      Email: email,
      Password: password
    };

    fetch("https://cf-2-movie-api.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        // Please review the response format of the API here
        // https://cf-2-movie-api.onrender.com/docs/#/Auth/post_login
        if (data.success) {
          const { user, token } = data.data;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          onLoggedIn(user, token);
        } else {
          alert(`Login failed: ${data.error.message}`);
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
          type="text"
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
      <button type="submit">Submit</button>
    </form>
  );
};
