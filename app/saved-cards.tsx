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

interface SavedCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  isDefault: boolean;
}

const savedCards: SavedCard[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'Nur Aydoğan',
    expiryDate: '12/25',
    cardType: 'visa',
    isDefault: true
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardHolder: 'Nur Aydoğan',
    expiryDate: '08/26',
    cardType: 'mastercard',
    isDefault: false
  },
  {
    id: '3',
    cardNumber: '**** **** **** 9012',
    cardHolder: 'Nur Aydoğan',
    expiryDate: '03/27',
    cardType: 'amex',
    isDefault: false
  }
];

const getCardIcon = (cardType: string) => {
  switch (cardType) {
    case 'visa':
      return 'card-outline';
    case 'mastercard':
      return 'card-outline';
    case 'amex':
      return 'card-outline';
    default:
      return 'card-outline';
  }
};

const getCardColor = (cardType: string) => {
  switch (cardType) {
    case 'visa':
      return '#1a1f71';
    case 'mastercard':
      return '#eb001b';
    case 'amex':
      return '#006fcf';
    default:
      return '#40E0D0';
  }
};

const getCardGradient = (cardType: string) => {
  switch (cardType) {
    case 'visa':
      return ['#1a1f71', '#00539c'];
    case 'mastercard':
      return ['#eb001b', '#f79e1b'];
    case 'amex':
      return ['#006fcf', '#00a3e0'];
    default:
      return ['#40E0D0', '#70EFEF'];
  }
};

export default function SavedCardsScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<SavedCard[]>(savedCards);

  const setDefaultCard = (id: string) => {
    setCards(prev => 
      prev.map(card => ({
        ...card,
        isDefault: card.id === id
      }))
    );
  };

  const deleteCard = (id: string) => {
    Alert.alert(
      'Kartı Sil',
      'Bu kartı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            setCards(prev => prev.filter(card => card.id !== id));
            Alert.alert('Başarılı', 'Kart başarıyla silindi!');
          },
        },
      ]
    );
  };

  const addNewCard = () => {
    Alert.alert('Yeni Kart Ekle', 'Bu özellik yakında eklenecek!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kayıtlı Kartlarım</Text>
        <TouchableOpacity onPress={addNewCard} style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cards List */}
        {cards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <View style={[
              styles.card,
              { backgroundColor: getCardColor(card.cardType) }
            ]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTypeContainer}>
                  <Ionicons 
                    name={getCardIcon(card.cardType)} 
                    size={24} 
                    color="white" 
                  />
                  <Text style={styles.cardTypeText}>
                    {card.cardType.toUpperCase()}
                  </Text>
                </View>
                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Varsayılan</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.cardNumber}>{card.cardNumber}</Text>
              
              <View style={styles.cardFooter}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardHolderLabel}>Kart Sahibi</Text>
                  <Text style={styles.cardHolderName}>{card.cardHolder}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.expiryLabel}>Son Kullanma</Text>
                  <Text style={styles.expiryDate}>{card.expiryDate}</Text>
                </View>
              </View>
            </View>

            {/* Card Actions */}
            <View style={styles.cardActions}>
              {!card.isDefault && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setDefaultCard(card.id)}
                >
                  <Ionicons name="star-outline" size={20} color="#40E0D0" />
                  <Text style={styles.actionText}>Varsayılan Yap</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => Alert.alert('Kart Düzenle', 'Bu özellik yakında eklenecek!')}
              >
                <Ionicons name="create-outline" size={20} color="#666" />
                <Text style={styles.actionText}>Düzenle</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteCard(card.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#dc3545" />
                <Text style={[styles.actionText, styles.deleteText]}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add New Card Button */}
        <TouchableOpacity style={styles.addCardButton} onPress={addNewCard}>
          <Ionicons name="add-circle-outline" size={24} color="#40E0D0" />
          <Text style={styles.addCardText}>Yeni Kart Ekle</Text>
        </TouchableOpacity>
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
  cardContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTypeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
  },
  cardHolderLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  cardHolderName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  expiryLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  expiryDate: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  deleteButton: {
    // Delete button styling
  },
  deleteText: {
    color: '#dc3545',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#40E0D0',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addCardText: {
    fontSize: 16,
    color: '#40E0D0',
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
