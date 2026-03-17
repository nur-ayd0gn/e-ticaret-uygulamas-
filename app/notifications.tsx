import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promotion' | 'security' | 'general';
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Siparişiniz Teslim Edildi',
    message: 'iPhone 14 Pro siparişiniz başarıyla teslim edildi. Siparişinizi değerlendirmeyi unutmayın!',
    time: '2 saat önce',
    type: 'order',
    isRead: false
  },
  {
    id: '2',
    title: '%20 İndirim Fırsatı',
    message: 'Elektronik ürünlerde %20 indirim fırsatı! Bu fırsatı kaçırmayın.',
    time: '5 saat önce',
    type: 'promotion',
    isRead: false
  },
  {
    id: '3',
    title: 'Güvenlik Uyarısı',
    message: 'Hesabınıza yeni bir cihazdan giriş yapıldı. Bu siz misiniz?',
    time: '1 gün önce',
    type: 'security',
    isRead: true
  },
  {
    id: '4',
    title: 'Kargo Takip Güncellemesi',
    message: 'MacBook Air M2 siparişiniz kargoya verildi. Takip numarası: TR123456789',
    time: '2 gün önce',
    type: 'order',
    isRead: true
  },
  {
    id: '5',
    title: 'Yeni Ürün Duyurusu',
    message: 'Apple Watch Series 9 artık satışta! Hemen inceleyin.',
    time: '3 gün önce',
    type: 'promotion',
    isRead: true
  },
  {
    id: '6',
    title: 'Hesap Doğrulama',
    message: 'E-posta adresinizi doğrulamak için lütfen e-postanızı kontrol edin.',
    time: '1 hafta önce',
    type: 'security',
    isRead: true
  },
  {
    id: '7',
    title: 'Ödeme Başarılı',
    message: '₺1,299 tutarındaki ödemeniz başarıyla gerçekleştirildi.',
    time: '1 hafta önce',
    type: 'order',
    isRead: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order':
      return 'bag-outline';
    case 'promotion':
      return 'pricetag-outline';
    case 'security':
      return 'shield-checkmark-outline';
    default:
      return 'notifications-outline';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'order':
      return '#28a745';
    case 'promotion':
      return '#ffc107';
    case 'security':
      return '#dc3545';
    default:
      return '#40E0D0';
  }
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);

  const markAsRead = (id: string) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notificationsList.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimlerim</Text>
        <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
          <Text style={styles.markAllText}>Tümünü Okundu İşaretle</Text>
        </TouchableOpacity>
      </View>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{unreadCount} okunmamış bildirim</Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {notificationsList.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.isRead && styles.unreadNotification
            ]}
            onPress={() => markAsRead(notification.id)}
          >
            <View style={styles.notificationLeft}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: getNotificationColor(notification.type) }
              ]}>
                <Ionicons 
                  name={getNotificationIcon(notification.type)} 
                  size={20} 
                  color="white" 
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.isRead && styles.unreadTitle
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
            </View>
            {!notification.isRead && (
              <View style={styles.unreadDot} />
            )}
          </TouchableOpacity>
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
  markAllButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  markAllText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#40E0D0',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#40E0D0',
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
