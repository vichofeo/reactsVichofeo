import useSenddata from "../hooks/useSendData"


import FormProgramacion from "./inputsForms/FormProgramacion"


const CReProgramar = () => {

  const[dataTraffic, saveData, updateData] = useSenddata("/verPrograma")
  const guardar = (datos)=>{
    //guardando dato
    updateData(datos, "/updatePrograma")
  }
  
  return (
    <section >
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <FormProgramacion submit= {guardar}/>
          
      </div>
      <div></div>
    </section>
  )
}

export default CReProgramar