import Parse from "parse"

const coreAtrib = 'inline-block' +// bg-blue-500 text-white' +
                  ' text-2xl font-semibold rounded-lg' +
                  ' hover:bg-blue-800 hover:text-yellow-200' +
                  ' px-4 py-2 m-3'


export /*default*/ function LinkButton({url,label}:{
  url:string;
  label:string
}) {
  // const btnAtrib = 'inline-block bg-blue-500 text-white' +
  //                  ' text-2xl font-semibold rounded-lg' +
  //                  ' hover:bg-blue-800 hover:text-yellow-200' +
  //                  ' px-4 py-2 m-3'
  const btnAtrib = coreAtrib+' bg-blue-500 text-white'
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


export function SwapButton({elt,actvLbl}:{
  elt:Parse.Object
  actvLbl:string
}) {
  //const btnAtrib = coreAtrib//+' bg-slate-300 text-slate-700'
  const btnColr = (lbls:string[]) => {
    if (lbls.includes(actvLbl))
      return /*coreAtrib+*/' bg-mist-600 text-lime-200'
    else return /*coreAtrib+*/' bg-slate-300 text-slate-700'
  }

  const swapLabel = async (rcdID:string) => {
    if (!actvLbl.length) return
    await Parse.Cloud.run('swapLabel',{
      label:actvLbl,
      id:rcdID
    });
  } /* End of swapLabel */

  return (
    <div className={coreAtrib+btnColr((elt.get('labels')??[]))}
         onClick={()=>{
          // console.log(elt.get('name'))
          // console.log('actvLbl=',actvLbl)
          swapLabel(elt.id!)
         }}>
      {elt.get('name')}
    </div>
  )
  //(item.get('labels')??[])
} /* End of SwapButton */
