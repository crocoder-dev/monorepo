import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";
import Typography from "../../Typography";
import Input from "../../Input";
import Button from "../../Button";
import Console from "../Console";
import Row from "../CodeExample/Row";
import Column from "../CodeExample/Column";

const StatusQuoDemo = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consoleOutputs, setConsoleOutputs] = useState([
    "Try submitting the form!",
  ]);

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const handleNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleSubmit = useCallback(() => {
    setConsoleOutputs((t) => [
      ...t,
      `{ email: ${email || null}, name: ${name || null} }`,
    ]);
    setEmail("");
    setName("");
  }, [setConsoleOutputs, setEmail, setName, email, name]);

  return (
    <Row>
      <Column>
        <div className={styles.defaultGrid}>
          <Typography color="gray_2" fontWeight={700} fontSize={44}>
            Contact{" "}
            <Typography fontWeight={700} color="green_2">
              Cro
            </Typography>
            Coder
          </Typography>
          <br />
          <Input required label="E-mail" onChange={handleEmailChange} />
          <Input required label="Your name" onChange={handleNameChange} />
          <br />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Column>
      <Column>
        <Console consoleOutputs={consoleOutputs} />
      </Column>
    </Row>
  );
};

export default StatusQuoDemo;
