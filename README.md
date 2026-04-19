# ⌚ Casio Chime - F-91W Digital Style

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Um aplicativo de relógio digital minimalista e funcional, inspirado no lendário design do **Casio F-91W**. Este projeto foi desenvolvido para recriar a experiência do clássico "bipe" de hora em hora (Hourly Chime) diretamente no smartphone, com foco em precisão e economia de bateria.

---

## 🚀 Funcionalidades

- **Interface Nostálgica:** Visual LCD retro fiel aos relógios de cristal líquido, com moldura clássica e fonte digital de sete segmentos.
- **Hourly Chime (Bipe de Hora):** Sinal sonoro clássico a cada hora cheia.
- **Minute Chime (Bipe de Minuto):** Modo de alta frequência para gestão de tarefas curtas ou foco (Pomodoro style).
- **Memória Persistente:** Salva automaticamente suas preferências de volume e estado dos bipes usando `AsyncStorage`.
- **Alta Confiabilidade:** Implementação de notificações de sistema e alarmes de alta prioridade para funcionar mesmo com o ecrã bloqueado.

---

## 🛠️ Tecnologias e Bibliotecas

O projeto utiliza o ecossistema **Expo** para garantir máxima compatibilidade entre dispositivos Android:

- **Core:** React Native & Expo SDK  
- **Áudio:** `expo-av`  
- **Notificações:** `expo-notifications`  
- **Armazenamento:** `@react-native-async-storage/async-storage`  
- **UI/UX:** `expo-font` e `@react-native-community/slider`  

---

## 📦 Como Instalar e Rodar

### Pré-requisitos
- Node.js instalado  
- Expo Go instalado no smartphone  

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/casio-chime.git
2. **Entre na pasta do projeto:**
   ```bash
   cd casio-chime
3. **Instale as dependências:**
   ```bash
   npm install
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
5. **Escaneie o QR Code com o app Expo Go no Android.**
---
🏗️ Geração do APK (Nativo)

Para gerar um .apk usando o EAS Build:
1. **Instale o CLI:**
   ```bash
   npm install -g eas-cli
2. **Faça login:**
   ```bash
   eas login
3. **Gere o APK:**
   ```bash
   eas build -p android --profile preview
---
⚠️ Configuração de Bateria (IMPORTANTE)

Para garantir que o bipe funcione com o celular bloqueado:

1. **Vá em Configurações > Aplicativos**
2. **Selecione Casio Chime**
3. **Clique em Bateria**
4. **Marque Sem restrições (Unrestricted)**
---
📄 Licença

**Este projeto está sob a licença MIT. Sinta-se livre para clonar, modificar e distribuir.**
---
👨‍💻 Desenvolvedor

**Projeto desenvolvido por Márcio Roya como parte de um estudo prático de desenvolvimento mobile voltado para produtividade e design clássico.**
---
