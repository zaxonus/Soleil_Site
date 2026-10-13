import /*React,*/{useState,useEffect,useMemo/*,useRef*/} from "react";
import Parse from "parse"
import ComboBox from './ComboBox'
import FixForm from './FixForm'
import {SwapButton} from './AllButtons'

const maxCount = 256

export default function List_Fix() {
  const [dataArray,setDataArray] = useState<Parse.Object[]>([]),
        // [labelArray,setLabelArray] = useState<string[]>([]),
        labelArray = useMemo(()=>extractLabels(dataArray),[dataArray]),
        [activLabel,setActivLabel] = useState<string>('')


  useEffect(() => {
    async function fetchData() {
      try {
        const URL_List = Parse.Object.extend("URL_List");
        const query = new Parse.Query(URL_List);
        //query.ascending("order");
        query.limit(maxCount);

        const results = await query.find();
        setDataArray(results);
        //setLabelArray(extractLabels(results));
      } catch (err) {
        //setError(err.message);
        //setError(err instanceof Error ? err.message : String(err));
      } finally {
      }
    }

    fetchData();
  }, [/*ticData*/]);


  return (
    <div className="flex flex-col items-center">
      <ComboBox items={labelArray}
                value={activLabel}
                onChange={setActivLabel} />
      <div className="flex flex-wrap">
        {dataArray
        // .filter(item => (activLabel=='')||
        //                 (item.get('labels')??[]).includes(activLabel))
        .map((item) => (
          // The two lines below could be used instead of the filter above :
          // ((activLabel=='')||
          //  (item.get('labels')??[]).includes(activLabel)) &&
          <div key={item.id}>
            {/* <FixForm url={item.get('url')}
                     label={item.get('name')} /> */}
            <SwapButton elt={item}
                        actvLbl={activLabel} />
          </div>
        ))}
      </div>
    </div>
  )
} /* End of List_Fix */


function extractLabels(records:Parse.Object[]):string[] {
  const all = new Set<string>();
  for (const r of records) {
    for (const item of r.get('labels')??[]) {
      all.add(item);
    }
  }
  return Array.from(all);
} /* End of extractLabels */


function SwapLabel({elt}:{elt:Parse.Object}) {
  return (
    <div onClick={()=>{console.log(elt.get('name'))}}>
      {elt.get('name')}
    </div>
  )
} /* End of SwapLabel */
