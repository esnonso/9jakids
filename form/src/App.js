import { useRef, useState } from "react";

import axios from "axios";
import "./App.css";

function App() {
  const [sucessMessage, setSucessMessage] = useState("");
  const [error, setError] = useState("");
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const stateRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    setError("");
    setSucessMessage("");

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const parentEmail = emailRef.current.value;
    const age = ageRef.current.value;
    const state = stateRef.current.value;
    const gender = genderRef.current.value;
    const churchName = "Admin Church Name";
    try {
      const response = await axios.post("http://localhost:8080/register", {
        firstName,
        lastName,
        parentEmail,
        age,
        state,
        gender,
        churchName,
      });

      setSucessMessage(response.data.message);
      lastNameRef.current.value = "";
      firstNameRef.current.value = "";
      ageRef.current.value = "";
      genderRef.current.value = "";
      emailRef.current.value = "";
      stateRef.current.value = "";
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <h3>Register Participants for Admin Church Name</h3>
        {sucessMessage && <p className="success">{sucessMessage}</p>}
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Parent Email</label>
          <input type="email" id="email" name="email" ref={emailRef} />
        </div>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            ref={firstNameRef}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            ref={lastNameRef}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" id="age" name="age" ref={ageRef} />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input type="text" id="gender" name="gender" ref={genderRef} />
        </div>

        <div className="form-group">
          <label>State</label>
          <input type="text" id="state" name="state" ref={stateRef} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
