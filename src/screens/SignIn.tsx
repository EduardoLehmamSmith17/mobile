/* Tela de login do app */
import { Center, Text, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import Logo from '../assests/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth'

export function SigIn() {
  const{ signIn, user }= useAuth();

  return (
    <Center flex={1} bgColor= "green.500" p={7}>
      <Logo width={212} height={40}/>

      <Button 
         type='SECUNDARY'
         title="ENTRAR COM GOOGLE"
         leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
         mt={12}
         onPress={ signIn }
      />
      <Text color="white" textAlign="center" px={3} mt={4}>
        Não utilizamos nenhuma informação além 
        do seu e-mail para criação da sua conta.
      </Text>
    </Center>
  )
}