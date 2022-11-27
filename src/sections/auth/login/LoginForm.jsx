import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        navigate('/dashboard', { replace: true });
    };

    function handleSubmit (e) {
        e.preventDefault()
        console.log("submitting form data")
        // const data = new FormData();
        // data.append( "json", JSON.stringify( {email, pass} ) );
        // console.log("data:", data)

        fetch("/auth", {
            method: "POST",
            body: JSON.stringify({
                email, pass
            })
        })
        .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json()
            })
        .then(data => {
                alert( JSON.stringify(data))
                console.log("done")
            })
        .catch(err => {
            console.log("error during fetch:", err)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                <TextField name="email" label="Email Adresi" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  name="password"
                  label="Şifre"
                  type={showPassword ? 'text' : 'password'}
                        value={pass}
                    onChange={(e) => {setPass(e.target.value)}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                    Şifremi Unuttum
                </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Giriş
                </LoadingButton>
            </form>
        </>
  );
}
