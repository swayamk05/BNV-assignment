import { Navigate, Route, Routes } from "react-router-dom";
import AddBlog from "../pages/AddBlog";
import BlogDetails from "../pages/BlogDetails";
import BlogList from "../pages/BlogList";
import EditBlog from "../pages/EditBlog";
import { ROUTES } from "../constants/routes";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<BlogList />} />
    <Route path={ROUTES.ADD} element={<AddBlog />} />
    <Route path={ROUTES.DETAILS} element={<BlogDetails />} />
    <Route path={ROUTES.EDIT} element={<EditBlog />} />
    <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
  </Routes>
);

export default AppRoutes;
