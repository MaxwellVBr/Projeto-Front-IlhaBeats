import "./CadastroUsuario.css";

import { useState } from "react";
import { useFetch } from "../../hook/useFetch";

const CadastroUsuario = () => {
  // Rota Http para API
  const url = import.meta.env.VITE_API + "login";

  // Variaveis 
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [usuario, setUsuario] = useState("");

  // Função para formatar o input CPF para 11 digitos
  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  // Função para enviar dados do formulario
  const handleSubmit = (e) => {
    const { httpconfig } = useFetch(url);
    e.prevent.default;

    setUsuario({
      nome,
      senha,
      email,
      cpf,
    });

    httpconfig(usuario, "POST");

    setNome("");
    setSenha("");
    setEmail("");
    setCpf("");
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            value={formatarCPF(cpf)}
            onChange={(e) => setCpf(e.target.value)}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
