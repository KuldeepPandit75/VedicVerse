import { Box, TextField, Button, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { API } from "../../service/api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/vedicSlice.js";
import { useNavigate, Navigate } from "react-router";
import { Alert } from "@mui/material";
import "@fontsource/akaya-kanadaka";

const Component = styled(Box)`
    overflow: hidden;
    height: 100vh;
    display: flex;
    background-color: #A41623;
    margin: 0;
    font-family: Poppins;
    color: #C05746;
`

const ImageBox = styled(Box)`
    display:flex;
    align-items:center;
`

const Image = styled("img")({
    width: 450,

    '&.background':{
        position: "absolute",
    },

    '&.om':{
        zIndex:1,
        position: 'relative',
        left:-30
    },

    '&.Decoration':{
        position: 'absolute',
        right: 0,
        width: '100vh',
        zIndex: 0,
        pointerEvents:'none'
    }
})

const Wrapper = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
        margin-top: 20px;
    }
    
`

const Butn = styled(Button)`
    background-color: #C05746;
    font-weight: 600;
    margin-top: 40px;
`

const Title = styled(Typography)`
    font-weight: 600;
    margin-bottom: 20px;    
    text-align:center;
    width: contain;
    color: #FFD29D;
    z-index: 2;
`

const Brand= styled(Typography)`
    font-family: Samarkan;
    font-size: 3rem;
    text-align: center;
    color: #FFB563
`

const signupInitialValues = {
    name: "",
    username: "",
    password: ""
}

const loginInitialValues = {
    username: "",
    password: ""
}

function Login() {
    
    const [page, setPage] = useState("login")
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState("");
    const [login, setLogin] = useState(loginInitialValues);
    const dispatch = useDispatch();
    // const [file, setFile] = useState(null);
    // const [preview, setPreview] = useState(null);

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setFile(selectedFile);

    //     // Create a URL to show the image preview
    //     const fileUrl = URL.createObjectURL(selectedFile);
    //     setPreview(fileUrl);
    // };

    // useEffect(()=>{
    //     const imageUpload=async()=>{
    //         if(file){
    //             let formData=new FormData();
    //             formData.append("name",file.name);
    //             formData.append("file",file);
    //             const response=await API.uploadFile(formData);
    //             if(response.isSuccess){
    //                 setSignup(prevSign=>({...prevSign,profile:response.data}))
    //             }
    //         }
    //     }
    //     imageUpload();
    // },[file])

    const navigate = useNavigate();

    const togglePage = () => {
        if (page === "login") {
            setPage("signup")
        } else {
            setPage("login")
        }
        console.log(page)
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const signUpUser = async () => {
        let response = await API.userSignup(signup);

        if (response.isSuccess) {
            setError("");
            setSignup(signupInitialValues);
            togglePage("login");
        } else {
            setError("Something went wrong! Please try again.")
        }
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const loginUser = async () => {
        let res = await API.userLogin(login);
        if (res.isSuccess) {
            setError("");
            setLogin(loginInitialValues);

            const accessToken = `Bearer ${res.data.accessToken}`;
            sessionStorage.setItem("accessToken", accessToken);
            localStorage.setItem("accessToken", accessToken);

            dispatch(setUser(res.data));

            navigate("/");
        } else {
            setError("Unable to login");
        }
    }

    // Testing whether data is updating on redux or not

    ////////////////
    // const test=useSelector((state)=> state.user);

    // useEffect(()=>{
    //     console.log(test);
    // },[login])
    ////////////////

    return (
        <Component>
            <ImageBox>
                <Image src="./om background.svg" className="background"/>
                <Image src="./om.svg" className="om"/>
            </ImageBox>
            {page === "login" ?
                <Wrapper>
                    <Title variant="h3">Welcome<br/>Back To</Title>
                    <Brand>Vedic Verse</Brand>
                    <TextField label="Enter Username" onChange={(e) => onValueChange(e)} name="username" sx={{backgroundColor:"#FFD29D", borderRadius:"10px",zIndex:2}}/>
                    <TextField label="Enter Password" onChange={(e) => onValueChange(e)} name="password" sx={{backgroundColor:"#FFD29D", borderRadius:"10px",zIndex:2}}/>
                    {error && <Alert severity="error" onClose={() => { setError("") }}>{error}</Alert>}
                    <Butn variant="contained" onClick={() => loginUser()}>Login</Butn>
                    <Typography sx={{color:"#FFD29D"}} style={{ marginTop: "10px" }}>New to VedicVerse? <a href="#" onClick={() => togglePage()} style={{ textDecoration: "none", color:"#FFB563", zIndex:3 }}>Signup!</a></Typography>
                </Wrapper>
                
                :
                <Wrapper>
                    <Title variant="h3">Welcome to VaultBlog!</Title>
                    <TextField onChange={(e) => onInputChange(e)} name="name" label="Enter Name" sx={{backgroundColor:"#FFD29D", borderRadius:"10px",zIndex:2}}/>
                    <TextField onChange={(e) => onInputChange(e)} name="username" label="Enter Username" sx={{backgroundColor:"#FFD29D", borderRadius:"10px",zIndex:2}}/>
                    <TextField onChange={(e) => onInputChange(e)} name="password" label="Set Password" sx={{backgroundColor:"#FFD29D", borderRadius:"10px",zIndex:2}}/>

                    {/* Dp input  */}

                    {/* <Box display="flex" flexDirection="column" alignItems="center">
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="upload-file">
                            <Button variant="contained" component="span">
                                Upload File
                            </Button>
                        </label>


                        {preview && (
                            <Box mt={2}>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{ width: '50px', height: 'auto' }}
                                />
                            </Box>
                        )}
                        {file && <p>Selected file: {file.name}</p>}

                    </Box> */}


                    {error && <Alert severity="error">{error}</Alert>}
                    <Butn variant="contained" onClick={() => signUpUser()}>SignUp</Butn>
                    <Typography style={{ marginTop: "10px",color:"#FFD29D" }}>Already have an Account? <a href="#" onClick={() => togglePage()} style={{ textDecoration: "none",color:"#FFB563" }}>Login!</a></Typography>
                </Wrapper>
            }
            <ImageBox>
                <Image src="./Design 1.svg" className="Decoration"/>
            </ImageBox>
        </Component>
    )
}

export default Login