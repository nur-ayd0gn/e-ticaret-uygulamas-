import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function SecurityScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni şifreler eşleşmiyor.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    Alert.alert(
      'Başarılı',
      'Şifreniz başarıyla güncellendi!',
      [
        {
          text: 'Tamam',
          onPress: () => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Güvenlik</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Password Change Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Şifre Değiştir</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mevcut Şifre</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                placeholder="Mevcut şifrenizi girin"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons 
                  name={showCurrentPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Yeni Şifre</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                placeholder="Yeni şifrenizi girin"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons 
                  name={showNewPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Yeni Şifre (Tekrar)</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                placeholder="Yeni şifrenizi tekrar girin"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
            <Text style={styles.changeButtonText}>Şifreyi Değiştir</Text>
          </TouchableOpacity>
        </View>



        {/* Account Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap Güvenliği</Text>
          
                     <TouchableOpacity 
             style={styles.optionItem}
             onPress={() => {
               Alert.alert(
                 'Oturumdan Çıkış',
                 'Tüm cihazlardan çıkış yapmak istediğinizden emin misiniz?',
                 [
                   {
                     text: 'İptal',
                     style: 'cancel',
                   },
                   {
                     text: 'Çıkış Yap',
                     style: 'destructive',
                     onPress: () => {
                       Alert.alert('Başarılı', 'Tüm cihazlardan çıkış yapıldı!');
                     },
                   },
                 ]
               );
             }}
           >
             <View style={styles.optionLeft}>
               <Ionicons name="log-out-outline" size={24} color="#dc3545" />
               <View style={styles.optionInfo}>
                 <Text style={styles.optionTitle}>Tüm Cihazlardan Çıkış</Text>
                 <Text style={styles.optionSubtitle}>Tüm oturumları sonlandır</Text>
               </View>
             </View>
             <Ionicons name="chevron-forward" size={20} color="#666" />
           </TouchableOpacity>

           <TouchableOpacity 
             style={styles.optionItem}
             onPress={() => {
               Alert.alert(
                 'Hesabı Sil',
                 'Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!',
                 [
                   {
                     text: 'İptal',
                     style: 'cancel',
                   },
                   {
                     text: 'Hesabı Sil',
                     style: 'destructive',
                     onPress: () => {
                       Alert.alert(
                         'Son Uyarı',
                         'Bu işlem hesabınızı kalıcı olarak silecek. Devam etmek istiyor musunuz?',
                         [
                           {
                             text: 'Vazgeç',
                             style: 'cancel',
                           },
                           {
                             text: 'Evet, Hesabımı Sil',
                             style: 'destructive',
                             onPress: () => {
                               Alert.alert('Hesap Silindi', 'Hesabınız başarıyla silindi!');
                             },
                           },
                         ]
                       );
                     },
                   },
                 ]
               );
             }}
           >
             <View style={styles.optionLeft}>
               <Ionicons name="trash-outline" size={24} color="#dc3545" />
               <View style={styles.optionInfo}>
                 <Text style={styles.optionTitle}>Hesabı Sil</Text>
                 <Text style={styles.optionSubtitle}>Hesabınızı kalıcı olarak silin</Text>
               </View>
             </View>
             <Ionicons name="chevron-forward" size={20} color="#666" />
           </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/favorites')}
        >
          <Ionicons name="heart-outline" size={24} color="#666" />
          <Text style={styles.navText}>Favorilerim</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#666" />
          <Text style={styles.navText}>Sepetim</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/account')}
        >
          <Ionicons name="person-outline" size={24} color="#40E0D0" />
          <Text style={[styles.navText, styles.activeNavText]}>Hesabım</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#40E0D0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  changeButton: {
    backgroundColor: '#40E0D0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionInfo: {
    marginLeft: 15,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#40E0D0',
  },
});
