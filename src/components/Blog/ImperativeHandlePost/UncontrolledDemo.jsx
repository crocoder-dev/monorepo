import React, { useCallback, useState, useRef } from "react";
import styles from "./index.module.scss";
import Console from "../Console";
import Row from "../CodeExample/Row";
import Column from "../CodeExample/Column";

const InputComponent = ({ label, inputRef }) => {
  return (
    <div>
      <span>{label}</span>
      <input ref={inputRef} />
    </div>
  );
};

const ParentComponent = ({ setConsoleOutputs }) => {
  const emailInputRef = useRef(null);

  const nameInputRef = useRef(null);

  const handleSubmit = useCallback(() => {
    setConsoleOutputs((t) => [
      ...t,
      `{ email: ${emailInputRef.current.value || null}, name: ${
        nameInputRef.current.value || null
      } }`,
    ]);
    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    if (emailInputRef.current.style["background-color"] === "red") {
      emailInputRef.current.style = "background-color:blue;";
    } else {
      emailInputRef.current.style = "background-color:red;";
    }
    nameInputRef.current.type = "button";
    nameInputRef.current.value = "I am now a button";
  }, [setConsoleOutputs, emailInputRef, nameInputRef]);

  return (
    <>
      <InputComponent label="E-mail" inputRef={emailInputRef} />
      <br />
      <InputComponent label="Name" inputRef={nameInputRef} />
      <br />
      <button style={{ height: "30px" }} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

const UncontrolledDemo = () => {
  const [consoleOutputs, setConsoleOutputs] = useState([
    "Try submitting the form!",
  ]);

  return (
    <Row>
      <Column>
        <div className={styles.defaultGrid}>
          <ParentComponent setConsoleOutputs={setConsoleOutputs} />
        </div>
      </Column>
      <Column>
        <Console consoleOutputs={consoleOutputs} />
      </Column>
    </Row>
  );
};

export default UncontrolledDemo;
