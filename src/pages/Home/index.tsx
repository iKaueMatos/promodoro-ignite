import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteAmount, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        placeholder="De um nome para o seu projeto"
                        list="task-suggestations"
                    />
                    <datalist id="task-suggestations">
                        <option value="Desenvolvendo um novo projeto" />
                        <option value="Estudos para faculdade" />
                        <option value="Programando" />
                    </datalist>

                    <label htmlFor="minutesAmout">durante</label>
                    <MinuteAmount 
                        type="number" 
                        id="minutesAmount"
                        placeholder="00"
                        step={5} 
                        min={5}
                        max={60}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled type="submit">
                    <Play size={24} weight="fill" />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}