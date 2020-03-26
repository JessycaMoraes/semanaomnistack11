import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; //useHistory, o usuário voltra pra tela de logon depois de se cadastrar
import { FiArrowLeft } from 'react-icons/fi'; //usa ele como componente. https://feathericons.com/?query=arrow%20left

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() { //recebe um único parâmetro, as propriedades
    const [name, setName] = useState(''); //para armazenar os dados do input, precisa criar um estado para cada input para guardar os valores lá
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) { //responsável por fazer o cadastro do usuário. e = recebe evento
        e.preventDefault(); //previne o comportamento padrão do formulário, recarregar toda vez que dá submit

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data); //enviar os dados para a api. Chama a api e faz o cadastro. A resposta vai ser o ID

            alert(`Seu ID de acesso: ${response.data.id}`); //usar crase para enviar variáveis

            history.push('/');
        }catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister} >
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //ouvir as mudanças que acontecem nesse input. Pegar o evento de mudança.
                    //e.target.value = valor do input. Arrow funtion = função escrita no formato reduzido
                    />

                    <input
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsApp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}