import "./registerForm.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3000/server/check/";

export default function RegisterForm() {
  // UseSate to update the value
  const [name, setAdminName] = useState("");
  const [email, setAdminMail] = useState("");
  const [password, setAdminPass] = useState("");
  const [conectionError, setConectionError] = useState(false);

  // By submit send data to API
  const submited = async (e) => {
    e.preventDefault();
    setConectionError(false);
    // Send body info throght post
    try {
      const res = await axios.post(`${baseUrl}register`, {
        name,
        password,
        email,
      });
      // If connection is successful sen user to login page
      if (res.data) {
        window.location.replace(`/login`);
      }
    } catch (error) {
      setConectionError(true);
    }
  };

  return (
    <>
    {/* RegidterformF */}
      <form
        action=""
        className="accontForm login"
        encType="multipart/form-data"
        onSubmit={submited}
      >
        {conectionError && (
          <strong className="erroMessage"> Fel inamtning försök igen!</strong>
        )}

        <label htmlFor="userReg">Användarnamn</label>
        <input
          type="text"
          required
          name="userReg"
          id="userReg"
          placeholder="Skriv in ditt namn"
          onChange={(e) => setAdminName(e.target.value)}
        />
        <label htmlFor="adminMailUpdate">E-post</label>
        <input
          type="email"
          required
          name="adminMailUpdate"
          id="adminMailUpdate"
          placeholder="adress@gmail.com"
          onChange={(e) => setAdminMail(e.target.value)}
        />
        <label htmlFor="adminPassUpdate">Lösenord</label>
        <input
          type="password"
          required
          name="adminPassUpdate"
          id="adminPassUpdate"
          placeholder="******"
          minLength={4}
          onChange={(e) => setAdminPass(e.target.value)}
        />
        <div className="btnUp">
          <button className="submitNewItem btn bgGreen updateBtn">
            Registrera
          </button>
        </div>
      </form>
    </>
  );
}
