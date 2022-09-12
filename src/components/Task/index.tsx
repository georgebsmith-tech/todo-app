import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useHttpServices } from "../../hooks";
import { getDateAndTime } from "../../utils";
import Icon from "react-native-vector-icons/FontAwesome";

export const Task = ({
  task,
  updateTasks,
  prevtaskStatus
}: {
  task: any;
  [x: string]: any;
}) => {
  const [toggleActions, setToggleActions] = useState(false);
  const { patchData } = useHttpServices();
  console.log(prevtaskStatus);
  const markAsCompleted = async (action: string) => {
    if (
      action == "completed" &&
      prevtaskStatus !== "completed" &&
      prevtaskStatus
    ) {
      alert(
        "You Can't Complete this task yet.\nYou have to first complete this task before this."
      );
      return;
    }

    const data = await patchData(`/tasks/${task._id}`, {
      status: action
    });

    setToggleActions(false);
    updateTasks(data?.data);
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <View>
        <Text style={{ fontSize: 15 }}>{task?.title}</Text>
        <Text style={{ fontSize: 10, color: "#5E5C5C" }}>
          Created: {getDateAndTime(task.createdAt)}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color:
              task.status === "pending"
                ? "#FF0000"
                : task.status === "in progress"
                ? "rgba(255,200,0,1)"
                : "#06C825"
          }}
        >
          {task.status[0].toUpperCase() + task.status.substr(1)}
        </Text>
      </View>

      <TouchableOpacity
        style={{ paddingHorizontal: 10, left: 10 }}
        onPress={() => setToggleActions(!toggleActions)}
      >
        <Icon name="ellipsis-v" size={20} color="#FA6342" />
      </TouchableOpacity>
      {toggleActions && (
        <View
          style={{
            position: "absolute",
            right: 5,
            zIndex: 20,
            width: 130,
            top: 50,
            backgroundColor: "#fff",
            padding: 6,
            borderRadius: 6,
            elevation: 4
          }}
        >
          <TouchableOpacity onPress={() => markAsCompleted("completed")}>
            <Text style={{ fontSize: 12 }}>Mark as "Completed"</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => markAsCompleted("in progress")}>
            <Text style={{ fontSize: 12 }}>Mark as "In Progress"</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
