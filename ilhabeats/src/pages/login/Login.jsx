import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [usuario, setUsuario] = useState("");

    const acessarUsuario = (e) => {
        e.prevent.default;
    
        setUsuario({
            email,
            senha
        });

        if (authUser === true) {
                        
        }
    
    };
    

  return (
    <div>
        Login
        <form onSubmit={acessarUsuario}>
            <label>
                email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Senha:
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </label>
            <button type="submit">Logar</button>
        </form>
        <button onClick={() => navigate("/cadusuario")}>Cadastre-se</button>
    </div>
  )
}

export default Login