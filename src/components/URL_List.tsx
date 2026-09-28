import React,{useState,useEffect,useRef} from "react";
import Parse from "parse"
import LinkButton from './LinkButton'

export default function URL_List() {
  const [dataArray,setDataArray] = useState<Parse.Object[]>([])


  useEffect(() => {
    async function fetchData() {
      try {
        const URL_List = Parse.Object.extend("URL_List");
        const query = new Parse.Query(URL_List);
        //query.ascending("order");
        query.limit(256);

        const results = await query.find();
        setDataArray(results);
      } catch (err) {
        //setError(err.message);
        //setError(err instanceof Error ? err.message : String(err));
      } finally {
        //setLoading(false);
      }
    }

    fetchData();
  }, [/*ticData*/]);


  return (
    <div className="flex flex-wrap">
      {dataArray.map((item,idx) => (
        <div key={item.id}>
          <LinkButton url={item.get('url')}
                      label={item.get('name')} />
        </div>
      ))}
    </div>
  )
} /* End of URL_List */
