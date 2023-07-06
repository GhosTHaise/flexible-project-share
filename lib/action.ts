import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV == "production";
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : "http://127.0.0.1:4000/graphql";
const apiKEy = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : "letmein";
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000";

const client = new GraphQLClient("apiUrl");

const makeGraphQlRequest = async (query : string,variables = {}) => {
    try {
        //client request
    } catch (error) {
        throw error
    }
}