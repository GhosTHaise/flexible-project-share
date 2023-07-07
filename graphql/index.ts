export const getUserQuery = `
    query GetUser($email : String!){
        user(by : {email}){
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl
        }
    }
`;