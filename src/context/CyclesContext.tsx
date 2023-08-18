import { ReactNode, createContext, useEffect, useReducer, useState } from 'react';
import {Cycle, cyclesReducer} from '../reducers/cycles';

interface createCycleDate {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: createCycleDate) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    //state e o valor que eta dentro da variavel no seu tempo de execução 
    //action a ação que pode ser executada no tempo de execução
    const initialState = {
        cycles: [],
        activeCycleId: null,
    };
    
    const [cyclesState, dispatch] = useReducer(cyclesReducer, initialState, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@ignite-Timer:cycles:state V.1.0.0');

    if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
    }

    return initialState;
    });

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const {cycles, activeCycleId} = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    
    //LocalStorage
    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem('@ignite-Timer:cycles:state V.1.0.0', stateJSON);
    }, [cyclesState]);

    function markCurrentCycleAsFinished() {
        //UseReducer
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED'
        });
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: createCycleDate) {
        const id = String(new Date().getTime());
        
        const newCycle: Cycle = {
                id,
                task: data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date()
            }
            
            //UseReducer
            dispatch({
                type: 'ADD_NEW_CYCLE',
                payload: {
                    newCycle
                }
            });

        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
         //UseReducer
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE'
        });
    }

    return (
        <CyclesContext.Provider 
        value={{ 
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            cycles
        }}
        >
            {children}
        </CyclesContext.Provider>
    )
}