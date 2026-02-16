import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Character } from "./characterType";
import { CharacterCard } from "./characterCard";
import { CharactersResult } from "./charactersResult";
import { DataSource } from "./dataSource";

export function CharactersView(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [data, setData] = useState<CharactersResult>({
    info: {
      pages: 0,
      count: 0,
      next: null,
      prev: null,
    },
    results: [],
  });

  const dataSource = new DataSource();

  useEffect((): void => {
    setLoading(true);

    dataSource
      .getCharacters(page)
      .then((result: CharactersResult) => {
        setData(result);
      })
      .catch((error: Error) => {
        Alert.alert("Error", error.message);
      })
      .finally((): void => {
        setLoading(false);
      });
  }, [page]);

  const handlePrevious = (): void => {
    if (data.info.prev) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = (): void => {
    if (data.info.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paginator}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePrevious}
          disabled={!data.info.prev}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>

        <View style={styles.pageInfo}>
          <Text style={styles.textPaginator}>Página </Text>
          <Text style={styles.numbersPaginator}>{page}</Text>
          <Text style={styles.textPaginator}> de </Text>
          <Text style={styles.numbersPaginator}>
            {data.info.pages}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={!data.info.next}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" />}

      <FlatList<Character>
        data={data.results}
        renderItem={({ item }) => (
          <CharacterCard character={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    height: 60,
    backgroundColor: "#0a0521",
  },
  button: {
    backgroundColor: "#083452",
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
  pageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  numbersPaginator: {
    color: "grey",
    fontSize: 21,
  },
  textPaginator: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  listContent: {
    paddingBottom: 74,
  },
});
