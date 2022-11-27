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
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        navigate('/dashboard', { replace: true });
    };

    function handleSubmit (e) {
        e.preventDefault()
        console.log("submitting form data")

        fetch("/newsignup", {
            method: "POST",
            body: JSON.stringify({
                name, 
                email, 
                pass: pass1,
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
                <TextField name="name" label="Adınız" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField name="email" label="Email Adresiniz" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  name="password1"
                  label="Şifreniz"
                  type={showPassword ? 'text' : 'password'}
                        value={pass1}
                    onChange={(e) => {setPass1(e.target.value)}}
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
                <TextField
                  name="password2"
                  label="Şifreniz (tekrar)"
                  type={showPassword ? 'text' : 'password'}
                        value={pass2}
                    onChange={(e) => {setPass2(e.target.value)}}
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

                <Stack direction="row" alignItems="center" justifyContent="left" sx={{ my: 2 }}>
                Bir sonraki adıma geçerek Bireysel Hesap Sözleşmesi ve Ekleri 'ni kabul etmiş sayılırsınız.
                <Link variant="aggrement" underline="hover">
                    Kullanım anlaşması
                </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Giriş
                </LoadingButton>
            </form>
        </>
  );
}
