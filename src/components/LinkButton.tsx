export default function LinkButton({url,label}:{
  url:string;
  label:string
}) {
  const btnAtrib = 'inline-block bg-blue-500 text-white' +
                   ' text-2xl font-semibold rounded-lg' +
                   ' hover:bg-blue-800 hover:text-yellow-200' +
                   ' px-4 py-2 m-3'
  return (
    <div className={btnAtrib}>
      <a href={url}
         target="_blank"
         rel="noopener noreferrer" >
        {label}
      </a>
    </div>
  );
} /* End of LinkButton */
