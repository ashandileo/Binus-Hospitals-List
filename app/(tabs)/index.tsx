import { useEffect, useState } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";

interface Hospital {
  name: string;
  address: string;
  region: string;
  phone: string;
  province: string;
}

// Hospital Image
const hospitalImages =
  "https://rsud-soekarno.babelprov.go.id/sites/default/files/images/gedung%20rs.jpg";

export default function HomeScreen() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch(
        "https://dekontaminasi.com/api/id/covid19/hospitals"
      );
      const data = await response.json();
      setHospitals(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setLoading(false);
    }
  };

  // Function to open maps
  const openMap = (province: string) => {
    const query = encodeURIComponent(`${province}, Indonesia`);
    // Try to open in Google Maps
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.canOpenURL(mapsUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mapsUrl);
        } else {
          // Fallback to Apple Maps for iOS
          const appleMapsUrl = `maps://maps.apple.com/?q=${query}`;
          return Linking.openURL(appleMapsUrl);
        }
      })
      .catch((err) => console.error("Error membuka peta:", err));
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header Fixed */}
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}
      >
        <Text variant="headlineMedium">Hospitals List</Text>
      </View>

      {/* Content Scrollable */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
      >
        {hospitals.map((hospital, index) => (
          <Card key={index} style={{ marginBottom: 16 }}>
            <Card.Cover
              source={{ uri: hospitalImages }}
              style={{ height: 200 }}
              resizeMode="cover"
            />
            <Card.Content style={{ paddingVertical: 16 }}>
              <Text variant="titleLarge" style={{ marginBottom: 8 }}>
                {hospital.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: "#666666", marginBottom: 4 }}
              >
                {hospital.address}
              </Text>
              <TouchableOpacity onPress={() => openMap(hospital.province)}>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: "#2196F3",
                    marginBottom: 4,
                    textDecorationLine: "underline",
                  }}
                >
                  Province: {hospital.province} (Tap to view map)
                </Text>
              </TouchableOpacity>
              <Text variant="bodyMedium" style={{ color: "#666666" }}>
                Phone: {hospital.phone}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                style={{ marginRight: 8 }}
                onPress={() => Linking.openURL(`tel:${hospital.phone}`)}
              >
                Contact
              </Button>
              <Button mode="outlined">Details</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
