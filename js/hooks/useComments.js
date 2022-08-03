import useApi from './useApi';

export default function useComments() {
  const freelancesApi = useApi({ resourceName: 'freelances' }); // the request mthods from the freelances construted url
  const commentsApi = useApi({ resourceName: 'comments' }); // request methods from the comments constructed url

  const getComments = (freelanceId) => {
    return freelancesApi.get({ url: '/' + freelanceId + '/comments' }); // get the comments based on the freelaceid
  };

  const createComment = (commentData) => {
    return freelancesApi.post({
      url: '/' + commentData.freelanceId + '/comment',
      json: {
        text: commentData.text,
      },
    }); // created a comment in the freelancer profile
  };

  const updateComment = (commentId, newText) => {
    return commentsApi.patch({
      url: '/' + commentId,
      json: {
        text: newText,
      },
    }); // update a comment in the freelancer profile
  };

  const deleteComment = (commentId) => {
    return commentsApi.del({ url: '/' + commentId }); // delete a comment in the freelanccer profile
  };

  return {
    getComments,
    createComment,
    updateComment,
    deleteComment,
  };
}
