import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig";
import styles from "../../Styles/style";
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts, addAccount, updateAccount, deleteAccount } from '../../redux/accountSlice';
import type { RootState } from '../../redux/store';
import * as ImagePicker from 'react-native-image-picker';

interface AccountItem {
  id: string;
  name: string;
  midName: string;
  userName: string;
  email: string;
  phone: string;
  passWord: string;
  avatar: string;
}

const Account = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountItem | null>(null);

  const [newAccountAdd, setNewAccountAdd] = useState({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "", avatar: "" });

  const [newAccountEdit, setNewAccountEdit] = useState({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "", avatar: "" });

  const dispatch = useDispatch();
  const accounts = useSelector((state: RootState) => state.account.accounts);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "account"));
      const accountList: AccountItem[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as AccountItem));
      dispatch(setAccounts(accountList));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const selectImage = (isEdit: boolean) => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('');
      } else if (response.errorCode) {
        console.log('Lỗi: ', response.errorMessage);
      } else if (response.assets && response.assets[0].base64) {
        const imageUri = `data:image/jpeg;base64,${response.assets[0].base64}`;
        if (isEdit) {
          setNewAccountEdit({ ...newAccountEdit, avatar: imageUri });
        } else {
          setNewAccountAdd({ ...newAccountAdd, avatar: imageUri });
        }
      };
    });
  };

  const handleSaveAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "account"), newAccountAdd);
      const newAccount: AccountItem = { ...newAccountAdd, id: docRef.id };
      dispatch(addAccount(newAccount));
      setAddModal(false);
      setNewAccountAdd({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "", avatar: "" });
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (editingAccount) {
        await updateDoc(doc(db, "account", editingAccount.id), newAccountEdit);
        dispatch(updateAccount({ ...newAccountEdit, id: editingAccount.id }));
        setEditModal(false);
        setEditingAccount(null);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleAdd = () => {
    setNewAccountAdd({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "", avatar: "" });
    setAddModal(true);
  };

  const handleEdit = (account: AccountItem) => {
    setEditingAccount(account);
    setNewAccountEdit(account);
    setEditModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "account", id));
      dispatch(deleteAccount(id));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: "3%" }}>Danh sách tài khoản</Text>
        <TouchableOpacity style={styles.regisbutton} onPress={handleAdd}>
          <Text style={styles.startbuttonText}>Thêm tài khoản</Text>
        </TouchableOpacity>
        <ScrollView style={styles.WidthScroll}>
          <ScrollView style={styles.HeightScroll}>
            <View style={styles.Table}>
              <Text style={[styles.cell, styles.TableText]}>Avatar</Text>
              <Text style={[styles.cell, styles.TableText]}>Họ và tên</Text>
              <Text style={[styles.cell, styles.TableText]}>User Name</Text>
              <Text style={[styles.cell, styles.TableText]}>Email</Text>
              <Text style={[styles.cell, styles.TableText]}>Số điện thoại</Text>
              <Text style={[styles.cell, styles.TableText]}>Mật khẩu</Text>
              <Text style={[styles.cell, styles.TableText]}>Hành động</Text>
            </View>
            {accounts.map((item) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.cell}>
                  {item.avatar ? (
                    <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                  ) : (
                    <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 20 }}>{item.name.charAt(0)}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cell}>{item.midName} {item.name}</Text>
                <Text style={styles.cell}>{item.userName}</Text>
                <Text style={styles.cell}>{item.email}</Text>
                <Text style={styles.cell}>{item.phone}</Text>
                <Text style={styles.cell}>{item.passWord}</Text>
                <View style={{ flexDirection: "row", width: 200 }}>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.ChangeAccount}>
                    <Text style={styles.ChangeAccounttxt}>Sửa Tài Khoản</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.ChangeAccount}>
                    <Text style={styles.ChangeAccounttxt}>Xóa Tài Khoản</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
        <Modal visible={addModal} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ alignItems: 'center', marginBottom: 10 }}>
                {newAccountAdd.avatar ? (
                  <Image source={{ uri: newAccountAdd.avatar }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />
                ) : (
                  <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 40 }}>+</Text>
                  </View>
                )}
                <TouchableOpacity onPress={() => selectImage(false)} style={{ backgroundColor: '#4285F4', padding: 10, borderRadius: 5, marginBottom: 10 }}>
                  <Text style={{ color: 'white' }}>Chọn Avatar</Text>
                </TouchableOpacity>
              </View>
              <TextInput placeholder="Họ" value={newAccountAdd.midName} onChangeText={(text) => setNewAccountAdd({ ...newAccountAdd, midName: text })} style={styles.input} />
              <TextInput placeholder="Tên" value={newAccountAdd.name} onChangeText={(text) => setNewAccountAdd({ ...newAccountAdd, name: text })} style={styles.input} />
              <TextInput placeholder="Tên đăng nhập" value={newAccountAdd.userName} onChangeText={(text) => setNewAccountAdd({ ...newAccountAdd, userName: text })} style={styles.input} />
              <TextInput placeholder="Email" value={newAccountAdd.email} onChangeText={(text) => setNewAccountAdd({ ...newAccountAdd, email: text })} style={styles.input} />
              <TextInput placeholder="Số điện thoại" value={newAccountAdd.phone} onChangeText={(text) => setNewAccountAdd({ ...newAccountAdd, phone: text })} style={styles.input} />
              <TextInput placeholder="Mật khẩu" value={newAccountAdd.passWord} onChangeText={(text) => setNewAccountAdd({ ...newAccountAdd, passWord: text })} style={styles.input} />
              <TouchableOpacity onPress={handleSaveAdd} style={styles.modalButton}>
                <Text>Thêm tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAddModal(false)} style={styles.modalButton}>
                <Text>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={editModal} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ alignItems: 'center', marginBottom: 10 }}>
                {newAccountEdit.avatar ? (
                  <Image source={{ uri: newAccountEdit.avatar }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />
                ) : (
                  <View style={{ width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 40 }}>+</Text>
                  </View>
                )}
                <TouchableOpacity onPress={() => selectImage(true)} style={{ backgroundColor: '#4285F4', padding: 10, borderRadius: 5, marginBottom: 10 }}>
                  <Text style={{ color: 'white' }}>Chọn Avatar</Text>
                </TouchableOpacity>
              </View>
              <TextInput placeholder="Họ" value={newAccountEdit.midName} onChangeText={(text) => setNewAccountEdit({ ...newAccountEdit, midName: text })} style={styles.input} />
              <TextInput placeholder="Tên" value={newAccountEdit.name} onChangeText={(text) => setNewAccountEdit({ ...newAccountEdit, name: text })} style={styles.input} />
              <TextInput placeholder="Tên đăng nhập" value={newAccountEdit.userName} onChangeText={(text) => setNewAccountEdit({ ...newAccountEdit, userName: text })} style={styles.input} />
              <TextInput placeholder="Email" value={newAccountEdit.email} onChangeText={(text) => setNewAccountEdit({ ...newAccountEdit, email: text })} style={styles.input} />
              <TextInput placeholder="Số điện thoại" value={newAccountEdit.phone} onChangeText={(text) => setNewAccountEdit({ ...newAccountEdit, phone: text })} style={styles.input} />
              <TextInput placeholder="Mật khẩu" value={newAccountEdit.passWord} onChangeText={(text) => setNewAccountEdit({ ...newAccountEdit, passWord: text })} style={styles.input} />
              <TouchableOpacity onPress={handleSaveEdit} style={styles.modalButton}>
                <Text>Cập nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModal(false)} style={styles.modalButton}>
                <Text>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Account;