import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const PdfPlantilla = ({ datos }) => {
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

      fontWeight: 500,
    },
    tableCell: {
      margin: 2,
    },
  });

  return (
    <Document>
      <Page
        size="LETTER"
        style={{
          display: "flex",

          backgroundColor: "white",

          fontFamily: "Helvetica",
          fontSize: 8,
          paddingTop: 30,
          paddingLeft: 30,
          paddingRight: 30,
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
            backgroundColor: "white",
          }}
        >
          <Text style={{ color: "#3388af", fontSize: "14px" }}>
            DIRECCION DE DEPORTES GAMEA
          </Text>
          <Text>ADMINISTRACION DE ESCENARIOS PUBLICOS</Text>

          <Text style={{ fontSize: "10px" }}>
            FORMULARIO DE AUTORIZACION Y USO DE COMPETICIONES OFICIALES Y NO
            OFICIALES DE ESPACIO Y ESCENARIOS DEPORTIVOS
          </Text>
          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
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
            <View style={styles.tableCol1Header}>
              <Text style={styles.tableCellHeader}>
                NOMBRE PERSONA / RESPONSABLE:
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                JEFE DE UNIDAD DE INFRAESTRUCTURA
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>...</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>...</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>NOMBRE EMPRESA/ORGANIZACION:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>.... quien alquila</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>...tekefono</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>SECTOR:...</Text>
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
              <Text style={styles.tableCell}>..nombre esbceiro..</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>..espacio..</Text>
            </View>
          </View>
        </View>

        {/** ** fehas de reserva ** */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>FECHA DE RESERVA:</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>....</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>FECHA DE UTILIZACION</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>...</Text>
            </View>
          </View>
          {/** TABLA DE DATOS */}
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
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>....</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>.... </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>...tekefono</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>...</Text>
              </View>
            </View>
          </View>
          {/** DESCRIPCON */}
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
                fontSize: "12px",
              }}
            >
              DESCRIPCION DE LA ACTTIVIDAD
            </Text>
            <Text>TEXTOOO</Text>
          </View>
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
            
              <View style={{...styles.tableColHeader, width:"40%" }}>
                <Text style={styles.tableCellHeader}>SEGMENTOS</Text>
              </View>
              <View style={{...styles.tableColHeader, width:"10%" }}>
              <Text style={styles.tableCellHeader}>V/HORA</Text>
            </View>
            <View style={{...styles.tableColHeader, width:"10%" }}>
              <Text style={styles.tableCellHeader}>T/HORAS</Text>
            </View>
            <View style={{...styles.tableColHeader, width:"10%" }}>
              <Text style={styles.tableCellHeader}>CANJE</Text>
            </View>
            <View style={{...styles.tableColHeader, width:"10%" }}>
              <Text style={styles.tableCellHeader}>EXONERACION</Text>
            </View>
            <View style={{...styles.tableColHeader, width:"10%" }}>
              <Text style={styles.tableCellHeader}>DESCUENTOS</Text>
            </View>
            <View style={{...styles.tableColHeader, width:"10%" }}>
              <Text style={styles.tableCellHeader}>TOTAL Bs.</Text>
            </View>
          </View>
          <View style={styles.tableRow}>

              <View style={{...styles.tableCol, width:"40%" }}>
                <Text style={styles.tableCell}>ALQUILER ESCENARIO</Text>
              </View>
              <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}>..palta.</Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}>..total</Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>
          <View style={styles.tableRow}>

              <View style={{...styles.tableCol, width:"40%" }}>
                <Text style={styles.tableCell}>AUXILIAR LOGISTICA Y ESCENARIO</Text>
              </View>
              <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>
          <View style={styles.tableRow}>

              <View style={{...styles.tableCol, width:"40%" }}>
                <Text style={styles.tableCell}>PERSONAL ASEO Y GUARDADO</Text>
              </View>
              <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
            <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>

          <View style={styles.tableRow}>

          <View style={{...styles.tableCol, width:"90%" }}>
            <Text style={styles.tableCell}>TOTAL</Text>
          </View>
          
        <View style={{...styles.tableCol, width:"10%", textAlign: "right" }}>
          <Text style={styles.tableCell}> ...</Text>
        </View>
      </View>

        </View>
      </Page>
    </Document>
  );
};

export default PdfPlantilla;
