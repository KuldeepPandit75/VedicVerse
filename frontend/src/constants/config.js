//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded, Please Wait."
    },
    success:{
        title: "Success",
        message: "Data successfully loaded!"
    },
    responseFailure:{
        title: "Error",
        message: "An error occured while fetching response from the server. Please try again"
    },
    requestFailure:{
        titile: "Error",
        message: "An Error occured while parsing req data"
    },
    networkError:{
        title: "Error",
        message: "Unable to connect with the server. Please check internet connectivity and try again later"
    }
}

//API SERVICE CALL  
//SAMPLE REQUEST
// NEED SERVICE CALL : { url: "/", method: "POST/GET/PUT/DELETE", params: true/false, query: true/false}

export const SERVICE_CALLS={
    userSignup: {url: "/signup", method:"POST"},
    userLogin: {url: "/login", method: "POST"},
    uploadFile: {url: "/file/upload", method: "POST"},
    createPost: {url:"/create", method:"POST"},
    getAllPosts: {url:"/posts", method:"GET", query: true},
    getPostDetails: {url:"/post", method:"GET", params: true},
    updatePost:{url:"/post/update", method:"POST", params: true},
    deletePost:{url:"/post", method:"DELETE", params: true}
}