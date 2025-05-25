import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 16 }}>
          <Card>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Content style={{ paddingVertical: 16 }}>
              <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
                Judul Card
              </Text>
              <Text variant="bodyLarge" style={{ color: "#666666" }}>
                Di sini Anda bisa menambahkan deskripsi yang lebih panjang
                tentang konten card. Deskripsi ini bisa berisi informasi detail
                yang ingin Anda sampaikan kepada pengguna.
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" style={{ marginRight: 8 }}>
                Lihat Detail
              </Button>
              <Button mode="outlined">Tutup</Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
