import React, {useState} from 'react';
import styled from "styled-components";
import {
    Card,
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemText,
    Chip,
    Stack,
    Box,
    Modal, Button
} from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import {useHistory} from "react-router";

const Dashboard = (props) =>{
    const history = useHistory();

    const openLog = () =>{
        history.push('/log?id=1');
    }

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem;
      height: 100%;
      width: 100%;
    `;

    const Row = styled.div`
        display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100vw;
      height: 40vh;
    `;

    const Column = styled.div`
        display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40%;
      height: 100%;
    `;

    const TitleContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10%;
      width: 100%;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-align: center;
    `;

    const CustomCard = styled(Card)`
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    const ConsoleLogContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      width: 100%;
      height: 80%;
      overflow-y: scroll;
    `;

    const CustomStack = styled(Stack)`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `;

    const CustomListItem = styled(ListItem)`
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    `;

    return (
       <Container>
            <Row>
                <Column>
                    <CustomCard elevation={24} style={{height: '100%', width: '100%'}}>
                        <TitleContainer>
                            <Typography variant={'h3'}>Test Mission</Typography>
                        </TitleContainer>
                        <ConsoleLogContainer>
                            <List style={{height: '100%', width: '100%', overFlowY: 'none'}}>
                                <CustomListItem>
                                    <ListItemText>
                                        <CustomStack direction={"row"} spacing={1}>
                                            <Stack direction={"row"} spacing={1}>
                                                <Chip label={"Gurman Brar"} style={{fontSize: '10px'}} />
                                                <Chip label={"02-10-2021"} style={{fontSize: '10px'}}/>
                                            </Stack>
                                            <Stack direction={"row"} spacing={0}>
                                                <Typography variant={"body2"}>Some console log message what if this is a really long message and there is a lot of space consumed by this message</Typography>
                                                <Button onClick={openLog}><LaunchIcon/></Button>
                                            </Stack>
                                        </CustomStack>
                                    </ListItemText>
                                </CustomListItem>
                            </List>
                        </ConsoleLogContainer>
                    </CustomCard>
                </Column>
                <br />
                <Column>
                    <CustomCard elevation={24} style={{height: '100%', width: '100%'}}>
                        2
                    </CustomCard>
                </Column>
            </Row>
           <Row>
               <Column>
                   <CustomCard elevation={24} style={{height: '100%', width: '100%'}}>
                       3
                   </CustomCard>
               </Column>
               <br />
               <Column>
                   <CustomCard elevation={24} style={{height: '100%', width: '100%'}}>
                       4
                   </CustomCard>
               </Column>
           </Row>
       </Container>
    )
};

export default Dashboard;