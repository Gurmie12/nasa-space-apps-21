import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import styled from "styled-components";

const StyledAlert = styled(MuiAlert)`
  display: flex;
  justify-content: center;
  text-align: center;
`;

function Alert(props) {
    const { type, details } = props;

    return (
        <Snackbar open={true}>
            <StyledAlert severity={type} elevation={6} variant={"filled"}>
                {details}
            </StyledAlert>
        </Snackbar>
    );
}

export default Alert;