import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks'

function Register(props) {
   
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmed: ''
    });

    const [ addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData }}) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

function registerUser() {
    addUser();
}

    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1>Register</h1>
            <Form.Input 
                label="Choose Username" 
                placeholder="Enter Username..." 
                name="username"
                type="text"
                value={values.username}
                error={errors.username ? true : false }
                onChange={onChange}    
            />
            <Form.Input 
                label="Email Address" 
                placeholder="Enter Email..." 
                name="email"
                type="email"
                value={values.email}
                error={errors.email ? true : false }
                onChange={onChange}    
            />
            <Form.Input 
                label="Choose Password" 
                placeholder="Enter Password..." 
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? true : false }
                onChange={onChange}    
            />
            <Form.Input 
                label="Confirm Password" 
                placeholder="Confirm Password..." name="confirmed"
                type="password"
                value={values.confirmed}
                error={errors.confirmed ? true : false }
                onChange={onChange}    
            />
            <Button type="submit" primary>Register</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmed: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmed: $confirmed
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`


export default Register;