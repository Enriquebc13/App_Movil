import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocationCard } from "./locationCard";
import { useEffect, useState } from "react";
import { LocationsResult } from "./locationsResult";
import { DataSource } from "./dataSource";

export function LocationsView() {

    //estado para los datos
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<LocationsResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },

        results: [],

    });

    const dataSource = new DataSource();
    //cada vez que cambie el numero de pag cargar ubicaciones
    useEffect(() => {
        setLoading(true);

        dataSource.getLocations(page)
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
                    <LocationCard location={item} />
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
        backgroundColor:"#0a0521",
        padding:20,

    },
    paginator: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7,
        height: 40,
        backgroundColor:"#0a0521"
    },
    button: {
        backgroundColor: "#083452",
        color: "#FFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        borderRadius:12
    },
    buttonText: {
        fontSize: 18,
        color: "#FFF"
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
        color:"white"
    },
});