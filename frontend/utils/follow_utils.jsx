export const isFollowing = (follows) => {
  //
  return $.ajax({
    method: "GET",
    data: { follows },
    url: "/api/follows",
  });
};

export const numFollowing = (id) => {
  return $.ajax({
    method: "GET",
    data: { id, fromNum: true },
    url: `/api/users/${id}/follows`,
  });
};

export const fetchUserFollowing = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId.id}/follows`,
    data: { userId },
  });
};

export const createFollow = (follow) => {
  //
  return $.ajax({
    method: "POST",
    data: { follow: follow },
    url: "/api/follows",
  });
};

export const deleteFollow = (deleteIds) => {
  //
  return $.ajax({
    method: "DELETE",
    url: `/api/follows/${deleteIds.id}`,
    data: { deleteIds },
  });
};
