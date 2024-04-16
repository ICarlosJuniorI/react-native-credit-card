import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { CreditCard, CARD_SIDE } from "@/components/credit-card";
import { Input } from "@/components/input";

import { styles } from "./styles";

export function Payment() {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const cardSide = useSharedValue(CARD_SIDE.front);

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  return (
    <View style={styles.container}>
      <CreditCard
        cardSide={cardSide}
        data={{
          name,
          number: number.replace(/(\d{4})(?=\d)/g, "$1 "),
          date: date.replace(/(\d{2})(?=\d)/g, "$1/"),
          code
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
        <Text>Inverter</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Input
          placeholder="Nome do titular"
          onChangeText={setName}
          onFocus={showFrontCard}
        />
        <Input
          placeholder="Número do cartão"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={setNumber}
          onFocus={showBackCard}
        />
        <View style={styles.inputInline}>
          <Input
            placeholder="01/02"
            style={styles.smallInput}
            maxLength={4}
            onChangeText={setDate}
            onFocus={showBackCard}
          />
          <Input
            placeholder="123"
            style={styles.smallInput}
            keyboardType="numeric"
            maxLength={3}
            onChangeText={setCode}
            onFocus={showBackCard}

          />
        </View>
      </View>
    </View>
  )
}