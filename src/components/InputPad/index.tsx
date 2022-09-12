import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { useHttpServices } from "../../hooks";

export function InputPad({ updateTasks }: { updateTasks: any }) {
  const [title, setTitle] = useState("");
  const { postData } = useHttpServices();
  console.log(title);
  const handleAddTask = async () => {
    const data = await postData("/tasks", { title });
    console.log(data);
    updateTasks(data?.data);
    setTitle("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        position: "absolute",
        bottom: 40,
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor: "red",
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center"
      }}
    >
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Write a task"
        style={{
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 60,
          flex: 1,
          fontSize: 15,
          marginRight: 10,
          borderWidth: 1,
          borderColor: "#f3f3f3",
          paddingHorizontal: 15
        }}
        multiline
      />
      <TouchableOpacity
        onPress={handleAddTask}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#f3f3f3"
        }}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
