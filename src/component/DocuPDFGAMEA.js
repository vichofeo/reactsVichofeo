/* eslint-disable no-array-constructor */
import { v4 as uuid } from "uuid";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,Font
} from "@react-pdf/renderer";



const fechaActual = (fechaYMD = null) => {
  var meses = new Array(
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  );
  var diasSemana = new Array(
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  );
  var f = !fechaYMD ? new Date() : new Date(fechaYMD + " 01:01:01");

  var myfecha =
    diasSemana[f.getDay()] +
    ", " +
    f.getDate() +
    " de " +
    meses[f.getMonth()] +
    " de " +
    f.getFullYear();
  return myfecha;
};

const DocuPDF = ({ datos, servicios, org }) => {
  datos.organizacion = org ? org : "-Sin Dato-";
  
  // Register font
  Font.register({
    family: 'NoticiaText',
    fonts: [
      {
        src: `/fonts/NoticiaText-Regular.ttf`
      },
      {
        src: `/fonts/NoticiaText-Bold.ttf`,
        fontWeight: 'bold'
      },
      {
        src: `/fonts/NoticiaText-Italic.ttf`,
        fontWeight: 'normal',
        fontStyle: 'italic'
      },
      {
        src: `/fonts/NoticiaText-BoldItalic.ttf`,
        fontWeight: 'bold',
        fontStyle: 'italic'
      }
    ]
  })

  const stylesLeft = StyleSheet.create({
    imageLeft: {
      position: "absolute",
      minWidth: "100px",
      minHeight: "70px",
      display: "block",
      width: "100px",
      height: "70px",
      top: -18,
      left: -10,
    },
    imageRigth: {
      position: "absolute",
      minWidth: "39px",
      minHeight: "50px",
      display: "block",
      width: "63px",
      height: "80px",
      top: -18,
      right: 0,
    },
    imageRepris: {
      position: "absolute",
      
      display: "block",
      width: "90%",
      top: 10,
      left: 10,
    },
  });
  const BORDER_COLOR = "#bfbfbf";
  const BORDER_STYLE = "solid";
  const COL1_WIDTH = 40;
  const COLN_WIDTH = (100 - COL1_WIDTH) / 3;
  const styles = StyleSheet.create({
    body: {
      padding: 10,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: BORDER_STYLE,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol1Header: {
      width: COL1_WIDTH + "%",
      borderStyle: BORDER_STYLE,
      borderColor: BORDER_COLOR,
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColHeader: {
      width: COLN_WIDTH + "%",
      borderStyle: BORDER_STYLE,
      borderColor: BORDER_COLOR,
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol1: {
      width: COL1_WIDTH + "%",
      borderStyle: BORDER_STYLE,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: COLN_WIDTH + "%",
      borderStyle: BORDER_STYLE,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: 3,

      fontWeight: "bold",
    },
    tableCell: {
      margin: 2,
    },
  });
  const cabeceras = [
    "SEGMENTOS",
    "V/HORA",
    "T/HORAS",
    "CANJE",
    "EXONERACION",
    "DESCUENTOS",
    "TOTAL Bs.",
  ];
  return (
    <Document>
      <Page
        size="LETTER"
        style={{
          display: "flex",

          backgroundColor: "white",

          fontFamily: "NoticiaText",
          fontSize: 8,
          paddingTop: 30,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 20,
          lineHeight: 1.5,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <Image src="/images/logogamea.jpg" style={stylesLeft.imageLeft} />
          <Image src="/images/escudogamea.jpg" style={stylesLeft.imageRigth} />
          {datos.estado === 'Pagado' ? <Image src="/images/repris.png" style={stylesLeft.imageRepris} />: null}
          <Text style={{ color: "#3388af", fontSize: "14px" }}>
            DIRECCION DE DEPORTES GAMEA
          </Text>
          <Text>ADMINISTRACION DE ESCENARIOS PUBLICOS</Text>

          <Text style={{ fontSize: "10px" }}>
            FORMULARIO DE AUTORIZACION Y USO DE COMPETICIONES OFICIALES Y
          </Text>
          <Text style={{ fontSize: "10px" }}>
            NO OFICIALES DE ESPACIO Y ESCENARIOS DEPORTIVOS
          </Text>
          <Text
            style={{
              color: "gray",
              fontStyle: 'italic',
              fontSize: "8px",
            }}
          >
            EL FORMATO DEBE SER TRAMIOTADO ORIGINAL Y TRES COPIAS CON TRES DIAS
            DE ANTICIPACION. PARA LAS SOLICITUDES DE SABADOS Y DOMINGO Y DIAS
            FESTIVOS, SE DEBE ADJUNTAR E LISTADO DE ASISTENTES CON EL RESPECTIVO
            NUMERO DE DOCUMENTO DE IDENTIDAD
          </Text>
        </View>
        {/** tabla de datos iniciales */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableColHeader, width: "35%" }}>
              <Text style={styles.tableCellHeader}>
                NOMBRE PERSONA / RESPONSABLE:
              </Text>
            </View>
            <View style={{ ...styles.tableCol1Header, width: "50%" }}>
              <Text style={styles.tableCellHeader}>
                JEFE DE UNIDAD DE INFRAESTRUCTURA
              </Text>
            </View>
            <View style={{ ...styles.tableCol1Header, width: "15%" }}>
              <Text style={styles.tableCellHeader}>
                COD: {datos.codigo}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>NOMBRE EMPRESA/ORGANIZACION:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{datos.organizacion}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{datos.telefono}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                SECTOR: {datos.nsector} (
                {datos.ntrsector})
              </Text>
            </View>
          </View>
        </View>
        {/** *** informacion del escenario  *** */}

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1Header}>
              <Text style={styles.tableCellHeader}>
                NOMBRE DEL ESCENARIO DEPORTIVO
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>ESPACIO SOLICITADO</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                {datos.nescenario}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {datos.ntrescenario}
              </Text>
            </View>
          </View>
        </View>

        {/** ** fehas de reserva ** */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>FECHA DE RESERVA:</Text>
            </View>
            <View style={{...styles.tableColHeader, width: "25%"}}>
              <Text style={styles.tableCellHeader}>{fechaActual()}</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>FECHA DE UTILIZACION: </Text>
            </View>
            <View style={{...styles.tableColHeader, width: "25%"}}>
              <Text style={styles.tableCellHeader}>
                {fechaActual(datos.programacion[0]?.fecha)}
              </Text>
            </View>
          </View>
          {/**  TABLA DE DATOS  */}

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>HORA INICIO</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>HORA FINALIZACION</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>CANTIDAD HORAS</Text>
              </View>
              <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>FECHAS</Text>
              </View>
            </View>
            {datos.programacion.map((i) => (
              <View style={styles.tableRow} key={uuid()}>
                <View style={styles.tableCol}>
                  <Text style={{ ...styles.tableCell, textAlign: "right" }}>
                    {i.hora_inicio}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={{ ...styles.tableCell, textAlign: "right" }}>
                    {i.hora_fin}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={{ ...styles.tableCell, textAlign: "right" }}>
                    {i.duracion}
                  </Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>{fechaActual(i.fecha)}</Text>
                </View>
              </View>
            ))}
          </View>
          {/** DESCRIPCON */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "#3388af",
                fontSize: "12px",
              }}
            >
              DESCRIPCION DE LA ACTTIVIDAD
            </Text>
            <Text style={{ textAlign: "center" }}>
              {datos.descripcion_actividad}
            </Text>
          </View>
        </View>
        {/** tarifas */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",

            
          }}
        >
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              color: "#3388af",
              fontSize: "10px",
            }}
          >
            TARIFAS O RETRIBUCION
          </Text>
        </View>
        {/** TABLA TARIFAS */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {cabeceras.map((i, index) => {
              let myw = index ? "10%" : "40%";

              return (
                <View style={{ ...styles.tableColHeader, width: myw }} key={uuid()}>
                  <Text style={styles.tableCellHeader}>{i}</Text>
                </View>
              );
            })}
          </View>

          {datos.segmentos.map((i)=> {
            if (i) {
              return (
                <View style={styles.tableRow} key={uuid()}>
                  <View style={{ ...styles.tableCol, width: "40%" }}>
                    <Text style={styles.tableCell}>
                      {i.label.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.tableCell}>{i.valor_hora}</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.tableCell}>{i.thoras}</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.tableCell}>{i.canje? i.canje : null} </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.tableCell}>
                      {i.exoneracion ? "Con Exoneracion" : null}{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.tableCell}>{i.descuentos ? i.descuentos : null } </Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      textAlign: "right",
                    }}
                  >
                    <Text style={styles.tableCell}>{i.total}</Text>
                  </View>
                </View>
              );
            }
          })}

          <View style={styles.tableRow}>
            <View
              style={{ ...styles.tableCol, width: "90%", textAlign: "right" }}
            >
              <Text style={styles.tableCell}>TOTAL</Text>
            </View>

            <View
              style={{ ...styles.tableCol, width: "10%", textAlign: "right" }}
            >
              <Text style={styles.tableCell}> {datos.ctotal} </Text>
            </View>
          </View>
        </View>
        {/** *** ADVERTENCIAS**** */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <Text
            style={{
              color: "gray",
              fontStyle: 'italic',
              fontSize: "8px",
            }}
          >
            NOTA: Una vez aprobado el servicio de uso del escenario, el
            solicitante debe reclamar en la oficina del Area de Administracion
            de Escenarios deportivos de la D1RECCION DE DEPORTES , la factura
            dentro del tiempo acordado por las partes, el original del recibo de
            pago o la consignación deberá ser reportada en el Area de
            Administracion de escenarios deportivos, y entregada su copia en la
            Dirección de deportes, requisito sin el cual no podrá hacer el uso
            del escenario
          </Text>
        </View>
        {/** *** OBLIUGACIONES ***** */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: "#3388af",
              fontSize: "8px",
            }}
          >
            OBLIGACIONES, PROHIBICIONES DEL SOLICITANTE - CONDICIONES OFRECIDAS
            PARA EL USO Y APROVECHAMIENTO DEL ESCENARIO
          </Text>

          <View
            style={{
              color: "gray",
              fontStyle: 'italic',
              fontSize: "7px",
              textAlign: "justify",
            }}
          >
            <Text>
              1. Las personas naturales y/o jurldicas interesadas presentarán
              solicitud escrita ante la oficina del Departamento de Deportes de
              la UIS, con una antelación no inferior a quince (15) dlas hábiles,
              a la fecha de realización de la actividad o evento
            </Text>
            <Text>
              2. El solicitante debera cumplir con las medidas de Bioseguridad
              por el COVID -19 durante todo el partido
            </Text>
            <Text>
              3.La Direccion de Deportes, garantizará la reserva del escenario,
              una vez cumplidos los requisitos y procedimientos para el prestamo
              del mismo.
            </Text>
            <Text>
              4. El Area de Acministracion de Escenarios Deportivos verificara
              que el escenario se encuentre en condiciones de servicio, de
              manera previa y posterior al desarrollo de la actividad objeto del
              aprovechamiento.
            </Text>
            <Text>
              5. El solicitante debe adoptar las medidas de seguridad y
              sanitarias necesarias para que 110 se ponga en riesgo la salud y
              el bienestar de la comunidad
            </Text>
            <Text>
              6. En caso que el evento no se realice por motivos o causales del
              solicitante. esta no se hace responsable por ningUn perjuicio
              ocasionado
            </Text>
            <Text>
              7. La Direccion de Deportes no se hace responsable por daños a
              terceros, en caso que el evento no se realice por situaciones
              internas, eventos naturales o situaciones inesperadas.
            </Text>
            <Text>
              8. El escenario solicitado sera utilizado únicamente por entidad
              y/o beneficiario, autorizado por la Dlreccíon de Deportes
            </Text>
            <Text>
              9. El solicitante ylo beneficiario serán responsables por la
              pérdida, daño o hurto de cualquiera de los componentes del
              escenario autorizado, equipamiento o implementos que forme parte
              de los bienes propios para el desarrollo de la actividad
              autorizada.
            </Text>
            <Text>
              10. Si el préstamo solicitado implica manejo de balerlas
              sanitarias, estas deben mantenerse limpias y proveerse de los
              recursos requeridos para la higiene personal.
            </Text>
            <Text>
              11. El solicitante debe garantizar una óptima y oportuna atención
              al público, en los dlas y dentro de los horarios establecidos para
              el evento o actividad.
            </Text>
            <Text>
              12. Firmar el acta de entrega y cumplimiento del reglamento
              especifico para la utílización del escenario solicitado, 011 el
              cual se contemplan las condiciones de uso y forma de entrega del
              escenario utilizado.
            </Text>
            <Text>
              13. Respetar la autonomia que tiene el GAMEA., en materia
              administrativa y en desarrollo de la vigilancia y control de los
              escenarios objeto del prestamo
            </Text>
            <Text>
              14. Queda totalmente prohibido el expendio y consumo de bebidas
              alcohólicas o cualquier sustancia estimulante o tóxica para el
              organismo, en el escenario durante el desarrollo de la actividad
              solicitada. No se permitiré la presencia de personas en estado de
              embriaguez, ni el porte de armas.
            </Text>
            <Text>
              15. No se permite en e! escenario el expendio de productos
              comestibles o bebidas u otras.
            </Text>
            <Text>
              16. No se permite en el escenario realizar publicidad, sin la
              previa autorización de la Dirección de Deportes o celebración de
              acuerdos para su exhibición
            </Text>
            <Text>
              17. No se permite integrar permanentemente a la estructura del
              escenario autorizado elementos ñscos o algún otro elemento ajeno a
              la infraestructura propia del espacio autorizado.
            </Text>
            <Text>
              18. Está prohibido el ingreso de mascotas a la Escenario deportivo
              (Coliseo y demás escenarios)
            </Text>
            <Text>
              19. Los niños menores de 12 años deben estar siempre acompañados
              de sus padres o de un adulto. La Direccion de Deportes, no se hace
              responsable en caso de accidente.
            </Text>
            <Text>
              20. El solicitante podra hacer uso del parqueadero del escenario
              deportivo, previa presentación de la lista oficial de los
              participantes con número de cédula de La Direccion de Deportes no
              se responsabilizan por elementos que so encuentren dentro de los
              vehiculos de los asistentes.
            </Text>
            <Text>
              21. Esta prohibido entrar al campo deportivo con indumentarias no
              adecuadas.
            </Text>
          </View>
        </View>
        {/** **** ACTA DE ENTREGA ********** */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Text> </Text>
          <Text
            style={{
              color: "#3388af",
              fontSize: "10px",
            }}
          >
            ACTA DE ENTREGA Y DEVOLUCION DEL ESCENARIO
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableColHeader, width: "100%" }}>
                <Text style={styles.tableCellHeader}>
                  BANOS ESTADO: SANITARIOS
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              {Object.entries(servicios).map(([columnId, column], index) => (
                <View style={{ ...styles.tableCol, width: "25%" }} key={uuid()}>
                  <Text style={styles.tableCell}>
                    {index > 2
                      ? "OTROS ELEMENTOS Y ACCESORIOS DE ESCENARIO"
                      : columnId.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.tableRow}>
              {Object.entries(servicios).map(([columnId, column], index) => (
                <View style={{ ...styles.tableCol, width: "25%" }} key={uuid()}>
                  <Text style={styles.tableCell}>{column}</Text>
                </View>
              ))}
            </View>
            <View style={{ ...styles.tableRow, textAlign: "justify" }}>
              <View style={{ ...styles.tableColHeader, width: "100%" }}>
                <Text style={styles.tableCellHeader}>
                  OBSERVACIONES.- {datos.observaciones}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/** *******FIRMAS ******** */}

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Text key={uuid()}> </Text>
        ))}

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableCol, width: "50%" }}>
                <View>
                  <Text style={styles.tableCell}>
                    FIRMA SOLICITANTE/RESPONSABLE
                  </Text>
                  <Text>{datos.organizacion}</Text>
                </View>
              </View>
              <View style={{ ...styles.tableCol, width: "50%" }}>
                <Text style={styles.tableCell}>
                  FIRMA ADMINISTRADOR Y/O RESPONSABLE
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styles.tableRow,
            color: "gray",
            fontStyle: 'italic',
            fontSize: "7px",
            textAlign: "left",
          }}
        >
          <Text>DIRECCION DE DEPORTES: TELEFAX:28248554</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;
