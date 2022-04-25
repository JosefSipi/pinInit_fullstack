// this will allow our frontend to communicate with out backend allowing our front
// end to create new users log users in and log them out

// Createing three methods for:

// creating a new user

export const postUser = (user) => {
  return $.ajax({
    url: `/api/users`,
    method: "POST",
    data: { user },
    // contentType: false,   //-- used in formData refactor --
    // processData: false,
  });
};

// logging user in

export const postSession = (user) =>
  $.ajax({
    url: `/api/session`,
    method: "POST",
    data: { user },
  });

// logging user out

export const deleteSession = () =>
  $.ajax({
    url: `api/session`,
    method: "DELETE",
  });
