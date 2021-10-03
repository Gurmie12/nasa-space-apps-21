import React from 'react';
import {useHistory, useLocation} from "react-router";

const Log = (props) =>{
    const history = useHistory();
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();

    if(query.get('id')){
        const logId = query.get('id')
        return(
            <div>{logId}</div>
        );
    }else{
        return history.push('/');
    }
};

export default Log;