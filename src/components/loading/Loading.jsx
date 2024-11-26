import Box from '@mui/material/Box';
import ReactLoading from "react-loading";
import * as React from "react";

const Loading = () => {
    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                }}
            >
                {/*<CircularProgress size={40}/>*/}
                <ReactLoading type="bars" color="#fff" height={100} width={100}/>
            </Box>
        </>
    )
}

export default Loading;