import {useState} from "react";
import {useNavigate} from "react-router-dom";
// material
import {FormHelperText, IconButton, InputAdornment, Stack, TextField,} from "@mui/material";
import {LoadingButton} from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import {useSnackbar} from "notistack";
import {login} from "src/DAL/auth";

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [formInputs, setFormInputs] = useState({email: "saqlainhaider434@gmail.com", password: "12345"});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {enqueueSnackbar} = useSnackbar();
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const handleChange = (e) => {
        const {target} = e;
        setFormInputs({...formInputs, [target.name]: target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = {
            'email': formInputs.email,
          'password': formInputs.password
        };

        const result = await login(formData);
        if (result.statusCode === 200) {
            localStorage.setItem("token", result?.accessToken);
            localStorage.setItem(`user_data`, JSON.stringify(result.data));

            enqueueSnackbar(result.message, {variant: "success"});
            setIsLoading(false);

            navigate("/dashboard");
        } else if (typeof result?.message == "string") {
            setIsLoading(false);
            enqueueSnackbar(result.message, {variant: "error"});
        } else {
            setIsLoading(false);
            setError(result?.message);
        }
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    value={formInputs.email}
                    onChange={handleChange}
                    name="email"
                    required
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                />
                {error?.email && (
                    <FormHelperText sx={{color: "red", fontSize: "13px"}}>
                        {error?.email[0]}
                    </FormHelperText>
                )}
                <TextField
                    value={formInputs.password}
                    onChange={handleChange}
                    fullWidth
                    name="password"
                    required
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    <Iconify
                                        icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {error?.password && (
                    <FormHelperText sx={{color: "red", fontSize: "13px"}}>
                        {error?.password[0]}
                    </FormHelperText>
                )}
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{my: 2}}
            ></Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{textTransform: "none", fontSize: "15px"}}
            >
                {isLoading ? "Login.." : "Login"}
            </LoadingButton>
        </form>
    );
}
