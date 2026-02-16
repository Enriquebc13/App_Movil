import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Character } from "./characterType";
import { CharacterCard } from "./characterCard";
import { CharactersResult } from "./charactersResult";
import { DataSource } from "./dataSource";

export function CharactersScrollView(): JSX.Element {
  // Estado para loading
  const [loading, setLoading] = useState<boolean>(false);

  // Estado para paginación
  const [page, setPage] = useState<number>(1);

  // Estado para datos
  const [data, setData] = useState<CharactersResult>({
    info: {
      pages: 0,
      count: 0,
      next: null,
      prev: null,
    },
    results: [],
  });

  // Referencia del FlatList correctamente tipada
  const flatListRef = useRef<FlatList<Character> | null>(null);

  const dataSource = new DataSource();

  // Manejo de paginación
  const handleEndReached = (): void => {
    if (data.info.next && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Cargar personajes cuando cambia la página
  useEffect(() => {
    setLoading(true);

    dataSource
      .getCharacters(page)
      .then((result: CharactersResult) => {
        setData((prevData) => ({
          results: [...prevData.results, ...result.results],
          info: result.info,
        }));
      })
      .catch((error: Error) => {
        Alert.alert(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <View style={styles.container}>
      <View style={styles.paginator}>
        <View style={styles.pageInfo}>
          <Text style={styles.textPaginator}>Personajes: </Text>
          <Text style={styles.numbersPaginator}>
            {data.results.length}
          </Text>
          <Text style={styles.textPaginator}> de </Text>
          <Text style={styles.numbersPaginator}>
            {data.info.count}
          </Text>
        </View>
      </View>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        ref={flatListRef}
        data={data.results}
        renderItem={({ item }) => (
          <CharacterCard character={item} />
        )}
        keyExtractor={(item, index) =>
          `${item.id}-${page}-${index}`
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#0a0521",
  },
  paginator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
    height: 60,
    borderWidth: 2,
    backgroundColor: "#0a0521",
  },
  pageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPaginator: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
  numbersPaginator: {
    color: "grey",
    fontSize: 25,
    fontStyle: "italic",
  },
});
