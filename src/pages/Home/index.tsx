import { Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Componentes do styledComponents
import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinuteAmount, 
    Separator, 
    StartCountdownButton, 
    TaskInput
} from "./styles";

import { useForm } from "react-hook-form";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object ({
    task:zod.string()
    .min(1, 'Informe a tarefa'), 
    minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
});


// Outro caso para definir o tipo de dados que estão sendo 
// retornados do formulário utilizando <Generics> && interface
// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;


interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, reset, formState } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });
    
    //Watch => Capturando o valor que esta dentro do campo
    const taskWatch = watch('task');
    const isSubmitDisabled = !taskWatch;

    //Recebendo data => dados como parametro para conseguimos manipula-los 
    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount
        }
        
        setCycles((cycles) => [...cycles, newCycle]);
        setActiveCycleId(id);

        reset();
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const minutes = String(minutesAmount).padStart(2,'0');
    const secondsAmount = currentSeconds % 60;
    const seconds = String(secondsAmount).padStart(2,'0');

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    
                    <TaskInput 
                        id="task" 
                        placeholder="De um nome para o seu projeto"
                        list="task-suggestations"
                        {...register('task')}
                    />

                    <datalist id="task-suggestations">
                        <option value="Desenvolvendo um novo projeto" />
                        <option value="Estudos para a faculdade" />
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
                        //Definindo o tipo de valor que queremos que seja retornado nesse 
                        //caso sera do tipo nuber
                        {...register('minutesAmount', { valueAsNumber: true })}
                    /> 
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[0]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[0]}</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} weight="fill" />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}