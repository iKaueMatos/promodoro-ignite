import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from "date-fns/locale";

export function History() {
    const { cycles } = useContext(CyclesContext);
    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cycles.map((cycle) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix:true,
                                        locale:ptBR
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green">Concluido</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red">Interrompido</Status>
                                        )}
                                        {(!cycle.finishedDate && !cycle.interruptedDate ) && (
                                            <Status statusColor="yellow">Em andamento</Status>
                                        )}

                                        {cycle.finishedDate && (
                                            <Status statusColor="green">Concluido</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}