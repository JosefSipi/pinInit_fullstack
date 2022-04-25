export const deleteLike = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/likes/${id}`,
  });
};

export const createLike = (like) => {
  return $.ajax({
    method: "POST",
    url: "/api/likes",
    data: { like },
  });
};
