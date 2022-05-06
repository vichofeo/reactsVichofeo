/* eslint-disable no-array-constructor */
import { v4 as uuid } from "uuid";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet, Font
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

const DocuReservaPDF = ({ datos, servicios, org }) => {
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
        src: `/fonts/v-Italic.ttf`,
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
      top: -35,
      left: -30,
    },
    imageRigth: {
      position: "absolute",
      minWidth: "39px",
      minHeight: "50px",
      display: "block",
      width: "63px",
      height: "80px",
      top: -35,
      right: 0,
    },
  });
  const BORDER_COLOR = "#bfbfbf";
  const BORDER_STYLE = "solid";
  const COL1_WIDTH = 40;
  const COLN_WIDTH = (100 - COL1_WIDTH) / 3;
  const styles = StyleSheet.create({
    textStyle: {
      textDecorationLine: 'underline'
    },
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

      fontWeight: 500,
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
          paddingTop: 50,
          paddingLeft: 50,
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
            fontSize: 12,
            fontWeight:"bold",
            
          }}
        >
          <Image src="/images/logogamea.jpg" style={stylesLeft.imageLeft} />
          <Image src="/images/escudogamea.jpg" style={stylesLeft.imageRigth} />
          <Text> GOBIERNO AUTONOMO MUNICIPAL DE EL ALTO </Text>
          <Text >DIRECCION DE DEPORTES GAMEA </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            fontSize: 11,
          }}
        >
          <Text>El Alto, {fechaActual()}</Text>
          <Text>CITE: .....</Text>
          <Text style={{textDecoration: 'underline', fontWeight:'bold'}}>CR: {datos.codigo}</Text>
        </View>
        {/** formalidad carta */}

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontSize: 11,
          }}
        >
          <Text style={{fontWeight:'bold'}}>Senor:</Text>
          <Text>reservador</Text>
          <Text style={{fontWeight:'bold'}}>{datos.organizacion}</Text>
          <Text>Presente.-</Text>
          <Text> </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            
            
            fontSize: 11,
            fontWeight:"bold"
          }}
        >
          <Text style={{textDecoration: 'underline', textAlign: "center",}}>
            REF.: AUTORIZACIÓN PARA DEPÓSITO Y USO DEL CAMPO DEPORTIVO "
            {datos.escenarios[datos.escenario].label.toUpperCase()}"
          </Text>

          <Text> </Text>
        </View>
        {/** *** informacion del escenario  *** */}

        <View
          style={{
            fontSize: "11px",
            textAlign: "justify",
          }}
        >
          <Text>De mi mayor consideración </Text>
          <Text> </Text>
          <Text style={{flexDirection: "row"}}>
            De acuerdo a la nota de solicitud de Campo Deportivo emitida por{" "}
            <Text style={{fontWeight:'bold'}}>{datos.organizacion.toUpperCase()}</Text>. Misma que es aceptada y se
            autoriza el depósito bancario a cuenta del GAMEA <Text style={{fontWeight:'bold'}}>"10000004711912"</Text>{" "}
            para la utilización del mismo según el siguiente detalle:{" "}
          </Text>
        </View>

        {/** ** fehas de reserva ** */}
        <View style={styles.table}>
          {/* TABLA DE DATOS  */}

          <View style={styles.table}>
            <View style={styles.tableRow}>
            <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>FECHAS</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>HORA INICIO</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>HORA FINALIZACION</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>CANTIDAD HORAS</Text>
              </View>
              
            </View>
            {datos.programacion.map((i) => (
              <View style={styles.tableRow} key={uuid()}>
              <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>{fechaActual(i.fecha)}</Text>
                </View>
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
                
              </View>
            ))}
          </View>
          {/** DESCRIPCON */}
        </View>
        {/** tarifas */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",

            backgroundColor: "white",
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

          {datos.segmentos.map((i) => {
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
                    <Text style={styles.tableCell}>
                      {i.canje ? i.canje : null}{" "}
                    </Text>
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
                    <Text style={styles.tableCell}>
                      {i.descuentos ? i.descuentos : null}{" "}
                    </Text>
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
            fontSize: "11px",
            textAlign: "justify",
            
          }}
        >
          
          <Text style={{flexDirection: "row"}}>
            Se ruega a los solicitantes en la aplicación de <Text style={{fontWeight:'bold'}}>MEDIDAS DE
            BIOSEGURIDAD AL INGRESO Y DURANTE LA REALIZACIÓN DE LAS ACTIVIDADES</Text>,
            la dirección de Deportes no se responsabilizara de las sanciones
            aplicadas por las autoridades correspondientes ante las faltas según
            supervisión de las mismas en los diferentes campos deportivos.
          </Text>
          <Text>
            Sin otro particular, me despido con las consideraciones respectivas.
          </Text>
        </View>
        {/** *** OBLIUGACIONES ***** */}

        {/** **** ACTA DE ENTREGA ********** */}

        {/** *******FIRMAS ******** */}

        <View
          style={{
            margin:"auto",
            marginLeft:"1%",
            color: "gray",
            fontStyle: "italic",
            fontSize: "7px",
            
          }}
        >
        <Text>Cc Arch.</Text>
        <Text>Cc UI.</Text>
        <Text>UI</Text>
          <Text>DIRECCION DE DEPORTES: TELEFAX:28248554</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocuReservaPDF;
