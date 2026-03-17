import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const returnConditions = [
  {
    title: 'Genel İade Koşulları',
    items: [
      'Sipariş teslim tarihinden itibaren 14 gün içinde iade talebinde bulunabilirsiniz.',
      'Ürün mutlaka orijinal ambalajında ve kullanılmamış olmalıdır.',
      'Ürünün tüm parçaları ve aksesuarları eksiksiz olmalıdır.',
      'Ürün üzerinde herhangi bir hasar, leke veya kullanım izi bulunmamalıdır.',
      'Ürün etiketleri ve koruyucu filmler çıkarılmamış olmalıdır.'
    ]
  },
  {
    title: 'İade Edilemeyen Ürünler',
    items: [
      'Kişisel bakım ürünleri (diş fırçası, tıraş bıçağı vb.)',
      'İç çamaşırı ve yüzme kıyafetleri',
      'Hijyen ürünleri (deodorant, parfüm vb.)',
      'Özel sipariş verilen ürünler',
      'Dijital ürünler ve yazılımlar',
      'Gıda ürünleri ve içecekler',
      'Kırılabilir ürünler (cam, porselen vb.)',
      'Promosyon ve indirimli ürünler (belirtilen durumlar hariç)'
    ]
  },
  {
    title: 'İade Süreci',
    items: [
      'İade talebinizi online olarak oluşturun',
      'Talebiniz 1-2 iş günü içinde değerlendirilir',
      'Onaylandıktan sonra ücretsiz kargo etiketi gönderilir',
      'Ürünü paketleyip kargoya verin',
      'Ürün kontrol edildikten sonra iade tutarı 3-5 iş günü içinde ödenir'
    ]
  },
  {
    title: 'İade Nedenleri',
    items: [
      'Ürün hasarlı veya eksik geldi',
      'Yanlış ürün gönderildi',
      'Ürün beklentileri karşılamadı',
      'Ürün kalitesi yetersiz',
      'Ürün boyutu uygun değil',
      'Ürün rengi farklı',
      'Ürün teknik özellikleri uygun değil'
    ]
  }
];

const importantNotes = [
  {
    icon: 'warning-outline',
    title: 'Önemli Uyarı',
    description: 'İade edilen ürünler orijinal durumunda olmalıdır. Aksi takdirde iade talebiniz reddedilebilir.'
  },
  {
    icon: 'time-outline',
    title: 'Süre Sınırı',
    description: '14 günlük süre, ürünün teslim alındığı tarihten itibaren başlar.'
  },
  {
    icon: 'card-outline',
    title: 'İade Tutarı',
    description: 'İade tutarı, ödeme yapılan karta iade edilir. Kargo ücreti firmamız tarafından karşılanır.'
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Güvenlik',
    description: 'İade sürecinde kişisel bilgileriniz güvenle korunur.'
  }
];

export default function ReturnConditionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İade Koşulları</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <View style={styles.introIcon}>
            <Ionicons name="document-text" size={40} color="#40E0D0" />
          </View>
          <Text style={styles.introTitle}>İade Politikası</Text>
          <Text style={styles.introDescription}>
            Müşteri memnuniyeti bizim için çok önemlidir. 
            Aşağıdaki koşullar çerçevesinde ürünlerinizi iade edebilirsiniz.
          </Text>
        </View>

        {/* Return Conditions */}
        {returnConditions.map((section, index) => (
          <View key={index} style={styles.conditionSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.conditionItem}>
                <View style={styles.bulletPoint}>
                  <Ionicons name="checkmark-circle" size={16} color="#40E0D0" />
                </View>
                <Text style={styles.conditionText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Important Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Önemli Notlar</Text>
          
          {importantNotes.map((note, index) => (
            <View key={index} style={styles.noteCard}>
              <View style={styles.noteIcon}>
                <Ionicons name={note.icon} size={24} color="#40E0D0" />
              </View>
              <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteDescription}>{note.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Sorularınız mı var?</Text>
          <Text style={styles.contactDescription}>
            İade koşulları hakkında detaylı bilgi almak için müşteri hizmetlerimizle iletişime geçebilirsiniz.
          </Text>
          
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call-outline" size={20} color="white" />
            <Text style={styles.contactButtonText}>Müşteri Hizmetleri</Text>
          </TouchableOpacity>
        </View>

        {/* Legal Notice */}
        <View style={styles.legalSection}>
          <Text style={styles.legalTitle}>Yasal Uyarı</Text>
          <Text style={styles.legalText}>
            Bu iade koşulları, Türkiye Cumhuriyeti yasalarına uygun olarak hazırlanmıştır. 
            Tüketici hakları kapsamında belirtilen süreler ve koşullar geçerlidir.
          </Text>
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
  introSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  introIcon: {
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  introDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  conditionSection: {
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
    marginBottom: 15,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    marginRight: 10,
    marginTop: 2,
  },
  conditionText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  notesSection: {
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
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  noteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  noteDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  contactSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40E0D0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  legalSection: {
    backgroundColor: '#f8f9fa',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#40E0D0',
  },
  legalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  legalText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    fontStyle: 'italic',
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
