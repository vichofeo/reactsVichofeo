import { NavLink } from 'react-router-dom'

export default function PageWrapper({ children }) {
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
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">Vichofeo</span>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="Usuario Foto"
              />
            </div>
            <div className="info">
              
                Luchadores
              
            </div>
          </div>

          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
          {/* ***************  menu de navegacion --> */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink  to="./registro" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Registro
                    <span className="right badge badge-danger">Wrestler</span>
                  </p>
                </NavLink>

              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy"></i>
                  <p>
                    Programacion
                    <i className="fas fa-angle-left right"></i>
                    <span className="badge badge-info right">6</span>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="./programar" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Hacer Programa</p>
                    </NavLink>

                  </li>
                  <li className="nav-item">
                    <NavLink to="./reProgramar" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Re Programar</p>
                    </NavLink>

                  </li>
                </ul>
              </li>

              <li className="nav-header">Programa</li>
              <li className="nav-item">
                <NavLink to= "./verPrograma" className="nav-link">
                <i className="nav-icon far fa-circle text-danger"></i>
                  <p className="text">Ver Fecha activa</p>
                </NavLink>

              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="content-wrapper">


        <section className="content">
          <div className="container-fluid">{children}</div>
        </section>
      </div>

      <aside className="control-sidebar control-sidebar-dark"></aside>

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
