import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';
import { HandPalm, Play } from "phosphor-react";
import { Countdown } from './components/Countdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from "react-hook-form";
import {useState, useEffect, createContext} from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { HomeContainer, StartCountdownButton, StopCountdownButton, } from "./styles";

const newCycleFormValidationSchema = zod.object ({
    task:zod.string()
    .min(1, 'Informe a tarefa'), 
    minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no minimo 1 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate:Date,
    interruptDate?:Date,
    finishedDate?:Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    //Watch => Capturando o valor que esta dentro do campo
    const taskWatch = watch('task');
    const isSubmitDisabled = !taskWatch;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;
        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                new Date(), 
                activeCycle.startDate
                )

                if (secondsDifference >= totalSeconds)  {
                    setCycles((state) => state.map((cycle) =>{
                        if (cycle.id === activeCycleId) {
                            return {...cycle, finishedDate:new Date() }
                        } else {
                            return cycle;
                        }
                      }),
                    );

                    clearInterval(interval);
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000);
        }

        return () => {
                clearInterval(interval);
        }
    },[activeCycle, totalSeconds, activeCycleId]);

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

    function handleInterruptCycle() {
        setCycles((state) => state.map((cycle) =>{
                if (cycle.id === activeCycleId) {
                    return {...cycle, interruptedDate:new Date() }
                } else {
                    return cycle;
                }
            }),
        );
        setActiveCycleId(null);
    }

    function markCurrentCycleAsFinished() {
        setCycles((state) => state.map((cycle) =>{
            if (cycle.id === activeCycleId) {
                return {...cycle, finishedDate:new Date() }
            } else {
                return cycle;
            }
          }),
        );
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider 
                    value={{ 
                        activeCycle, 
                        activeCycleId, 
                        markCurrentCycleAsFinished, 
                        amountSecondsPassed,
                        setSecondsPassed
                    }}
                >
                    
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    
                    <Countdown/>
                </CyclesContext.Provider>
                
                {activeCycle ? (
                   
                   <StopCountdownButton onClick={handleInterruptCycle}type="button">
                        <HandPalm size={24} weight="fill" />
                        Interroper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} weight="fill" />
                        Começar
                    </StartCountdownButton>
                )}

            </form>

        </HomeContainer>
    )
}