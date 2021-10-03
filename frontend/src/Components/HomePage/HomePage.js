import React from 'react';
import {Typography} from "@mui/material";
import styled from "styled-components";
import {Button, Grid} from "@mui/material";
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
      padding: 5rem;
    `;

    const DetailsColumn = styled(Column)`
      align-items: center;
      text-align: center;
    `;

    const Overlying = styled.div`
      height: 100%;
      width: 100%;
    `;

    return(
        <Overlying>
            <div style={{ position: 'absolute', height: "100%"}}>
                {<Particles  options={params} height={"100%"}/>}
            </div>
            <Container>
                <Row>
                    <DetailsColumn>
                        <Typography variant={"h1"} style={{fontFamily: "'Titillium Web', sans-serif"}}>Spacebook</Typography>
                        <Typography marginTop={"10px"} variant={"body2"} style={{fontFamily: "'Titillium Web', sans-serif"}}>"Bridging the gap between terrestrial and extraterrestrial"</Typography>
                    </DetailsColumn>
                    <DetailsColumn>
                        <Typography variant={"h5"} style={{fontFamily: "'Titillium Web', sans-serif"}}>
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
                        <Typography variant={"h5"} style={{fontFamily: "'Titillium Web', sans-serif"}}>
                            Filler text for Our Objective
                        </Typography>
                    </DetailsColumn>
                    <Column>
                        {/* Image for Our Objective*/}
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {/* Image for Our Team*/}
                    </Column>
                    <DetailsColumn>
                        <Typography variant={"h3"}  style={{fontFamily: "'Titillium Web', sans-serif", textDecorationLine: "underline"}}>
                            Team Spacebook
                        </Typography>
                        <br />
                        <Typography variant={"h5"} style={{fontFamily: "'Titillium Web', sans-serif"}}>
                            Filler Text for Our Team
                        </Typography>
                    </DetailsColumn>
                </Row>
                <Row>
                    <DetailsColumn>
                        <Typography variant={"h3"}  style={{fontFamily: "'Titillium Web', sans-serif", textDecorationLine: "underline"}}>
                            Our Journey Through Space!
                        </Typography>
                        <br/>
                        <Typography variant={"h5"} style={{fontFamily: "'Titillium Web', sans-serif"}}>
                            Filler text for Hackathon Journey
                        </Typography>
                    </DetailsColumn>
                    <Column>
                        {/* Image for Our Hackathon Journey*/}
                    </Column>
                </Row>
                <Row>
                    <Grid container justifyContent="center"
                          alignItems="center" textAlign={'center'}>
                        <Button type='submit' variant='contained' color='primary'>Get Started!</Button>
                    </Grid>
                </Row>
            </Container>
        </Overlying>
    )
};

export default HomePage;