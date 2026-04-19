# ⌚ Casio Chime - F-91W Style

Um aplicativo de relógio digital inspirado no icônico **Casio F-91W**, desenvolvido com React Native e Expo. O foco do projeto é a funcionalidade de "Chime" (bipe de hora em hora), recriando a experiência clássica dos relógios de pulso no smartphone.

---

## ✨ Funcionalidades

*   **Design Retrô:** Interface LCD fiel ao cristal líquido original, incluindo a moldura clássica e tipografia digital de sete segmentos.
*   **Hourly Chime:** Opção de sinal sonoro a cada hora cheia, funcionando inclusive com o ecrã bloqueado.
*   **Minute Chime:** Modo especial de bipe a cada minuto (útil para gestão de tempo e foco).
*   **Persistência de Dados:** O app utiliza `AsyncStorage` para lembrar das suas preferências de volume e estados dos bipes, mesmo após reiniciar o telemóvel.
*   **Notificações de Alta Prioridade:** Implementação de canais de notificação Android para garantir que o bipe desperte o sistema.

---

## 🚀 Tecnologias Utilizadas

*   [React Native](https://reactnative.dev/)
*   [Expo SDK 51+](https://expo.dev/)
*   [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) (Agendamento de alarmes)
*   [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/) (Reprodução de áudio)
*   [Async Storage](https://react-native-async-storage.github.io/async-storage/) (Persistência local)
*   [EAS Build](https://expo.dev/eas) (Geração de APK nativo)

---

## 🛠️ Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/casio-chime.git](https://github.com/SEU_USUARIO/casio-chime.git)
2. **Instale as dependências:**
   ```bash
   npm install
3. **Inicie o Expo Go:**
   ```bash
   npx expo start
---

📦 Como gerar o APK (Android)
Este projeto utiliza o EAS Build para gerar instaladores nativos.

Instale o EAS CLI: npm install -g eas-cli

Configure o build: eas build:configure

Gere o APK de teste:
   ```bash
eas build -p android --profile preview

