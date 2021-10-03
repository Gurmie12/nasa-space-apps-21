import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
    Button, ButtonGroup,
    Card,
    CircularProgress, Stack, TextField, Typography
} from "@mui/material";
import API from "../../clients/BackendClient";
import MissionCard from "./MissionCard";
import {addAlert} from "../../Store/alerts/alertReducer.actions";
import {closeCreateNewPost} from "../../Store/posts/postsReducer.actions";
import {connect} from "react-redux";

const Dashboard = (props) =>{
    const {username, firstName, lastName, userId} = props.user;
    const {addAlert, closeCreateNewPost} = props;
    const {isCreateNewPostOpen} = props.posts;
    const [isLoading, setIsLoading] = useState(false);
    const [consoleLogs, setConsoleLogs] = useState(null);
    const [inputMissionName, setInputMissionName] = useState(null);
    const [inputConsoleLog, setInputConsoleLog] = useState(null);

    useEffect(() =>{
        setIsLoading(true);
        API.get(`/logs/getAllLogs`).then((res) =>{
            if(res.status === 201){
                setConsoleLogs(res.data);
                setIsLoading(false);
            }else{
                throw Error("Internal Server Error");
            }
        })
    }, []);

    const addNewPost = () =>{
        if(inputMissionName && inputConsoleLog){
            const newLog = {firstName, lastName, username, userId, missionName: inputMissionName, consoleLog: inputConsoleLog};
            API.post('/logs/newLog', newLog).then((res) =>{
                if(res.status === 201){
                    addAlert({alertType: "success", alertMessage: res.data.success});
                    closeCreateNewPost();
                }else{
                    addAlert({alertType: "error", alertMessage: res.data.err});
                }
            })
        }
    }

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1rem;
      height: 100%;
      width: 100%;
      overflow-y: scroll;
    `;

    const Row = styled.div`
        display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 40%;
    `;

    const Column = styled.div`
        display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 40%;
      height: 100%;
    `;

    const LoadingContainer = styled(Container)`
      justify-content: center;
    `;

    const NewPostRow = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100vw;
      margin-bottom: 3rem;
      height: 30%;
    `;

    const CustomCard = styled(Card)`
      height: 100%;
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
    `;

    const CreateRow = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 4rem;
    `;

    const InputColumn = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30%;
      height: 80%;
    `;

    const UploadColumn = styled.div`
      display: flex;
      flex-direction: column;
      width: 60%;
      height: 90%;
      border: 1px dotted black;
      border-radius: 1rem;
    `;

    const StyledInput = styled(TextField)`
      width: 95%;
    `;

    if(isLoading){
        return(
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        );
    }

    if(consoleLogs && consoleLogs.length > 0){
        return (
            <Container>
                {
                    isCreateNewPostOpen &&
                            <NewPostRow>
                                <CustomCard elevation={12}>
                                    <CreateRow>
                                        <InputColumn>
                                            <StyledInput label={"Mission Name"}
                                                         value={inputMissionName}
                                                         onChange={(e) => setInputMissionName(e.target.value)}
                                                         />
                                            <br />
                                            <StyledInput label={"Console Log"}
                                                         value={inputConsoleLog}
                                                         onChange={(e) => setInputConsoleLog(e.target.value)}
                                                         />
                                        </InputColumn>
                                        <UploadColumn>

                                        </UploadColumn>
                                    </CreateRow>
                                    <ButtonGroup variant={"outlined"} color={"inherit"}>
                                        <Button onClick={e => closeCreateNewPost()}>X</Button>
                                        <Button onClick={addNewPost}>✓</Button>
                                    </ButtonGroup>
                                </CustomCard>
                            </NewPostRow>
                }
                {
                    consoleLogs.length > 0 ?
                        <>
                        <Row>
                            <Column>
                                <MissionCard data={consoleLogs[0]} />
                            </Column>
                            <br />
                            <Column>
                                <MissionCard data={consoleLogs[1]} />
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <MissionCard data={consoleLogs[2]} />
                            </Column>
                            <br />
                            <Column>
                                <MissionCard data={consoleLogs[3]} />
                            </Column>
                        </Row>
                        </>
                    :
                    <Typography variant={"h2"}>There are no Missions or Console Logs</Typography>
                }

            </Container>
        )
    }

    return (
        <h1>ERROR</h1>
    )

};

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        user: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (payload) => dispatch(addAlert(payload)),
        closeCreateNewPost: () => dispatch(closeCreateNewPost())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);