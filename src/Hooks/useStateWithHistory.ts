//---------------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------------
import { useState }                 from 'react'
import { useRef }                   from 'react'
import { useCallback }              from 'react'

//---------------------------------------------------------------------
// Hook Definition Section
//---------------------------------------------------------------------
export const useStateWithHistory = (defaultValue: any, {capacity=10}={}) => {

    //-----------------------------------------------------------------
    // Initialization Section
    //-----------------------------------------------------------------
    const [value, setValue] = useState(defaultValue)
    const historyRef = useRef([value])
    const pointerRef = useRef(0)

    //-----------------------------------------------------------------
    // Internal Functions Section
    //-----------------------------------------------------------------
    const set = useCallback(
        v => {
            const resolvedValue = typeof v === 'function' ? v(value) : v
            if (historyRef.current[pointerRef.current] !== resolvedValue)
            {
                if (pointerRef.current < historyRef.current.length -1)
                {
                    historyRef.current.splice(pointerRef.current +1)
                }
                historyRef.current.push(resolvedValue)

                while (historyRef.current.length > capacity)
                {
                    historyRef.current.shift()
                }
                pointerRef.current = historyRef.current.length -1
            }
            setValue(resolvedValue)
        },
        [capacity, value]
    )
    //-----------------------------------------------------------------
    const back = useCallback(() => {
        if (pointerRef.current <= 0)
        {
            return
        }
        pointerRef.current--
        setValue(historyRef.current[pointerRef.current])
    }, [])
    //-----------------------------------------------------------------
    const forward = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length -1)
        {
            return
        }
        pointerRef.current++
        setValue(historyRef.current[pointerRef.current])
    }, [])
    //-----------------------------------------------------------------
    const go = useCallback((index: number) => {
        if (index < 0 || index >= historyRef.current.length -1)
        {
            return
        }
        pointerRef.current = index
        setValue(historyRef.current[pointerRef.current])
    }, [])

    //-----------------------------------------------------------------
    // Return Section
    //-----------------------------------------------------------------
    return [
        value,
        set,
        {
            history: historyRef.current,
            pointer: pointerRef.current,
            back,
            forward,
            go
        }
    ]

}

//---------------------------------------------------------------------
// Exports Section
//---------------------------------------------------------------------
export default useStateWithHistory
