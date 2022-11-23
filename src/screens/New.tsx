/* Tela secundaria do app */
import { useState } from "react";
import { Heading, VStack, Text, useToast } from "native-base";

import Logo from "../assests/logo.svg";

import { api } from '../services/api';
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function New() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handlePoolCreate() {
      if(!title.trim()){
        return toast.show({
          title: 'Informe o nome do bolão meu chegado!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      try{
        setIsLoading(true);
        await api.post('/pools', { title })

        toast.show({
          title: 'Bolão criado com sucesso!',
          placement: 'top',
          bgColor: 'green.500'
        });

        setTitle('');
      }catch(error) {
        console.log(error);

        toast.show({
          title: 'Não foi possivel criar o bolão!',
          placement: 'top',
          bgColor: 'red.500'
        });
      } finally {
        setIsLoading(false);
      }
  }
  return(
    <VStack flex={1} bgColor="gray.800">
      <Header title="Criar um novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da {'\n'}
          copa e convide o seus parças para jogar!
        </Heading>

        <Input
          mb={2}
          placeholder="Digite o nome do bolão..."
          onChangeText={setTitle}
          value={title}
        />

        <Button 
          title="CRIAR BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.300" fontSize="sm" textAlign="center" px={3} mt={4}>
          Após criar seu bolão, você deve receber {'\n'}
          um código único para convidar seus {'\n'}
          parças para participar.
        </Text>

      </VStack>
    </VStack>
  );
}