import React from 'react';
import styled from "styled-components";
import {Typography} from "@mui/material";

const HomePage = (props) =>{
    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `;

    const Row = styled.div`
      width: 100vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `;

    const Column = styled.div`
      width: 40%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 5rem;
    `;

    const DetailsColumn = styled(Column)`
      align-items: center;
      text-align: right;
    `;
    return(
        <Container>
            <Row>
                <Column>
                    <Typography variant={"h1"}>Spacebook</Typography>
                </Column>
                <DetailsColumn>
                    <Typography variant={"h5"}>
                        Spacebook aims to connect people and astronauts alike. It allows for seamless
                        integration of console log information from moon missions to all people and
                        allows them to comment and investigate the information with support!
                    </Typography>
                </DetailsColumn>
            </Row>
        </Container>
    )
};

export default HomePage;