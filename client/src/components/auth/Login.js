import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

export const Login = ({history}) => {
    const[user, setUser] = useState({
        email:'',
        password:''
        })

    const  { email, password} = user;
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { login, error, isAuthenticated } = authContext;

    useEffect(() => {
       if(isAuthenticated) {
        history.push('/');
       }

       if(error === 'No user exists' || error === 'Invalid credentials') {
        alertContext.setAlert(error, 'danger')
       }
    }, [isAuthenticated, error])

    const onChange = (eve) => {
        setUser({...user, [eve.target.name]:eve.target.value})
    }

    const onSubmit = (eve) => {
        eve.preventDefault();
        if(email==='' || password==='') {
            alertContext.setAlert('Enter all the fields', 'danger')
        }
        login({
            email,
            password
        });
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required />
                </div>
                <input type='submit' value='Login' className='btn btn-dark btn-block' />
            </form>
        </div>
    )
}
