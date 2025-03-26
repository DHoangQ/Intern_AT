import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../../Styles/style';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchCurrentUser, fetchCaseStudies, handleLikeAction } from '../../../redux/caseStudySlice';

const CaseStudy = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { casestudy, likedPosts, currentUserId, loading, error } = useSelector((state: RootState) => state.caseStudy);
  const [lastLikeTime, setLastLikeTime] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchCaseStudies());
    }
  }, [dispatch, currentUserId]);

   const handleLike = (caseStudyId: string) => {
    if (!currentUserId) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập');
      return;
    }
    const now = Date.now();
    const lastTime = lastLikeTime[caseStudyId] || 0;
    if (now - lastTime < 1000) {
      return;
    }
    setLastLikeTime((prev) => ({
      ...prev,
      [caseStudyId]: now,
    }));

    dispatch(handleLikeAction({ caseStudyId, currentUserId }));
  };

  const formatDateTime = (postDateSeconds: number) => {
    if (!postDateSeconds) return '';

    const date = new Date(postDateSeconds * 1000);
    const dateStr = date.toLocaleDateString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dateStr} - ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <View style={styles.containercasestudy}>
        <Text>Đang tải...</Text>
      </View> 
    );
  }

  if (error) {
    return (
      <View style={styles.containercasestudy}>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.containercasestudy}>
      <FlatList data={casestudy} keyExtractor={(item) => item.id} renderItem={({ item }) => (
        <View style={styles.cardcasestudy}>
          <View style={styles.userInfoContainer}>
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {item.userName ? item.userName.charAt(0).toUpperCase() : ''}
                </Text>
              </View>
            )}
            <View style={styles.userTextInfo}>
              <Text style={styles.info}>{item.userName}</Text>
              <Text style={styles.timecase}>
                {formatDateTime(item.postDate)}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.imageCaseStudy} />
            )}
          </TouchableOpacity>
          <View style={styles.statstudy}>
            <TouchableOpacity style={styles.staticon} onPress={() => handleLike(item.id)}>
              <Ionicons name={likedPosts[item.id] ? "heart" : "heart-outline"}
                style={[styles.iconcase, likedPosts[item.id] ? { color: 'red' } : {}]} />
              <Text style={styles.icontxts}>{item.Like}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.staticon}>
              <Ionicons name="chatbox-ellipses-outline" style={styles.iconcase} />
              <Text style={styles.icontxts}>{item.Comment}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.staticon}>
              <Ionicons name="arrow-redo-outline" style={styles.iconcase} />
              <Text style={styles.icontxts}>{item.Share}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      />
    </View>
  );
};

export default CaseStudy;