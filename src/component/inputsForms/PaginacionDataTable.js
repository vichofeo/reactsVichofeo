const  PaginacionDataTable = ({ pages, pageActive, buscaData }) => {
    const styles = {
        button: {
            
          color: '#fff',
          padding: '2px 4px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }
      }
    const numeros = []
    for (let i = 0; i < pages; i++) {
        numeros.push(
            <button
            style={{backgroundColor: pageActive === i+1? 'palevioletred' :'#0A283E',  ...styles.button}}
                className={pageActive === i+1 ? "active" : ""}
                onClick={() => buscaData({pageActive:i+1})}
                
                key={`butonLinkPage${i}`}
            >
                {i + 1}
            </button>
        )
    }

    return (

        <div className="topbar-filter">
            

            <div className="pagination2">
                <span>
                    Page {pageActive} of {pages}:
                </span>

                { numeros}

                <button style={{backgroundColor: '#0A283E', ...styles.button}}>
                    <i className="fa fa-forward"></i>
                </button>
            </div>
        </div>
    )
}

export default PaginacionDataTable