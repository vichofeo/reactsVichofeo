import { useState } from "react"

import ApiInvoker from "../utils/ApiInvoker"


const useGetDataView = (dataIni) => {

    const [dataInitial, setDataInitial] = useState(null)
    const [dataEvent, setDataEvent] = useState(dataIni)
    const [lucha, setLucha] = useState(null)

    const getDataInitial = () => {
        setLucha(null)
        ApiInvoker.invokeGET('/getPrograms',
            res => {
                if (res.ok) {
                    let datos = Object.entries(res.body).map(([pos, obj]) => {
                        return {
                            value: pos,
                            label: obj.label,
                            data: obj.luchas
                        }
                    })

                    setDataInitial(datos)
                    setDataEvent(datos[0])

                } else {
                    setDataInitial(null)
                    setDataEvent(null)
                }

            }, e => {
                setDataInitial(e)
            })
    }

    const getDataLucha = (lucha) => {
        setLucha(null)
        ApiInvoker.invokeGETwBody('/viewLuchadores', lucha,
            res => {
                if (res.ok)
                    setLucha(res.body)
                else setLucha(null)
            },
            e => {
                setLucha(null)
            })

    }

    const seteoDataEvent = (datos) => {
        setLucha(null)
        setDataEvent(datos)
    }

    const getMusica = (data, setData) => {
        
        
        let id = data._id;
        ApiInvoker.invokeGET(
            '/getMuss/' + id,
            res => {
                
                let src
                if (res.ok)
                    src = res.body

                setData({...data, src})

            },
            e => {
                setData(data)
            }
        )

    }

    return [dataInitial, getDataInitial, dataEvent, seteoDataEvent, lucha, getDataLucha, getMusica]
}

export default useGetDataView