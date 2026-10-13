import /*React,*/{useState,useEffect,useMemo/*,useRef*/} from "react";
import Parse from "parse"
import ComboBox from './ComboBox'
import {LinkButton} from './AllButtons'

const maxCount = 256

export default function URL_List() {
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
        //setLoading(false);
        //setLabelArray(await getAllLabels());
      }
    }

    fetchData();
    // setLabelArray(getAllLabels());
  }, [/*ticData*/]);


  return (
    <div className="flex flex-col items-center">
      <ComboBox items={labelArray}
                value={activLabel}
                onChange={setActivLabel} />
      <div className="flex flex-wrap">
        {dataArray
        .filter(item => (activLabel=='')||
                        (item.get('labels')??[]).includes(activLabel))
        .map((item) => (
          // The two lines below could be used instead of the filter above :
          // ((activLabel=='')||
          //  (item.get('labels')??[]).includes(activLabel)) &&
          <div key={item.id}>
            <LinkButton url={item.get('url')}
                        label={item.get('name')} />
          </div>
        ))}
      </div>
    </div>
  )
} /* End of URL_List */










/*async function getAllLabels(records?:Parse.Object[]): Promise<string[]> {
  if (!records) {
    console.log('NO-records')
    const query = new Parse.Query('URL_List');
    query.select('labels');
    query.limit(maxCount);
    records = await query.find();
  } else console.log('YES-records')

  const all = new Set<string>();
  for (const r of records) {
    for (const item of r.get('labels') ?? []) {
      // Below, all being is a Set, duplicates are eliminated.
      all.add(item);
    }
  }

  return Array.from(all);
} /* End of getAllLabels */


function extractLabels(records:Parse.Object[]):string[] {
  const all = new Set<string>();
  for (const r of records) {
    for (const item of r.get('labels')??[]) {
      all.add(item);
    }
  }
  return Array.from(all);
} /* End of extractLabels */


async function getAllLabels(): Promise<string[]> {
  const query = new Parse.Query('URL_List');
  query.select('labels');
  query.limit(maxCount);
  return extractLabels(await query.find());
} /* End of getAllLabels */
