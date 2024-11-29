import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Home from './pages/Home/Home.jsx';
import Recrutamento from './pages/Recrutamento/Recrutamento.jsx';
import CriarRecrutamento from './pages/CriarRecrutamento/CriarRecrutamento.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';
import Equipe from './pages/Equipe/Equipe.jsx';
import RecrutamentoDetalhes from './pages/RecrutamentoDetalhes/RecrutamentoDetalhes.jsx';
import { CadastroCurriculo } from './pages/cadastroCurriculo/CadastroCurriculo.jsx'; // Importação correta

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "home", element: <Home /> },
      { path: "recrutamento", element: <Recrutamento /> },
      { path: "criarecrutamento", element: <CriarRecrutamento /> },
      { path: "perfil", element: <Perfil /> },
      { path: "equipe", element: <Equipe /> },
      { path: "RecrutamentoDetalhes", element: <RecrutamentoDetalhes /> },
      { path: "cadastroCurriculo", element: <CadastroCurriculo /> } // Nova rota adicionada aqui
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
