import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { useHttpServices } from "../../hooks";
import { InputPad, Task } from "../../components";

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { getData, isLoading } = useHttpServices();

  useEffect(() => {
    (async function () {
      const data = await getData("/tasks");

      setTasks(data.data?.tasks);
    })();
  }, []);
  return (
    <View
      style={{
        paddingTop: 40,
        // paddingHorizontal: 20,

        flex: 1
      }}
    >
      <Text
        style={{
          marginBottom: 15,
          fontSize: 20,
          fontWeight: "600",
          color: "#fff",
          paddingHorizontal: 20
        }}
      >
        My Todo Tasks
      </Text>
      {!tasks?.length ? (
        <View
          style={{
            padding: 40,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 16, color: "#fff" }}>
            You Currently have no Task to manage
          </Text>
        </View>
      ) : (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {tasks.map((task: any, idx) => (
            <Task
              prevtaskStatus={
                //@ts-ignore
                tasks[idx + 1]?.status
              }
              key={idx}
              task={task}
              updateTasks={(task: object) => {
                //@ts-ignore
                setTasks(
                  //@ts-ignore
                  tasks.map((item) =>
                    //@ts-ignore
                    item._id == task._id ? task : item
                  )
                );
              }}
            />
          ))}
        </ScrollView>
      )}

      <View style={{ height: 95 }} />

      <InputPad
        updateTasks={(task: object) => {
          //@ts-ignore
          setTasks([task, ...tasks]);
        }}
      />
    </View>
  );
};
