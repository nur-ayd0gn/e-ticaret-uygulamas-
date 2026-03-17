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


const TURKISH_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
  'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
  'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

const MONTHS = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
];

const YEARS = [
  '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034'
];

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [use3DSecure, setUse3DSecure] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const handleCompletePayment = () => {
    if (!selectedCity || !homeAddress || !cardNumber || !selectedMonth || !selectedYear || !cvv) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }
    
    Alert.alert(
      'Başarılı',
      'Ödeme işlemi tamamlandı!',
      [
        {
          text: 'Tamam',
          onPress: () => router.push('/')
        }
      ]
    );
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödeme</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Summary Section */}
        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Sipariş Özeti</Text>
          <View style={styles.orderItem}>
            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemName}>Akıllı Telefon</Text>
              <Text style={styles.orderItemQuantity}>1 adet</Text>
            </View>
            <Text style={styles.orderItemPrice}>1.299,99 ₺</Text>
          </View>
          <View style={styles.orderItem}>
            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemName}>Kablosuz Kulaklık</Text>
              <Text style={styles.orderItemQuantity}>2 adet</Text>
            </View>
            <Text style={styles.orderItemPrice}>599,98 ₺</Text>
          </View>
          <View style={styles.orderItem}>
            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemName}>Spor Ayakkabı</Text>
              <Text style={styles.orderItemQuantity}>1 adet</Text>
            </View>
            <Text style={styles.orderItemPrice}>199,99 ₺</Text>
          </View>
          <View style={styles.orderTotal}>
            <Text style={styles.orderTotalLabel}>Toplam:</Text>
            <Text style={styles.orderTotalPrice}>2.099,96 ₺</Text>
          </View>
        </View>

        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teslimat Adresi</Text>
          <Text style={styles.label}>Şehir</Text>
          <TouchableOpacity 
            style={styles.dropdown} 
            onPress={() => setShowCityDropdown(!showCityDropdown)}
          >
            <Text style={[styles.dropdownText, !selectedCity && styles.placeholderText]}>
              {selectedCity || 'Seçiniz'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          
          {showCityDropdown && (
            <View style={styles.dropdownList}>
              <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                {TURKISH_CITIES.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCity(city);
                      setShowCityDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{city}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <Text style={styles.label}>Ev Adresi</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Mahalle, sokak, bina no, daire no vb."
            value={homeAddress}
            onChangeText={setHomeAddress}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Card Information Section */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Kart Bilgileri</Text>
          
          <Text style={styles.label}>Kart No</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            keyboardType="numeric"
            maxLength={19}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Son Kullanma Tarihi</Text>
              <View style={styles.dateRow}>
                <TouchableOpacity 
                  style={styles.dropdown} 
                  onPress={() => setShowMonthDropdown(!showMonthDropdown)}
                >
                  <Text style={[styles.dropdownText, !selectedMonth && styles.placeholderText]}>
                    {selectedMonth || 'Ay'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.dropdown} 
                  onPress={() => setShowYearDropdown(!showYearDropdown)}
                >
                  <Text style={[styles.dropdownText, !selectedYear && styles.placeholderText]}>
                    {selectedYear || 'Yıl'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.halfWidth}>
              <Text style={styles.label}>CVV</Text>
              <View style={styles.cvvContainer}>
                <TextInput
                  style={styles.cvvInput}
                  placeholder="123"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                />
                <TouchableOpacity style={styles.infoButton}>
                  <Ionicons name="information-circle-outline" size={20} color="#FF6B35" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {showMonthDropdown && (
            <View style={styles.dropdownList}>
              <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                {MONTHS.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedMonth(month);
                      setShowMonthDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{month}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {showYearDropdown && (
            <View style={styles.dropdownList}>
              <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                {YEARS.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedYear(year);
                      setShowYearDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setUse3DSecure(!use3DSecure)}
          >
            <View style={[styles.checkbox, use3DSecure && styles.checkboxChecked]}>
              {use3DSecure && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.checkboxText}>3D Secure ile ödemek istiyorum</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Complete Payment Button */}
      <TouchableOpacity style={styles.completeButton} onPress={handleCompletePayment}>
        <Text style={styles.completeButtonText}>Ödemeyi Tamamla</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#666" />
          <Text style={styles.navText}>Favorilerim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#666" />
          <Text style={styles.navText}>Sepetim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Hesabım</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#70EFEF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  orderItemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#40E0D0',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#40E0D0',
  },
  orderTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderTotalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#40E0D0',
  },
  section: {
    marginBottom: 20,
  },
  cardSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cvvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvvInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 10,
  },
  infoButton: {
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#40E0D0',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#40E0D0',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  completeButton: {
    backgroundColor: '#40E0D0',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
});
