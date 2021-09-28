import { useState } from 'react';
import fire from '../../components/Fire';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = () => {
    const router = useRouter();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [notification, setNotification] = useState('');
    const handleRegistration = (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setNotification(
                'Password and password confirmation does not match'
            );
            setTimeout(() => {
                setNotification('')
            }, 2000);
            setPassword('');
            setPasswordConfirmation('');
            return null;
        }
        fire().auth()
            .createUserWithEmailAndPassword(userName, password)
            .catch((err) => {
                console.log(err.code, err.message)
            });
        router.push("/")
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
            <div>{notification}</div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
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
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password Confirmation"
                    type="password"
                    autoComplete="current-password"
                    onBlur={({target}) => setPasswordConfirmation(target.value)}
                />
            </div>
            <div>
                <Button onClick={handleRegistration} variant="contained" style={{marginLeft: "10px"}}>Register</Button>
            </div>
        </Box>
    )
};
export default Register;
