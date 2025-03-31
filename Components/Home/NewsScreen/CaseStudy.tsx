import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import styles from '../../../Styles/style';
import { RootState, AppDispatch } from '../../../redux/store';
import { 
  fetchCurrentUser, 
  fetchCaseStudies, 
  handleLikeAction, 
  fetchComments,
  sendComment
} from '../../../redux/caseStudySlice';

const CaseStudy = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    casestudy, 
    likedPosts, 
    currentUserId, 
    loading, 
    error, 
    comments 
  } = useSelector((state: RootState) => state.caseStudy);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['600'], ['']);
  
  const [lastLikeTime, setLastLikeTime] = useState<{ [key: string]: number }>({});
  const [newComment, setNewComment] = useState<string>('');
  const [currentCaseStudyId, setCurrentCaseStudyId] = useState<string | null>(null);

  const formatDateTime = (postDateSeconds: number) => {
    if (!postDateSeconds) return '';
    const date = new Date(postDateSeconds * 1000);
    const dateStr = date.toLocaleDateString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dateStr} - ${hours}:${minutes}`;
  };

  const formatCommentDateTime = (timestamp: number) => {
    if (!timestamp) return '';
  
    const date = new Date(timestamp * 1000);
    const dateStr = date.toLocaleDateString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dateStr} - ${hours}:${minutes}`;
  };

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
      Alert.alert('Bạn chưa đăng nhập!');
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

  const openCommentBottomSheet = (caseStudyId: string) => {
    setCurrentCaseStudyId(caseStudyId);
    bottomSheetRef.current?.snapToIndex(0);
    dispatch(fetchComments(caseStudyId));
  };

  const handleSendComment = () => {
    if (!currentUserId || !currentCaseStudyId) {
      Alert.alert('Lỗi', 'Không thể gửi bình luận');
      return;
    }

    dispatch(sendComment({
      currentUserId, 
      currentCaseStudyId, 
      commentContent: newComment
    })).then(() => {
      setNewComment('');
    }).catch((error) => {
      if (error.payload) {
        Alert.alert('Lỗi', error.payload);
      }
    });
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setCurrentCaseStudyId(null);
    }
  }, []);

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
      <FlatList
        data={casestudy}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
                <Ionicons
                  name={likedPosts[item.id] ? 'heart' : 'heart-outline'}
                  style={[styles.iconcase, likedPosts[item.id] ? { color: 'red' } : {}]}
                />
                <Text style={styles.icontxts}>{item.Like}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.staticon} onPress={() => openCommentBottomSheet(item.id)}>
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <View style={styles.modalContainer2}>
          <Text style={styles.modalTitle}>Bình luận</Text>
          {currentCaseStudyId && comments[currentCaseStudyId]?.length > 0 ? (
            <BottomSheetScrollView>
              {comments[currentCaseStudyId].map((item) => (
                <View
                  key={item.id}
                  style={styles.commentItem}
                >
                  <View style={styles.commentHeader}>
                    <View style={styles.commentUserContainer}>
                      {item.avatar ? (
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.commentAvatar}
                        />
                      ) : (
                        <View style={styles.commentAvatarPlaceholder}>
                          <Text>
                            {item.userName ? item.userName.charAt(0).toUpperCase() : ''}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.commentUserName}>{item.userName}</Text>
                    </View>
                    <Text style={styles.commentTime}>
                      {formatCommentDateTime(item.timecomment)}
                    </Text>
                  </View>
                  <Text style={styles.commentText}>{item.contentcomment}</Text>
                </View>
              ))}
            </BottomSheetScrollView>
          ) : (
            <Text>Chưa có bình luận nào.</Text>
          )}
          
          <View style={styles.commentInputContainer}>
            <BottomSheetTextInput
              placeholder="Nhập bình luận..."
              value={newComment}
              onChangeText={setNewComment}
              style={styles.commentInput}
            />
            <TouchableOpacity onPress={handleSendComment}>
              <Ionicons 
                name="send" 
                size={24} 
                color={newComment.trim() ? '#007bff' : '#ccc'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CaseStudy;