/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
export default function PageWrapper(props) {
  return (
    <div className="wrapper">
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <img
          src="dist/img/AdminLTELogo.png"          
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">GAMEA - DDeportes</span>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/avatar4.png"
                className="img-circle elevation-2"                
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                By Vichofeo
              </a>
            </div>
          </div>

         

          <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" 
          data-widget="treeview" 
          role="menu" 
          data-accordion="false">

              <li className="nav-header">Menu</li>

              <li className="nav-item">
                <a href="calendar.html" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Calendario
                    <span className="right badge badge-danger">Demo</span>
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-edit"></i>
                  <p>
                    GAMEA - Deportes CFG
                    <i className="fas fa-angle-left right"></i>
                    <span className="badge badge-info right">6</span>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/tipoSector" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Tipo Sector</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/sector" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Sector</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/espacio" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Espacios</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/escenario" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Escenarios</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/itemsAdicional" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Items Adicionales</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/adicionales" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Adicionales Escenario</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-book"></i>
                  <p>
                    GAMEA - Autorizar
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/autorizacion" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Realizar Autorizacion</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/autorizacionVer" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Ver Autorizaciones</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">{props.children}</div>
        </section>
      </div>

      

      <footer className="main-footer">
        <strong>Copyleft &copy; 2014-2022 vichofeoooo.</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 0000.1
        </div>
      </footer>
    </div>
  );
}
