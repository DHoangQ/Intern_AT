import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig";
import styles from "../../Styles/style";

interface AccountItem {
  id: string;
  name: string;
  midName: string;
  userName: string;
  email: string;
  phone: string;
  passWord: string;
}

const Account = () => {
  const [accounts, setAccounts] = useState<AccountItem[]>([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountItem | null>(null);

  const [newAccountAdd, setNewAccountAdd] = useState({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "" });
  const [newAccountEdit, setNewAccountEdit] = useState({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "" });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "account"));
      const accountList: AccountItem[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as AccountItem));
      setAccounts(accountList);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleSaveAdd = async () => {
    try {
      await addDoc(collection(db, "account"), newAccountAdd);
      setAddModal(false);
      setNewAccountAdd({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "" });
      fetchAccounts();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (editingAccount) {
        await updateDoc(doc(db, "account", editingAccount.id), newAccountEdit);
        setEditModal(false);
        setEditingAccount(null);
        fetchAccounts();
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleAdd = () => {
    setNewAccountAdd({ name: "", midName: "", userName: "", email: "", phone: "", passWord: "" });
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
      fetchAccounts();
    } catch (error) {
      console.error("Lỗi:", error);
    }   
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: "3%" }}>Danh sách tài khoản</Text>
      <TouchableOpacity style={styles.regisbutton} onPress={handleAdd}>
        <Text style={styles.startbuttonText}>Thêm tài khoản</Text>
      </TouchableOpacity>
      <ScrollView style={styles.WidthScroll}>
        <ScrollView style={styles.HeightScroll}>
          <View style={styles.Table}>
            <Text style={[styles.cell, styles.TableText]}>Họ và tên</Text>
            <Text style={[styles.cell, styles.TableText]}>Tên đăng nhập</Text>
            <Text style={[styles.cell, styles.TableText]}>Email</Text>
            <Text style={[styles.cell, styles.TableText]}>Số điện thoại</Text>
            <Text style={[styles.cell, styles.TableText]}>Mật khẩu</Text>
            <Text style={[styles.cell, styles.TableText]}>Hành động</Text>
          </View>
          {accounts.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.cell}>{item.midName} {item.name}</Text>
              <Text style={styles.cell}>{item.userName}</Text>
              <Text style={styles.cell}>{item.email}</Text>
              <Text style={styles.cell}>{item.phone}</Text>
              <Text style={styles.cell}>{item.passWord}</Text>
              <View style={{ flexDirection: "row" }}>
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
  );
};

export default Account;