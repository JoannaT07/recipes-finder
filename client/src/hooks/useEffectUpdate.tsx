import React, { useEffect, useRef } from "react"

const useEffectUpdate = (func: any, dep: any) => {
    const initialized = useRef(false)

    useEffect(()=>{
        if(initialized.current){
            func()
        }
        initialized.current = true;
    }, dep)
}

export default useEffectUpdate