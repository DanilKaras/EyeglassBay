import React, {useEffect, useState} from 'react';
import {Container, Header, List} from "semantic-ui-react";
import {EyeGlass} from "../models/eyeGlass";
import NavBar from "./NavBar";
import agent from "../api/agent";

function App() {
    const [eyeGlasses, setEyeGlasses] = useState<EyeGlass[]>([]);
    
    useEffect(() => {
        agent.EyeGlasses.listAll().then(response => {
            setEyeGlasses(response);
        })
    }, [])
  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
          <List>
              {eyeGlasses.map((eyeGlass: EyeGlass) => (
                  <List.Item key={eyeGlass.id}>
                      {eyeGlass.productName}
                  </List.Item>
              ))}
          </List>
      </Container>
    </>
  );
}

export default App;
