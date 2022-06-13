import useApi from "./useApi";


export default function useComments() {

    const freelancesApi = useApi({resourceName: "freelances"});
    const commentsApi = useApi({resourceName: "comments"});


    const getComments = (freelanceId) => {
        return freelancesApi.get({url: "/" + freelanceId + "/comments"});
    }

    const createComment = (commentData) => {
        return freelancesApi.post({url: "/" + commentData.freelanceId + "/comment", json: {
            text: commentData.text,
        }});
    }


    const updateComment = (commentId, newText) => {
        return commentsApi.patch({url: "/" + commentId, json: {
            text: newText,
        }});
    }


    const deleteComment = (commentId) => {
        return commentsApi.del({url: "/" + commentId});
    }


    return {
        getComments,
        createComment,
        updateComment,
        deleteComment
    }
}