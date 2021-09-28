import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import fire from '../../components/Fire';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/router'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();
    const handleLogin = (e) => {
        e.preventDefault();
        fire().auth()
            .signInWithEmailAndPassword(username, password)
            .catch((err) => {
                console.log(err.code, err.message);
                setNotification(err.message);
                setTimeout(() => {
                    setNotification('Sign in failed')
                }, 2000)
            });
        setUsername('');
        setPassword('');
        router.push("/");
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="User"
                    onBlur = {({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onBlur={({target}) => setPassword(target.value)}
                />
            </div>
            <div>
                <Button onClick={handleLogin} variant="contained" style={{marginLeft: "10px"}}>Login</Button>
            </div>
            <div style={{marginLeft: "10px", marginTop: "10px"}}>
                <Typography variant="subtitle2">(Use test@test.com/test123 to log on as guest)</Typography>
            </div>
        </Box>
    )
};
export default Login
