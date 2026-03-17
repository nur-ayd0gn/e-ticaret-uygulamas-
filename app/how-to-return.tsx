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

const returnSteps = [
  {
    id: 1,
    title: 'Siparişinizi Seçin',
    description: 'İade etmek istediğiniz ürünün bulunduğu siparişi "Geçmiş Siparişlerim" bölümünden seçin.',
    icon: 'bag-outline',
    color: '#40E0D0'
  },
  {
    id: 2,
    title: 'İade Nedeni Belirtin',
    description: 'Ürünü neden iade etmek istediğinizi seçin: hasarlı ürün, yanlış model, beklentileri karşılamadı vb.',
    icon: 'document-text-outline',
    color: '#70EFEF'
  },
  {
    id: 3,
    title: 'Ürün Durumunu Kontrol Edin',
    description: 'Ürünün orijinal ambalajında ve kullanılmamış olduğundan emin olun. Eksik parça olmamalı.',
    icon: 'checkmark-circle-outline',
    color: '#1CA6A6'
  },
  {
    id: 4,
    title: 'İade Talebini Gönderin',
    description: 'İade formunu doldurun ve talebinizi gönderin. Onay süreci 1-2 iş günü sürer.',
    icon: 'send-outline',
    color: '#40E0D0'
  },
  {
    id: 5,
    title: 'Kargo Etiketini Alın',
    description: 'Onaylandıktan sonra ücretsiz kargo etiketi e-posta ile gönderilir.',
    icon: 'print-outline',
    color: '#70EFEF'
  },
  {
    id: 6,
    title: 'Ürünü Kargoya Verin',
    description: 'Ürünü paketleyin, kargo etiketini yapıştırın ve en yakın kargo noktasına teslim edin.',
    icon: 'car-outline',
    color: '#1CA6A6'
  },
  {
    id: 7,
    title: 'İade İşlemi Tamamlanır',
    description: 'Ürün kontrol edildikten sonra iade tutarı 3-5 iş günü içinde ödeme yapılan karta iade edilir.',
    icon: 'card-outline',
    color: '#40E0D0'
  }
];

const importantNotes = [
  {
    icon: 'time-outline',
    title: '14 Gün Süre',
    description: 'Sipariş teslim tarihinden itibaren 14 gün içinde iade talebinde bulunabilirsiniz.'
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Orijinal Ambalaj',
    description: 'Ürün mutlaka orijinal ambalajında ve kullanılmamış olmalıdır.'
  },
  {
    icon: 'card-outline',
    title: 'Ücretsiz Kargo',
    description: 'İade kargo ücreti firmamız tarafından karşılanır.'
  },
  {
    icon: 'refresh-outline',
    title: 'Hızlı İşlem',
    description: 'İade işlemi ortalama 3-5 iş günü içinde tamamlanır.'
  }
];

export default function HowToReturnScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İade Nasıl Yapılır?</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <View style={styles.introIcon}>
            <Ionicons name="help-circle" size={40} color="#40E0D0" />
          </View>
          <Text style={styles.introTitle}>İade Süreci</Text>
          <Text style={styles.introDescription}>
            Ürününüzü kolayca iade etmek için aşağıdaki adımları takip edin. 
            Tüm süreç online olarak yönetilir ve ücretsizdir.
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>Adım Adım İade Süreci</Text>
          
          {returnSteps.map((step, index) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: step.color }]}>
                  <Text style={styles.stepNumberText}>{step.id}</Text>
                </View>
                <View style={styles.stepInfo}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
                <View style={[styles.stepIcon, { backgroundColor: step.color }]}>
                  <Ionicons name={step.icon} size={24} color="white" />
                </View>
              </View>
              
              {index < returnSteps.length - 1 && (
                <View style={styles.stepConnector}>
                  <View style={[styles.connectorLine, { backgroundColor: step.color }]} />
                </View>
              )}
            </View>
          ))}
        </View>

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

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
          
          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>İade süresi ne kadar?</Text>
            <Text style={styles.faqAnswer}>
              İade işlemi ortalama 3-5 iş günü içinde tamamlanır. 
              Ürün kontrol edildikten sonra iade tutarı ödeme yapılan karta iade edilir.
            </Text>
          </View>
          
          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Kargo ücreti kim ödüyor?</Text>
            <Text style={styles.faqAnswer}>
              İade kargo ücreti tamamen firmamız tarafından karşılanır. 
              Ücretsiz kargo etiketi e-posta ile gönderilir.
            </Text>
          </View>
          
          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Hangi ürünler iade edilemez?</Text>
            <Text style={styles.faqAnswer}>
              Kişisel bakım ürünleri, iç çamaşırı, yüzme kıyafetleri ve 
              özel sipariş verilen ürünler sağlık ve hijyen nedeniyle iade edilemez.
            </Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Yardıma mı ihtiyacınız var?</Text>
          <Text style={styles.contactDescription}>
            İade süreci hakkında sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz.
          </Text>
          
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call-outline" size={20} color="white" />
            <Text style={styles.contactButtonText}>Müşteri Hizmetleri</Text>
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
  stepsSection: {
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
  stepCard: {
    marginBottom: 10,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepConnector: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  connectorLine: {
    width: 2,
    height: 20,
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
  faqSection: {
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
  faqCard: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
