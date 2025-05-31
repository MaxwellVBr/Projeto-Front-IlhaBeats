import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";


const Login = () => {
    const url = import.meta.env.VITE_API + "auth/login";

    const {httpConfig, data, error} = useFetch(url);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const acessarUsuario = (e) => {
        e.preventDefault();
    
        const dadoUser = ({
            login,
            senha
        });

        httpConfig(dadoUser, "POST")
    };

    useEffect(() => {
    if (data && data.token) {
      setSuccessMessage("Login realizado com sucesso! Redirecionando...");
      // Após 2 segundos, redireciona
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      // Limpa o timer caso o componente desmonte antes
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);
    

  return (
    <div>
        Login
        <form onSubmit={acessarUsuario}>
            <label>
                email:
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>
                Senha:
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </label>
            <button type="submit">Logar</button>
        </form>

        {successMessage && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={() => navigate("/cadusuario")}>Cadastre-se</button>
    </div>
  )
}

export default Login