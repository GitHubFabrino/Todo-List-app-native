import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    card: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        height: 115,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, 
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:5
    },
    txt: {
        fontSize:20
    },
    img: {
        height: 25,
        width:25
    }
});

export { style };
