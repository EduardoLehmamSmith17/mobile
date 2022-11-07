/* Tela secundaria do app */
import { Heading, VStack, Text } from "native-base";

import Logo from "../assests/logo.svg";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";



export function New() {
  return(
    <VStack flex={1} bgColor="gray.800">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da {'\n'}
          copa e convide o seus parças para jogar!
        </Heading>

        <Input
          mb={2}
          placeholder="Digite o nome do seu bolão?"
        />

        <Button 
          title="CRIAR MEU BOLÃO"
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