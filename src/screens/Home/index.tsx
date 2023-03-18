import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";


export function Home() {
    const [participant, setParticipant] = useState<string[]>([])
    const [addParticipant, setAddParticipant] = useState('')

    function handleParticipantAdd() {
        if (!addParticipant) return Alert.alert('Insira um nome')
        if (participant.includes(addParticipant)) {
            return Alert.alert('Participande Já existe!', 'Esse participante já está na lista')
        }
        setParticipant(prev => [...prev, addParticipant])
        setAddParticipant('')
    }
    function handleParticipantRemove(name: string) {
        Alert.alert(`Remover Participante`, `Tem certeza uqe deseja remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => {
                    Alert.alert(`${name} foi deletado`)
                    const removedParticipant = participant.filter(part => {
                        return part != name
                    })
                    console.log(removedParticipant)
                    setParticipant(removedParticipant)
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
        console.log('removeu ' + name)
    }
    return (
        <View style={styles.container}>

            <Text style={styles.eventName}>
                Nome do evento</Text>

            <Text style={styles.eventDate}>
                Segunda, 8 de Março de 2023.
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor='#6b6b6b'
                    onChangeText={setAddParticipant}
                    value={addParticipant}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={participant}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                        key={item}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou ainda? Adicione participantes a sua lista presença.
                    </Text>
                )}
            />


        </View >
    )
}
