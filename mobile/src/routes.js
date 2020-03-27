import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //sempre vai em volta de todas as rotas
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator(); //primeira navegação criada

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() { //cadastro de rotas dentro do AppStack
    return (
        <NavigationContainer>

            {/* AppStack.Navigator - componente que vem em volta das rotas */}
            {/* screenOptions - para tirar o título da tela */}
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                {/* AppStack.Screen - para cada uma das rotas add na aplicação*/}
                {/* component - cada página criada*/}
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}