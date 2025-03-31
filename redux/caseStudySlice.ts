import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    collection, 
    onSnapshot, 
    query, 
    doc, 
    getDoc, 
    addDoc, 
    deleteDoc, 
    where, 
    getDocs, 
    updateDoc, 
    increment, 
    Timestamp, 
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../Config/firebaseConfig';

export interface CaseStudyItem {
    id: string;
    description: string;
    imageUrl: string;
    postDate: number;
    postDateString: string;
    accountId: string;
    userName?: string;
    avatar?: string;
    Like: number;
    Comment: number;
    Share: number;
}

export interface CommentItem {
    id: string;
    accountId: string;
    contentcomment: string;
    timecomment: number; // Changed to number (seconds)
    userName?: string;
    avatar?: string;
}

interface CaseStudyState {
    casestudy: CaseStudyItem[];
    comments: { [caseStudyId: string]: CommentItem[] };
    likedPosts: { [key: string]: boolean };
    currentUserId: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: CaseStudyState = {
    casestudy: [],
    comments: {},
    likedPosts: {},
    currentUserId: null,
    loading: false,
    error: null
};

const convertTimestamp = (timestamp: any) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toISOString();
    }
    return null;
};

export const fetchCurrentUser = createAsyncThunk(
    'casestudy/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const accountId = await AsyncStorage.getItem('accountId');
            return accountId;
        } catch (error) {
            return rejectWithValue('Lỗi');
        }
    }
);

export const fetchCaseStudies = createAsyncThunk(
    'casestudy/fetchCaseStudies',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { caseStudy: CaseStudyState };
            const currentUserId = state.caseStudy.currentUserId;
            if (!currentUserId) throw new Error('Không có user ID');
            const cases = query(collection(db, 'casestudy'));
            const caseStudies: CaseStudyItem[] = [];
            const likedPostsStatus: { [key: string]: boolean } = {};
            return new Promise<{ caseStudies: CaseStudyItem[], likedPosts: { [key: string]: boolean } }>((resolve, reject) => {
                const unsubscribe = onSnapshot(cases, async (querySnapshot) => {
                    try {
                        for (const docSnapshot of querySnapshot.docs) {
                            const caseStudyData = docSnapshot.data();
                            const caseStudyId = docSnapshot.id;
                            const likesRef = collection(db, 'casestudy', caseStudyId, 'likes');
                            const likeQuery = query(likesRef, where('accountId', '==', currentUserId));
                            const likeSnapshot = await getDocs(likeQuery);
                            likedPostsStatus[caseStudyId] = !likeSnapshot.empty;

                            let userName = '';
                            let avatar = '';

                            if (caseStudyData.accountId) {
                                const accountDocRef = doc(db, 'account', caseStudyData.accountId);
                                const accountDocSnap = await getDoc(accountDocRef);
                                if (accountDocSnap.exists()) {
                                    const accountData = accountDocSnap.data();
                                    userName = accountData.userName;
                                    avatar = accountData.avatar || '';
                                }
                            }
                            caseStudies.push({
                                id: caseStudyId,
                                description: caseStudyData.description,
                                imageUrl: caseStudyData.imageUrl,
                                postDate: caseStudyData.postDate.seconds,
                                postDateString: convertTimestamp(caseStudyData.postDate),
                                accountId: caseStudyData.accountId,
                                userName: userName,
                                avatar: avatar,
                                Like: caseStudyData.Like,
                                Comment: caseStudyData.Comment,
                                Share: caseStudyData.Share
                            });
                        }
                        caseStudies.sort((a, b) => {
                            if (!a.postDate || !b.postDate) return 0;
                            return b.postDate - a.postDate;
                        });
                        resolve({ caseStudies, likedPosts: likedPostsStatus });
                        unsubscribe();
                    } catch (error) {
                        reject(error);
                    }
                }, reject);
            });
        } catch (error) {
            return rejectWithValue('Lỗi');
        }
    }
);

export const handleLikeAction = createAsyncThunk(
    'casestudy/handleLike',
    async ({
        caseStudyId,
        currentUserId
    }: {
        caseStudyId: string,
        currentUserId: string
    }, { rejectWithValue }) => {
        try {
            const caseStudyRef = doc(db, 'casestudy', caseStudyId);
            const likesRef = collection(db, 'casestudy', caseStudyId, 'likes');
            const likeQuery = query(likesRef, where('accountId', '==', currentUserId));
            const likeSnapshot = await getDocs(likeQuery);
            if (likeSnapshot.empty) {
                await addDoc(likesRef, {
                    accountId: currentUserId,
                    timeLike: new Date()
                });
                await updateDoc(caseStudyRef, {
                    Like: increment(1)
                });
                return {
                    caseStudyId,
                    liked: true,
                    likeCount: 1
                };
            } else {
                const likeDoc = likeSnapshot.docs[0];
                await deleteDoc(doc(db, 'casestudy', caseStudyId, 'likes', likeDoc.id));

                await updateDoc(caseStudyRef, {
                    Like: increment(-1)
                });
                return {
                    caseStudyId,
                    liked: false,
                    likeCount: -1
                };
            }
        } catch (error) {
            return rejectWithValue('Lỗi');
        }
    }
);

