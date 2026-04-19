import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications'; // <-- NOVO
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Switch, Text, Vibration, View } from 'react-native';

// Configura como as notificações aparecem com o app aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isChimeActive, setIsChimeActive] = useState(true);
  const [isMinuteChimeActive, setIsMinuteChimeActive] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [sound, setSound] = useState<Audio.Sound>();

  const [fontsLoaded] = useFonts({
    'Digital': require('../assets/fonts/digital-7.ttf'),
  });

  // --- LÓGICA DE PERSISTÊNCIA (MEMÓRIA) ---
  const saveSettings = async (chime: boolean, minChime: boolean, vol: number) => {
    try {
      const settings = JSON.stringify({ chime, minChime, vol });
      await AsyncStorage.setItem('@casio_settings', settings);
    } catch (e) { console.log("Erro ao salvar", e); }
  };

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('@casio_settings');
      if (saved !== null) {
        const { chime, minChime, vol } = JSON.parse(saved);
        setIsChimeActive(chime);
        setIsMinuteChimeActive(minChime);
        setVolume(vol);
      }
    } catch (e) { console.log("Erro ao carregar", e); }
  };

  // --- LÓGICA DE AGENDAMENTO NATIVO (ALERTA DE BLOQUEIO) ---
  const configureNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('chime-channel', {
        name: 'Casio Chime',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250],
        sound: 'default',
      });
    }
  };

  const scheduleChimes = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (isChimeActive) {
      // Agenda para disparar em cada hora cheia (minuto 0)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "CASIO ⌚",
          body: "Bipe de Hora Cheia",
          priority: Notifications.AndroidNotificationPriority.MAX,
        },
        trigger: {
          minute: 0,
          repeats: true,
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        } as any,
      });
    }
  };

  useEffect(() => {
    loadSettings();
    configureNotifications();
  }, []);

  useEffect(() => {
    saveSettings(isChimeActive, isMinuteChimeActive, volume);
    scheduleChimes(); // Re-agenda sempre que o usuário mudar o interruptor
  }, [isChimeActive, isMinuteChimeActive, volume]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // Mantemos o timer apenas para o relógio na tela[cite: 2]
  useEffect(() => {
    const timer = setInterval(() => {
      const agora = new Date();
      setTime(agora);
      // Se o app estiver aberto, ele toca o som via código também[cite: 2]
      if (agora.getSeconds() === 0) {
        if (isMinuteChimeActive || (isChimeActive && agora.getMinutes() === 0)) {
          triggerChime();
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isChimeActive, isMinuteChimeActive, volume]);

  async function triggerChime() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/beep.mp3'),
      { volume: volume }
    );
    setSound(sound);
    await sound.playAsync();
    Vibration.vibrate(200);
  }

  if (!fontsLoaded) return null;

  // ... (Mantenha o seu return e estilos exatamente como estão[cite: 2])
  return (
    <View style={styles.container}>
      <View style={styles.watchBezel}>
        <Text style={styles.brandText}>F-91W</Text>
        <Text style={styles.casioLogo}>CASIO</Text>
        <Text style={styles.waterResist}>WATER RESIST</Text>

        <View style={styles.lcdScreen}>
          <View style={styles.lcdHeader}>
            <Text style={styles.lcdHeaderText}>
              {isChimeActive || isMinuteChimeActive ? '🔔 CHIME' : ''}
            </Text>
            <Text style={styles.lcdHeaderText}>24H</Text>
          </View>
          <Text style={styles.clockText}>
            {time.toLocaleTimeString('pt-BR', { hour12: false })}
          </Text>
          <Text style={styles.dateText}>
            {time.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }).toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.controlPanel}>
        <View style={styles.row}>
          <Text style={styles.label}>BIPE HORA</Text>
          <Switch 
            value={isChimeActive} 
            onValueChange={(val) => {
               setIsChimeActive(val);
               if(val) setIsMinuteChimeActive(false);
            }} 
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>BIPE MINUTO</Text>
          <Switch 
            value={isMinuteChimeActive} 
            onValueChange={(val) => {
               setIsMinuteChimeActive(val);
               if(val) setIsChimeActive(false);
            }} 
          />
        </View>
        <Text style={styles.label}>VOLUME: {Math.round(volume * 100)}%</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#4a90e2"
          thumbTintColor="#4a90e2"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center' },
  watchBezel: { backgroundColor: '#0c1219', width: '90%', padding: 25, borderRadius: 35, borderWidth: 4, borderColor: '#2c3e50', alignItems: 'center', elevation: 20 },
  casioLogo: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 2, marginBottom: 5 },
  brandText: { color: '#e74c3c', fontSize: 12, position: 'absolute', top: 15, left: 35 },
  waterResist: { color: '#4a90e2', fontSize: 10, marginTop: 10, fontWeight: 'bold' },
  lcdScreen: { backgroundColor: '#9db500', width: '100%', padding: 15, borderRadius: 5, borderWidth: 3, borderColor: '#000', marginTop: 10 },
  lcdHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: -5 },
  lcdHeaderText: { fontSize: 10, fontFamily: 'Digital', color: 'rgba(0,0,0,0.6)' },
  clockText: { fontSize: 58, fontFamily: 'Digital', color: '#000', textAlign: 'center' },
  dateText: { fontSize: 20, fontFamily: 'Digital', color: '#000', textAlign: 'right', marginTop: -10 },
  controlPanel: { width: '80%', marginTop: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 }
});