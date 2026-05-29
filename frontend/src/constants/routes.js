export const ROUTES = {
  HOME: "/",
  ADD: "/blogs/new",
  DETAILS: "/blogs/:id",
  EDIT: "/blogs/edit/:id"
};

export const toDetails = (id) => `/blogs/${id}`;
export const toEdit = (id) => `/blogs/edit/${id}`;
