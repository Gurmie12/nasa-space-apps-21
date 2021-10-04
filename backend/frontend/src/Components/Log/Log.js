import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router";
import API from "../../clients/BackendClient";
import styled from "styled-components";
import {
    Avatar,
    Button,
    Card,
    Chip,
    CircularProgress,
    List, ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {connect} from "react-redux";
const Log = (props) =>{
    const {username, firstName, lastName, userId} = props.user;
    const history = useHistory();
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const [consoleLog, setConsoleLog] = useState(null);
    const [userData, setUserData] = useState(null);
    const [comment, setComment] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() =>{
        if(query.get('id') === undefined){
            history.push('/dashboard')
        }else{
            API.get(`/logs/getSingleLog/?logId=${query.get('id')}`).then((res) =>{
                if(res.status === 201){
                    setConsoleLog(res.data[0]);
                    API.get(`/auth/getUserDetails/?userId=${res.data[0].userId}`).then((response) =>{
                        if(response.status === 201){
                            setUserData(response.data[0]);
                        }
                    });
                }
            });
            setUpdate(false);
        }
    }, [update]);

    const handleLike = () =>{
        API.get(`/logs/like/?logId=${query.get('id')}`).then((res) =>{
            if(res.status === 201){
                setUpdate(true);
            }else{
                throw Error();
            }
        })
    }

    const handleComment = () =>{
        const commentData = {userId, logId: query.get('id'), comment, username, firstName, lastName};
        API.post('/logs/comment', commentData).then((res) =>{
            if(res.status === 201){
                setUpdate(true);
            }else{
                throw Error();
            }
        })
    }

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    `;

    const CustomCard = styled(Card)`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60%;
      height: 90%;
      padding: 0.5rem;
    `;

    const TitleContainer = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      padding: 0.5rem;
      width: 100%;
      height: 20%;
    `;

    const CommentsContainer = styled.div`
      margin-top: 1rem;
    display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-y: scroll;
      align-items: center;
      width: 100%;
      height: 70%;
    `;

    const CommentInputContainer = styled.div`
    display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 10%;
    `;

    const CustomListItem = styled(ListItem)`
      left: 0;
      border-top: 1px solid black;
    `;

    const CustomStack = styled(Stack)`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    `;

    if(consoleLog && userData){
        return(
            <Container>
                <CustomCard elevation={24}>
                    <TitleContainer>
                        <Stack direction={"column"} spacing={1} style={{alignItems: 'center'}}>
                            <Avatar>{userData.firstName.charAt(0) + userData.lastName.charAt(0)}</Avatar>
                            <Chip label={"@" + userData.username} />
                            <Chip label={userData.firstName + " " + userData.lastName} />
                        </Stack>
                        <Stack direction={"column"} spacing={1} style={{alignItems: 'center'}}>
                            <Typography variant={"h2"}>{consoleLog.missionName}</Typography>
                            <Typography variant={"body1"}>{consoleLog.message}</Typography>
                            <Stack direction={"row"} spacing={2}>
                                <Chip label={consoleLog.metadata.likes + " Likes"} onClick={e => {handleLike()}}/>
                                <Chip label={consoleLog.metadata.comments.length + " Comments"} />
                            </Stack>
                        </Stack>
                        {
                            consoleLog.file &&
                            <Stack direction={"column"} spacing={1} style={{alignItems: 'center'}}>
                                <img src={consoleLog.file.filePath} height={"100px"} width={"100px"}/>
                                <Typography variant={"body2"}>{consoleLog.file.fileName}</Typography>
                            </Stack>
                        }
                    </TitleContainer>
                    <CommentsContainer>
                        {
                            consoleLog.metadata.comments.length === 0 ?
                                <Typography>Be the first to comment.</Typography>
                                :
                                <List style={{height: '100%', width: '100%', overFlowY: 'none'}}>
                                    {
                                        consoleLog.metadata.comments.map((comment, i) =>{
                                            return(
                                                <CustomListItem key={i}>
                                                    <ListItemText>
                                                        <CustomStack direction={"row"} spacing={1}>
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Chip label={comment.firstName + " " + comment.lastName} style={{fontSize: '10px'}} />
                                                                <Chip label={comment.date} style={{fontSize: '10px'}}/>
                                                            </Stack>
                                                            <Typography variant={"body2"}>{comment.comment}</Typography>
                                                        </CustomStack>
                                                    </ListItemText>
                                                </CustomListItem>
                                            )
                                        })
                                    }
                                </List>
                        }
                    </CommentsContainer>
                    <CommentInputContainer>
                        <TextField label={"Enter your comment"} style={{width: '90%'}} onChange={e => setComment(e.target.value)} value={comment}/>
                        <Button onClick={e => {handleComment()}}>Submit</Button>
                    </CommentInputContainer>
                </CustomCard>
            </Container>
        )
    }

    return(
        <Container>
            <CircularProgress />
        </Container>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth
    };
};
export default connect(mapStateToProps, null)(Log);