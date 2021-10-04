import React from 'react';
import {Typography} from "@mui/material";
import styled from "styled-components";
import {params} from "./Particles";
import Particles from "react-tsparticles";

const HomePage = (props) =>{
    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `;

    const Row = styled.div`
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `;

    const Column = styled.div`
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 3rem;
    `;

    const DetailsColumn = styled(Column)`
      align-items: center;
      text-align: center;
    `;

    return(
        <div>
            <div style={{ position: 'fixed'}}>
                {<Particles  params={params} />}
            </div>
            <Container>
                <Row>
                    <DetailsColumn>
                        <Typography variant={"h1"} style={{fontFamily: "'Titillium Web', sans-serif"}}>Spacebook</Typography>
                        <Typography marginTop={"10px"} variant={"body2"} style={{fontFamily: "'Titillium Web', sans-serif"}}>"Bridging the gap between terrestrial and extraterrestrial"</Typography>
                    </DetailsColumn>
                    <DetailsColumn>
                        <Typography variant={"h5"} style={{fontFamily: "'Titillium Web', sans-serif"}}>
                            <br/>
                            Spacebook aims to connect people and astronauts alike. It allows for seamless
                            integration of console log information from moon missions to all people and
                            allows them to comment and investigate the information with support!
                        </Typography>
                    </DetailsColumn>
                </Row>
                <Row>
                    <DetailsColumn>
                        <Typography variant={"h3"} style={{fontFamily: "'Titillium Web', sans-serif", textDecorationLine: "underline"}}>
                            Spacebook's Objective
                        </Typography>
                        <br />
                        <Typography variant={"body2"} style={{fontFamily: "'Titillium Web', sans-serif"}}>
                            With the planned Artemis lunar missions and other various space missions, a broad community from all over the world will look for ways to follow these exciting adventures. The interested public would wish to communicate regarding these missions and have a direct look into what is occurring outside of Earth’s atmosphere. Spacebook is what this broad community of interested individuals are looking for.
                            <br/>
                            <br/>
                            The gap between terrestrial and extraterrestrial is bridged by Spacebook because users can immerse themselves in lunar space missions based on data shared by contributors. For space agencies, Spacebook creates an environment for all console logs to be seen, while a permanent log is left for them to reference in the future. Both users and contributors have personal interests satisfied by using Spacebook.
                        </Typography>
                    </DetailsColumn>
                    <DetailsColumn>
                        <Typography variant={"h3"}  style={{fontFamily: "'Titillium Web', sans-serif", textDecorationLine: "underline"}}>
                            Team Spacebook
                        </Typography>
                        <br />
                        <img src="media/teamLogo.png" height={'190px'} width={'605px'}/>
                    </DetailsColumn>
                </Row>
            </Container>
        </div>
    )
};

export default HomePage;