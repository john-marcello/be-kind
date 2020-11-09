import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
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
`;