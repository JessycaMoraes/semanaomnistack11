import React, { useState, useEffect } from 'react'; //useEffect dispara função em determinado momento do componente
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'; //usa ele como componente. https://feathericons.com/?query=sign

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() { //recebe um único parâmetro, as propriedades
    const [incidents, setIncidents] = useState([]); //usa sempre para gravar as informações dentro dele

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => { //prim - função para carregar os casos, seg-quando a função vai ser executada
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => { //para pegar os dados
            setIncidents(response.data);
        })
    }, [ongId]);
    //[] - array de dependências, toda vez que mudar a função será executada. Se deixar vazio, executa apenas 1 vez

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //com isso não precisa ficar dando F5 para o caso sumir da pág depois de deletado
            setIncidents(incidents.filter(incident => incident.id != id)) //mantém todos os casos com id diferente do id dessa função
        }catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            {/* listagem */}
            <ul>
                {/* percorrer cada um deles retornando alguma coisa */}
                {incidents.map(incident => (
                    //quando se faz uma interação precisar usar key
                    //ajuda o react a encontrar qual item é qual na hora de deletar, modificar item da interface
                    <li key={incident.id}>
                        {/* propriedade */}
                        <strong>CASO:</strong>
                        {/* valor */}
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        {/* passo a função no onClick e não o retorno dela */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button" >
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}