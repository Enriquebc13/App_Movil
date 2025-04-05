import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { EpisodeCard } from "./episodeCard";
import { useEffect, useState } from "react";
import { EpisodesResult } from "./episodesResult";
import { DataSource } from "./dataSource";

export function EpisodesView() {

    // Estado para los datos
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<EpisodesResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },

        results: [],

    });

    const dataSource = new DataSource();
    // Cada vez que cambie el número de página, cargar episodios
    useEffect(() => {
        setLoading(true);

        dataSource.getEpisodes(page)
            .then((result) => {
                setData(result);
            })

            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [page]);

    return (
        <View style={styles.ScrollView}>

            <View style={styles.paginator}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setPage(page - 1) }}
                    disabled={data.info.prev === null}>
                    <Text style={styles.buttonText}>Anterior</Text>
                </TouchableOpacity>

                <View style={styles.pageInfo}>
                    <Text style={styles.textPaginator}>Página</Text>
                    <Text style={styles.numbersPaginator}>{page}</Text>
                    <Text style={styles.textPaginator}> de </Text>
                    <Text style={styles.numbersPaginator}>{data.info.pages}</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setPage(page + 1) }}
                    disabled={data.info.next === null}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>

            </View>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : null}

            <FlatList
                data={data.results}
                renderItem={({ item }) => (
                    <EpisodeCard episode={item} />
                )}

                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 74 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        width: "100%",
        backgroundColor: "#0a0521",
        padding: 10,
    },
    paginator: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7,
        height: 60,
        backgroundColor: "#0a0521",
    },
    button: {
        backgroundColor: "#083452",
        color: "#FFF",
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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
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
});
