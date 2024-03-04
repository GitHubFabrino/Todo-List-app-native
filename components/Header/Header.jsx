import { React } from "react-native";
import { style } from "./Header.style";
import { StyleSheet, Text, View , Image} from "react-native";
import headerLogo  from "../../assets/logo.png";

export function Header() {
  return (
    <>
      <Image style={style.img} source={headerLogo} resizeMode="contain"/>
      <Text style={style.subtitle}>Tu as probbablement un truc à faire</Text>
    </>
  );
}
