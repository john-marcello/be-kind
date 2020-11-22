import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../utils/MyPopup';

function LikeButton({ user, post: { id, likes, likeCount } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    const likeButton = user ? (
        liked ? (
            <Button color='blue'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='blue' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' color='blue' basic>
            <Icon name='heart' />
        </Button>
    );

    return (
        <MyPopup content={liked ? 'Unlike This Post' : 'Like This Post'}>
            <Button className="like-comment" as='div' labelPosition='right' onClick={likePost}>
                {likeButton}
                <Label basic color='blue' pointing='left'>
                    {likeCount}
                </Label>
            </Button>
        </MyPopup>
    );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;
