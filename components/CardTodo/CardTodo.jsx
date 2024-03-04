import { TouchableOpacity, Text, Image } from "react-native";
import checkImg from "../../assets/check.png";
import { style } from "./CardTodo.style";

export function CardTodo({ todo, onPress , onLongPress}) {
  return (
    <TouchableOpacity
      style={style.card}
      onPress={() => onPress(todo)}
      onLongPress={() => onLongPress(todo)}
    >
      <Text
        style={[
          style.txt,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image source={checkImg} style={style.img} />}
    </TouchableOpacity>
  );
}
