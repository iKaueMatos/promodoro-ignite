import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from "phosphor-react";
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';

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
    startDate:Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    
    useEffect(() => {
        let interval: number;

        if (activeCycle) {
           interval = setInterval(() => {
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate));
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    },[activeCycle]);

    //Watch => Capturando o valor que esta dentro do campo
    const taskWatch = watch('task');
    const isSubmitDisabled = !taskWatch;

    //Recebendo data => dados como parametro para conseguimos manipula-los 
    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());
        
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        setCycles((state) => [...state, newCycle]);
        setAmountSecondsPassed(0);
        setActiveCycleId(id);

        reset();
    }

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2,'0');
    const seconds = String(secondsAmount).padStart(2,'0');


    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    },[minutes, seconds, activeCycle]);

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
                        placeholder="0"
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
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} weight="fill" />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}