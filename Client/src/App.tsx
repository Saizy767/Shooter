import {BrowserRouter, Route, Routes} from "react-router-dom";
import { AdminHref, AlcoholicHref, HomeBarHref, HomeHref, NonAlcoholicHref } from "./href/href";
import AdminPage from "./pages/AdminPage";
import AlcoholicCategoryPage from "./pages/AlcoholicPage";
import ErrorPage from "./pages/ErrorPage";
import HomeBarPage from "./pages/HomeBarPage";
import MainPage from "./pages/MainPage";
import NonAlcoholicCategoryPage from "./pages/NonAlcoholicPage";




function App() {
  return (
      <BrowserRouter>
        <Routes> 
          <Route path='*' element={<ErrorPage />} />
          <Route path={HomeHref.href} element={<MainPage/>}/>
          <Route path={AlcoholicHref.href} element={<AlcoholicCategoryPage/>}/>
          <Route path={NonAlcoholicHref.href} element={<NonAlcoholicCategoryPage/>}/>
          <Route path={HomeBarHref.href} element={<HomeBarPage/>}/>
          <Route path={AdminHref.href} element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;


