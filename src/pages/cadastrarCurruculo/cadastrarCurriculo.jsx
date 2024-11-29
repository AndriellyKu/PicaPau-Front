import { useState } from "react";
import { getDados } from "../../components/local";
import axios from "axios";

function CadastrarCurriculo() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [arquivo, setArquivo] = useState(null);

    function funCadastrarCurriculo(e) {
        e.preventDefault();

        console.log("Nome: " + nome);
        console.log("Email: " + email);
        console.log("Cpf: " + cpf);
        console.log("Arquivo: ", arquivo);

        if (nome !== "" && email !== "" && cpf !== "" && arquivo) {
            let user = getDados();
            const http = axios.create({
                baseURL: "https://picapauapi-production.up.railway.app/api",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("email", email);
            formData.append("cpf", cpf);
            formData.append("arquivo", arquivo); 

            http.post("curriculos/", formData)
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("Preencha todos os campos e selecione um arquivo.");
        }
    }

    return (
        <>
            <h2>Cadastrar Curriculo</h2>
            <form onSubmit={funCadastrarCurriculo}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cpf"
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setArquivo(e.target.files[0])}
                />
                <input type="submit" />
            </form>
        </>
    );
}

export default CadastrarCurriculo;
