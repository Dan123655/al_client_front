import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Router } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { fetchAuth, selectAuth, logout } from '../../redux/slices/auth';
import { sizeWidth } from '@mui/system';
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiHomeLine } from 'react-icons/ri'
export const Header = () => {
  const [options, setOptions] = React.useState(false);
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
          <RiHomeLine size={34}/>
          </Link>

          
          <div className={styles.buttons}>
            {options && (<>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button  variant="outlined">Publish</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button  variant="outlined">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button  variant="contained">Sign Up</Button>
                </Link>
              </>
            )}</>)}
            <GiHamburgerMenu
              className={styles.buttons}
              onClick={() => setOptions(!options)}
              size={30}
             />
          </div>
        </div>
      </Container>
    </div>
  );
};
