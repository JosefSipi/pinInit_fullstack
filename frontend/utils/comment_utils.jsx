export const newComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: "/api/comments",
    data: { comment },
  });
};

export const fetchComments = (pinId) => {
  return $.ajax({
    method: "GET",
    url: `/api/pins/${pinId}/comments`,
  });
};

export const deleteComment = (commentIds) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/pins/${commentIds.pinId}/comments/${commentIds.commentId}`,
  });
};

export const editComment = (commentIds) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/pins/${commentIds.pinId}/comments/${commentIds.commentId}`,
    data: { comment: commentIds.commentForm },
  });
};
