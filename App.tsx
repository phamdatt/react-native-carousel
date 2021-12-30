import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Modalize } from "react-native-modalize";
const dataImage = [
  "data:image/jpeg;base64,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",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzIE2EFkN3IubNvVCTjR9WzlrfWdU2EbxSQw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUdkVT9FXJGPgw2Atrxz4eyw2rvNIUx_6TA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6YJ3E1s1fiOzl8KDZdnpfQg_1cnUuTCcYQ&usqp=CAU",
];
const product = {
  title: "TUi asdnajfnajsfnjasnf",
  description:
    "asdnsngjsdnfjsddddddjsdnfjsdnfjsdnfjsdnfjsdnfjsdnfjsdnfjsdnfjsdnfjsndfjnsdjfnsdjnfsjdfnjsnfjsdnfsjfnsdjfnjsdnfjsdfnsdjfnsdj",
  price: 70,
};
export default function App() {
  const WIDTH = Dimensions.get("window").width;
  const ITEM_HEIGHT = Dimensions.get("window").height * 0.75;
  const height = Dimensions.get("window").height;
  const scrollY = useRef(new Animated.Value(0)).current;
  const modalize = useRef<Modalize>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const sheetRef = useRef<BottomSheet>(null);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
        <Animated.FlatList
          data={dataImage}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false} //xóa kiêt vuốt lên xuống
          keyExtractor={(item) => item}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            }
          )}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: WIDTH,
                    height: ITEM_HEIGHT,
                    resizeMode: "contain",
                  }}
                />
              </View>
            );
          }}
        />
        <View
          style={{
            position: "absolute",
            top: ITEM_HEIGHT / 2,
            left: 20,
          }}
        >
          {dataImage.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#333",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              ></View>
            );
          })}
          <Animated.View
            style={[
              styles.dot,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 16],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    top: -4,
    left: -4,
  },
});
