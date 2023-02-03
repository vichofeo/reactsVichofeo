export default function Paginacion(props) {
  const getPaginacion = () => {
    const pages = [];
    for (let i = 0; i < props.total; i++) {
      let j = i + 1;
      pages.push(
        <a
          className={props.pagina === j ? "active" : ""}
          onClick={() => props.cambioPage(j)}
        >
          {i + 1}
        </a>
      );
    }
    return pages;
  };

  return (
    <div className="topbar-filter">
      <label>Registros por Pagina:</label>

      <div className="pagination2">
        <span>
          Page {props.pagina} of {props.total}:
        </span>

        {getPaginacion()}

        <a href="#">
          <i className="ion-arrow-right-b"></i>
        </a>
      </div>
    </div>
  );
}
