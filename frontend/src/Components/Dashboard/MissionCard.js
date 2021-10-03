import React, {useState} from 'react';
import {Button, Card, Chip, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import styled from "styled-components";
import {useHistory} from "react-router";

const MissionCard = ({data}) =>{
    const history = useHistory();

    const openLog = (logId) =>{
        history.push(`/log?id=${logId}`);
    }

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
    `;

    const CustomCard = styled(Card)`
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    const handleSort = (a, b) =>{
        return b.createdAt - a.createdAt;
    }

    return(
        <CustomCard elevation={24} style={{height: '100%', width: '100%'}}>
            <TitleContainer>
                <Typography variant={'h3'}>{data._id}</Typography>
            </TitleContainer>
            <ConsoleLogContainer>
                <List style={{height: '100%', width: '100%', overFlowY: 'none'}}>
                    {
                        data.consoleLogs.sort(handleSort).map((consoleLog, i) =>{
                            return(
                                <CustomListItem key={i}>
                                    <ListItemText>
                                        <CustomStack direction={"row"} spacing={1}>
                                            <Stack direction={"row"} spacing={1}>
                                                <Chip label={consoleLog.firstName +" "+ consoleLog.lastName} style={{fontSize: '10px'}} />
                                                <Chip label={consoleLog.date} style={{fontSize: '10px'}}/>
                                            </Stack>
                                            <Stack direction={"row"} spacing={0}>
                                                <Typography variant={"body2"}>{consoleLog.message}</Typography>
                                                <Button onClick={e => openLog(consoleLog._id)}><LaunchIcon/></Button>
                                            </Stack>
                                        </CustomStack>
                                    </ListItemText>
                                </CustomListItem>
                            )
                        })
                    }
                </List>
            </ConsoleLogContainer>
        </CustomCard>
    )
};

export default MissionCard;