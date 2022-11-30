import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from 'react-hook-form'
import styles from "./Login.module.scss";
import { useDispatch,useSelector } from "react-redux";
import {selectIsAuth,fetchRegister } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      fullName:'',
      email: '',
      password:''
    },
    mode:'onChange'
  })




  const onSubmit = async (values) => {
    console.log(values)
    // dispatch(fetchAuth(values))

    const data = await dispatch(fetchRegister(values))
    if (!data.payload) { alert('registration unsuccessful') }
    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    }
  }
// React.useEffect(()=>)

  if (isAuth) {
  return <Navigate to='/' />
}
  return (
    <Paper classes={{ root: styles.root }}>
    <form onSubmit={handleSubmit(onSubmit)}>

      <Typography classes={{ root: styles.title }} variant="h5">
        Sign Up
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        

        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Provide email full name' })} className={styles.field} label="full name" fullWidth />
      


      <TextField error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
        type='email'
        {...register('email', { required: 'Provide email adress' })} className={styles.field} label="E-mail" fullWidth />
      



      <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
        type='password'
        {...register('password', { required: 'enter password' })} className={styles.field} label="password" fullWidth />
      

      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Create Account
      </Button>
</form>
    </Paper>
  );
};