export const fetchComments = createAsyncThunk(
    'casestudy/fetchComments',
    async (caseStudyId: string, { rejectWithValue }) => {
        try {
            const commentsRef = collection(db, 'casestudy', caseStudyId, 'comments');
            const q = query(commentsRef);

            return new Promise<CommentItem[]>((resolve, reject) => {
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    try {
                        const commentsData = await Promise.all(
                            querySnapshot.docs.map(async (docSnapshot) => {
                                const commentData = docSnapshot.data();
                                let userName = "";
                                let avatar = "";

                                // Convert Firestore Timestamp to seconds
                                const timecomment = commentData.timecomment 
                                    ? commentData.timecomment.seconds 
                                    : Math.floor(Date.now() / 1000);

                                if (commentData.accountId) {
                                    const accountDoc = await getDoc(doc(db, 'account', commentData.accountId));
                                    if (accountDoc.exists()) {
                                        const accountData = accountDoc.data();
                                        userName = accountData.userName;
                                        avatar = accountData.avatar || "";
                                    }
                                }
                                return {
                                    id: docSnapshot.id,
                                    ...commentData,
                                    timecomment, // Use seconds instead of Timestamp object
                                    userName,
                                    avatar,
                                } as CommentItem;
                            })
                        );
                        resolve(commentsData);
                        unsubscribe();
                    } catch (error) {
                        reject(error);
                    }
                }, reject);
            });
        } catch (error) {
            return rejectWithValue('Lỗi tải bình luận');
        }
    }
);

export const sendComment = createAsyncThunk(
    'casestudy/sendComment',
    async (
        {
            currentUserId, 
            currentCaseStudyId, 
            commentContent
        }: {
            currentUserId: string, 
            currentCaseStudyId: string, 
            commentContent: string
        }, 
        { rejectWithValue }
    ) => {
        try {
            if (!currentUserId) {
                throw new Error('Bạn chưa đăng nhập!');
            }

            if (!commentContent.trim()) {
                throw new Error('Vui lòng nhập bình luận');
            }

            // Reference to the specific case study document
            const caseStudyDocRef = doc(db, 'casestudy', currentCaseStudyId);

            // Add comment to comments subcollection
            const commentsRef = collection(db, 'casestudy', currentCaseStudyId, 'comments');
            const newCommentRef = await addDoc(commentsRef, {
                accountId: currentUserId,
                contentcomment: commentContent.trim(),
                timecomment: serverTimestamp()
            });

            // Increment the Comment count atomically
            await updateDoc(caseStudyDocRef, {
                Comment: increment(1)
            });

            // Fetch the newly added comment with user details
            const newCommentDoc = await getDoc(newCommentRef);
            const commentData = newCommentDoc.data();
            
            // Convert timestamp to seconds
            const timecomment = commentData?.timecomment 
                ? commentData.timecomment.seconds 
                : Math.floor(Date.now() / 1000);

            let userName = "";
            let avatar = "";

            if (commentData?.accountId) {
                const accountDoc = await getDoc(doc(db, 'account', commentData.accountId));
                if (accountDoc.exists()) {
                    const accountData = accountDoc.data();
                    userName = accountData.userName;
                    avatar = accountData.avatar || "";
                }
            }

            return {
                caseStudyId: currentCaseStudyId,
                comment: {
                    id: newCommentRef.id,
                    ...commentData,
                    timecomment,
                    userName,
                    avatar,
                } as CommentItem
            };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Lỗi khi gửi bình luận');
        }
    }
);

const caseStudySlice = createSlice({
    name: 'casestudy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.currentUserId = action.payload;
        });
        builder.addCase(fetchCaseStudies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCaseStudies.fulfilled, (state, action) => {
            state.loading = false;
            state.casestudy = action.payload.caseStudies;
            state.likedPosts = action.payload.likedPosts;
        });
        builder.addCase(fetchCaseStudies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(handleLikeAction.fulfilled, (state, action) => {
            const { caseStudyId, liked, likeCount } = action.payload;
            const caseStudyIndex = state.casestudy.findIndex(item => item.id === caseStudyId);
            if (caseStudyIndex !== -1) {
                state.casestudy[caseStudyIndex].Like += likeCount;
            }
            state.likedPosts[caseStudyId] = liked;
        });
        
        // New reducers for comments
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments[action.meta.arg] = action.payload;
        });

        builder.addCase(sendComment.fulfilled, (state, action) => {
            const { caseStudyId, comment } = action.payload;
            if (!state.comments[caseStudyId]) {
                state.comments[caseStudyId] = [];
            }
            state.comments[caseStudyId].push(comment);

            // Update comment count in casestudy array
            const caseStudyIndex = state.casestudy.findIndex(item => item.id === caseStudyId);
            if (caseStudyIndex !== -1) {
                state.casestudy[caseStudyIndex].Comment += 1;
            }
        });

        builder.addCase(sendComment.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
});

export default caseStudySlice.reducer;