export const createNewBoard = (creatForm) => {
  return $.ajax({
    method: "POST",
    data: { board: creatForm },
    url: `/api/boards`,
  });
};

export const fetchBoards = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}/boards`,
  });
};

export const fetchBoard = (boardId) => {
  return $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}`,
  });
};

export const updateBoard = (board) => {
  return $.ajax({
    method: "PATCH",
    url: `api/boards/${board.id}`,
    data: { board },
  });
};

export const deleteBoard = (boardId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/boards/${boardId}`,
  });
};
