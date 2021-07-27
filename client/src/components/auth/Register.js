import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

export const Register = ({history}) => {
    const authContext = useContext(AuthContext);  
    const { register, error, clearErrors, isAuthenticated } = authContext;    
    const alertContext = useContext(AlertContext);  
    const[user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/');
        }
        if(error === 'USer already exists') {
            alertContext.setAlert('User Already Exists','danger')
            clearErrors();
        }
    }, [error, isAuthenticated])

    const  {name, email, password, password2} = user;

    const onChange = (eve) => {
        setUser({...user, [eve.target.name]:eve.target.value})
    }

    const onSubmit = (eve) => {
        eve.preventDefault();
        if(name == '' || email == '' || password == '') {
            alertContext.setAlert('Fill all the fields','danger')
        } else if(password !== password2) {
            alertContext.setAlert('Password does not match','danger')
        }
        register({
            name,
            email,
            password
        });
    }

    return (
        <div className='form-container'>
            <h1>
               Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required minLength='8' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onChange} required />
                </div>
                <input type='submit' value='Register' className='btn btn-dark btn-block' />
            </form>
        </div>
    )
}
