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

interface OrderItem {
  id: string;
  productName: string;
  price: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing';
  image: string;
}

const orderHistory: OrderItem[] = [
  {
    id: '1',
    productName: 'iPhone 14 Pro',
    price: '₺45,999',
    date: '15 Mart 2024',
    status: 'Delivered',
    image: '📱'
  },
  {
    id: '2',
    productName: 'MacBook Air M2',
    price: '₺32,999',
    date: '10 Mart 2024',
    status: 'Delivered',
    image: '💻'
  },
  {
    id: '3',
    productName: 'AirPods Pro',
    price: '₺7,499',
    date: '5 Mart 2024',
    status: 'In Transit',
    image: '🎧'
  },
  {
    id: '4',
    productName: 'iPad Air',
    price: '₺18,999',
    date: '1 Mart 2024',
    status: 'Processing',
    image: '📱'
  },
  {
    id: '5',
    productName: 'Apple Watch Series 8',
    price: '₺12,999',
    date: '25 Şubat 2024',
    status: 'Delivered',
    image: '⌚'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return '#28a745';
    case 'In Transit':
      return '#ffc107';
    case 'Processing':
          
      return '#40E0D0';
    
    default:
      return '#6c757d';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'Teslim Edildi';
    case 'In Transit':
      return 'Yolda';
    case 'Processing':
      return 'Hazırlanıyor';
    default:
      return status;
  }
};

export default function OrderHistoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Geçmiş Siparişlerim</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {orderHistory.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <Text style={styles.orderId}>Sipariş #{order.id}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
              </View>
            </View>

            <View style={styles.productSection}>
              <View style={styles.productImage}>
                <Text style={styles.emoji}>{order.image}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{order.productName}</Text>
                <Text style={styles.productPrice}>{order.price}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.redButton}>
                <Ionicons name="receipt-outline" size={16} color="white" />
                <Text style={styles.buttonText}>Fatura Görüntüle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.redButton}>
                <Ionicons name="refresh-outline" size={16} color="white" />
                <Text style={styles.buttonText}>Tekrar Sipariş Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.redButton}>
                <Ionicons name="star-outline" size={16} color="white" />
                <Text style={styles.buttonText}>Değerlendir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  orderCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  orderId: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  productSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emoji: {
    fontSize: 30,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#40E0D0',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40E0D0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
