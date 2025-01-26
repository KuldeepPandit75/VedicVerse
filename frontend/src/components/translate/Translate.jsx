import React, { useState } from 'react'
import Navbar from '../header/Navbar'
import { styled } from 'styled-components'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import axios from 'axios';

const Container = styled.div`
    height:85vh;
    width: 100vw;
    display:flex;
    justify-content:center;
    align-items:center;
`

const BoxCont = styled.div`
    background-color:rgba(0,0,0,0.6);
    width:90%;
    height:90%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow:hidden;
`

const Title = styled.h2`
    color:#FFB563;
    font-size: 36px;
    text-align: center;

    &.translation{
        color:white;
        font-family: Samarkan;
        text-align:left;
    }
`

const SubTitle = styled.h3`
    color:#FFD29D;
    font-size: 24px;
    text-align: center;
    line-height: 10px;
`

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 80%;
    margin-top: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0;
    color: ${grey[300]};
    background: ${grey[900]};
    border: 1px solid ${grey[700]};
    box-shadow: 0 2px 2px ${grey[900]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[600]};
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);

const TransBox = styled.div`
    padding: 0 100px;
    width: 100%;
    margin-top: 20px;
`

const Translation = styled.p`
    color: white;
`

const TransButt = styled.button`
    background-color:#A41623;
    font-family: Samarkan;
    padding: 2px 20px;
    font-size: 20px;
    border-radius: 5px;
    margin-top:10px;
`

function Translate() {

    const [translation, setTranslation] = useState("First enter the Verse")
    const [verse, setVerse] = useState(null)

    const handleChange = (e) => {
        setVerse(e.target.value)
    }

    const data = { message: verse }

    const getTranslation = () => {
        axios.post(`${import.meta.env.VITE_BOT_URL}/predictu`, data)
            .then(response => {
                console.log("Response Data:", response.data);
                setTranslation(response.data.answer)
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }



    return (
        <>
            <Navbar />
            <Container>
                <BoxCont>
                    <Title>Translate Sanskrit Verse to Hindi</Title>
                    <SubTitle>AI powered</SubTitle>
                    <Textarea maxRows={5} aria-label="empty textarea" placeholder="Enter the Verse" onChange={(e) => handleChange(e)} />
                    <TransButt onClick={() => getTranslation()}>Translate</TransButt>
                    <TransBox>
                        <Title className='translation'>Translation:</Title>
                        <Translation>{translation}</Translation>
                    </TransBox>
                </BoxCont>
            </Container>
        </>
    )
}

export default Translate