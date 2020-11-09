import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';

function PostForm() {
    const { onSubmit, onChange, values } = useForm(createPostCallback, {
        body: '',
    });

    const[createPost, { error }] = useMutation(CREATE_POST_MUTATION, { 
        variables: values,
        update(_, result) {
            console.log(result)
            values.body = ''
        }
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create Post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder='Enter a post'
                    name='body'
                    onChange={onChange}
                    value={values.body}
                />
                <Button type='submit' color='teal'>Submit</Button>
            </Form.Field>
        </Form>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likeCount
            likes {
                id
                username
                createdAt
            }
            commentCount
            comments{
                id
                body
                username
                createdAt
            }
        }
    }
`

export default PostForm;
