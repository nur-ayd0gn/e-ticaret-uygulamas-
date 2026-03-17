import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface ReturnRequest {
  id: string;
  orderNumber: string;
  productName: string;
  productImage: string;
  returnDate: string;
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'rejected';
  reason: string;
  refundAmount: number;
}

const returnRequests: ReturnRequest[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    productName: 'iPhone 14 Pro',
    productImage: '📱',
    returnDate: '15.12.2024',
    status: 'completed',
    reason: 'Ürün hasarlı geldi',
    refundAmount: 45999
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    productName: 'MacBook Air M2',
    productImage: '💻',
    returnDate: '10.12.2024',
    status: 'processing',
    reason: 'Yanlış model gönderildi',
    refundAmount: 32999
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    productName: 'AirPods Pro',
    productImage: '🎧',
    returnDate: '05.12.2024',
    status: 'pending',
    reason: 'Beklentilerimi karşılamadı',
    refundAmount: 8999
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#ffc107';
    case 'approved':
      return '#28a745';
    case 'processing':
      return '#17a2b8';
    case 'completed':
      return '#28a745';
    case 'rejected':
      return '#dc3545';
    default:
      return '#666';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Beklemede';
    case 'approved':
      return 'Onaylandı';
    case 'processing':
      return 'İşleniyor';
    case 'completed':
      return 'Tamamlandı';
    case 'rejected':
      return 'Reddedildi';
    default:
      return 'Bilinmiyor';
  }
};

export default function ReturnsExchangesScreen() {
  const router = useRouter();
  const [requests, setRequests] = useState<ReturnRequest[]>(returnRequests);

  const createNewReturn = () => {
    Alert.alert('Yeni İade Talebi', 'Bu özellik yakında eklenecek!');
  };

  const viewReturnDetails = (request: ReturnRequest) => {
    Alert.alert(
      'İade Detayları',
      `Sipariş No: ${request.orderNumber}\nÜrün: ${request.productName}\nDurum: ${getStatusText(request.status)}\nİade Nedeni: ${request.reason}\nİade Tutarı: ₺${request.refundAmount.toLocaleString()}`,
      [{ text: 'Tamam' }]
    );
  };

  const cancelReturn = (id: string) => {
    Alert.alert(
      'İade Talebini İptal Et',
      'Bu iade talebini iptal etmek istediğinizden emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'İptal Et',
          style: 'destructive',
          onPress: () => {
            setRequests(prev => prev.filter(req => req.id !== id));
            Alert.alert('Başarılı', 'İade talebi iptal edildi!');
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
        <Text style={styles.headerTitle}>İade ve Değişim</Text>
        <TouchableOpacity onPress={createNewReturn} style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Return Policy Section */}
        <View style={styles.policySection}>
          <Text style={styles.sectionTitle}>İade Politikası</Text>
          <View style={styles.policyItem}>
            <Ionicons name="time-outline" size={20} color="#40E0D0" />
            <Text style={styles.policyText}>14 gün içinde ücretsiz iade</Text>
          </View>
          <View style={styles.policyItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#40E0D0" />
            <Text style={styles.policyText}>Orijinal ambalajında olmalı</Text>
          </View>
          <View style={styles.policyItem}>
            <Ionicons name="card-outline" size={20} color="#40E0D0" />
            <Text style={styles.policyText}>Ödeme yapılan karta iade</Text>
          </View>
        </View>

        {/* Return Requests */}
        <View style={styles.requestsSection}>
          <Text style={styles.sectionTitle}>İade Taleplerim</Text>
          
          {requests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="swap-horizontal-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Henüz iade talebiniz bulunmuyor</Text>
              <TouchableOpacity style={styles.createButton} onPress={createNewReturn}>
                <Text style={styles.createButtonText}>Yeni İade Talebi Oluştur</Text>
              </TouchableOpacity>
            </View>
          ) : (
            requests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productImage}>{request.productImage}</Text>
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{request.productName}</Text>
                      <Text style={styles.orderNumber}>Sipariş: {request.orderNumber}</Text>
                      <Text style={styles.returnDate}>İade Tarihi: {request.returnDate}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(request.status) }
                  ]}>
                    <Text style={styles.statusText}>{getStatusText(request.status)}</Text>
                  </View>
                </View>

                <View style={styles.requestDetails}>
                  <Text style={styles.reasonText}>
                    <Text style={styles.label}>İade Nedeni:</Text> {request.reason}
                  </Text>
                  <Text style={styles.refundText}>
                    <Text style={styles.label}>İade Tutarı:</Text> ₺{request.refundAmount.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.requestActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => viewReturnDetails(request)}
                  >
                    <Ionicons name="eye-outline" size={16} color="#40E0D0" />
                    <Text style={styles.actionText}>Detayları Gör</Text>
                  </TouchableOpacity>
                  
                  {request.status === 'pending' && (
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.cancelButton]}
                      onPress={() => cancelReturn(request.id)}
                    >
                      <Ionicons name="close-outline" size={16} color="#dc3545" />
                      <Text style={[styles.actionText, styles.cancelText]}>İptal Et</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>Yardım</Text>
          <TouchableOpacity 
            style={styles.helpItem}
            onPress={() => router.push('/how-to-return' as any)}
          >
            <Ionicons name="help-circle-outline" size={24} color="#40E0D0" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>İade Nasıl Yapılır?</Text>
              <Text style={styles.helpSubtitle}>Adım adım iade süreci</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpItem}
            onPress={() => router.push('/return-conditions' as any)}
          >
            <Ionicons name="document-text-outline" size={24} color="#40E0D0" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>İade Koşulları</Text>
              <Text style={styles.helpSubtitle}>Detaylı iade şartları</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.helpItem}>
            <Ionicons name="call-outline" size={24} color="#40E0D0" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Müşteri Hizmetleri</Text>
              <Text style={styles.helpSubtitle}>Bize ulaşın</Text>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  policySection: {
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
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  policyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  requestsSection: {
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#40E0D0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  requestCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  productImage: {
    fontSize: 32,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  returnDate: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  requestDetails: {
    marginBottom: 10,
  },
  reasonText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  refundText: {
    fontSize: 14,
    color: '#333',
  },
  label: {
    fontWeight: '600',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#40E0D0',
    marginLeft: 4,
  },
  cancelButton: {
    
  },
  cancelText: {
    color: '#dc3545',
  },
  helpSection: {
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
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpContent: {
    flex: 1,
    marginLeft: 15,
  },
  helpTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#666',
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
