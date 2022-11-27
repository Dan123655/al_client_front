import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Router } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { fetchAuth,selectAuth,logout } from '../../redux/slices/auth';
export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure?')) { dispatch(logout()); localStorage.removeItem('token')}
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ALMANACX</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Publish</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
