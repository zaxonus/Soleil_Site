export default function FixForm({url,label}:{
  url:string;
  label:string
}) {
  const btnAtrib = 'inline-block bg-blue-500 text-white' +
                   ' text-2xl font-semibold rounded-lg' +
                   ' hover:bg-blue-800 hover:text-yellow-200' +
                   ' px-4 py-2 m-3'
  return (
    // <div className={btnAtrib}>
    //   <a href={url}
    //      target="_blank"
    //      rel="noopener noreferrer" >
    //     {label}
    //   </a>
    // </div>



      <form onSubmit={handleSubmit} style={styles.form}>
        <DtFrmField fieldID={'name'}
                    fieldIntro={'Nom du site :'}
                    fieldVal={label}
                    fieldChgCbkFn={handleChange}
                    disable={loading}
                    need={true} />
        <DtFrmField fieldID={'url'}
                    fieldIntro={'URL :'}
                    fieldVal={url}
                    fieldChgCbkFn={handleChange}
                    disable={loading} />
        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>




  );
} /* End of FixForm */
