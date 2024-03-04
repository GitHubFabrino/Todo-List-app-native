import { StatusBar } from "expo-status-bar";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState, useEffect } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpDate = false;
export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [isAddDialoguVisible, setisAddDialoguVisible] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [selectedTabName, setselectedTabName] = useState("all");

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpDate) {
      isLoadUpDate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  async function saveTodoList() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (error) {
      alert("erreur", error);
    }
  }

  async function loadTodoList() {
    console.log("LOAD");
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todoList");
      if (stringifiedTodoList !== null) {
        const parseTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpDate = true;
        setTodoList(parseTodoList);
      }
    } catch (error) {
      alert("erreur", error);
    }
  }

  function getFilterdList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }
  function deleteTodo(todoToDelete) {
    Alert.alert("suppression", "Supprimer cette tache ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }

  function renderTodoList() {
    return getFilterdList().map((todo) => (
      <View style={styles.cardItem} key={todo.id}>
        <CardTodo todo={todo} onPress={updateTodo} onLongPress={deleteTodo} />
      </View>
    ));
  }

  function updateTodo(todo) {
    console.log(todo);
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updateTodo.id
    );

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updateTodo;
    setTodoList(updatedTodoList);
  }

  function showAddDialogue() {
    setisAddDialoguVisible(true);
  }

  function addTodo() {
    const idNew = todoList.length + 1;

    const newTodo = {
      id: idNew,
      title: inputValue,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
    setisAddDialoguVisible(false);
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>

          <ButtonAdd onPress={showAddDialogue} />
        </SafeAreaView>
      </SafeAreaProvider>
      <TabBottomMenu
        selectedTabName={selectedTabName}
        onPress={setselectedTabName}
        todoList={todoList}
      />

      <Dialog.Container
        visible={isAddDialoguVisible}
        onBackdropPress={() => setisAddDialoguVisible(false)}
      >
        <Dialog.Title>Créer une tache</Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tache
        </Dialog.Description>
        <Dialog.Input onChangeText={setinputValue} />
        <Dialog.Button
          label="Creer"
          onPress={addTodo}
          disabled={inputValue.trim().length === 0}
        />
      </Dialog.Container>
    </>
  );
}
