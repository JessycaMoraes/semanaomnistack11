import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //torna qualquer coisa clicável e ao clicar diminui a opacidade

import api from '../../services/api';

import logoImg from '../../assets/logo.png'; //ele já importa a logo adequada para a aplicação

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]); //coloca [] pois vai ser inserida uma array depois
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); //recarregar uma página por vez

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //o nome tem que ser exatamente igual ao name do arquivo routes.js. Enviando qual o incid.
    }

    async function loadIncidents() {
        if (loading) { //evita que enquanto outra requisição esteja sendo feita, mais uma requisição venha a acontecer
            return;
        }

        if (total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        //ou const response = await api.get(`incidents?page=${page}`);

        setIncidents([ ...incidents, ...response.data]); //dois vetores dentro de um único vetor
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents} //array de dados que vai montar a lista
                style={styles.incidentList}
                //vai receber cada um dos incidentes (data) 
                keyExtractor={incident => String(incident.id)}
                //keyExtractor={incident => String(incident)} //vai retornar qual que é a informação única que existe em cada um dos incidentes
                //showsVerticalScrollIndicator={false} //tira o scroll
                onEndReached={loadIncidents} //dispara a função automaticamente quando o usuário chegar no final da lista
                onEndReachedThreshold={0.2} //quantos % do final da lista o usuário precisa estar p/ que carregue novos itens
                //função responsável por renderizar cada um dos itens. Parênteses pois retorna um código jsx
                renderItem={({ item: incident }) => ( //mudou de nome, item para incident
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)} //toda vez que quiser mandar parâmetros para alguma função
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}