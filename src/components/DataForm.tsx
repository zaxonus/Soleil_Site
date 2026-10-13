import /*React,*/ {useState,useEffect/*,ChangeEvent, FormEvent*/ } from 'react';
import type {ChangeEvent,FormEvent} from 'react';
import Parse from 'parse';
import {styles} from './styles';
import InputField from './InputField';
// import AwsmBtn from './AwsmBtn';
import LogoutBtn from './LogoutBtn';
import type {/*LangLevel,*/FormData} from './types';

// Initialize Parse :
Parse.initialize("i3tzTVEHYEb1EjCo1cyNzHQNz3Ft0oyHX0gjmzD2",
		             "zkfZmh3TNVCZlBK2hRL3SOva8iBn4ezEUP8JSVg4");
Parse.serverURL = "https://parseapi.back4app.com/";


interface Status {
  type: 'success' | 'error' | '';
  message: string;
}

// const DataForm: React.FC = ({cbkFn}:{cbkFn?:()=>void}) => {
function DataForm({cbkFn,data=null}:{cbkFn?:()=>void,data?:FormData|null}) {
  const [formData, setFormData] = useState<FormData>({
    name: data?data.name:'',
    url: data?data.url:'',
    // jpnTrans: data?data.jpnTrans:''
  });
  
  const [status, setStatus] = useState<Status>({ 
    type: '', 
    message: '' 
  });
  
  const [user,setUser] = useState<Parse.User|null>(null),
        [loading,setLoading] = useState<boolean>(false)//,
        // [statusMsg,setStatusMsg] = useState<string>(''),
        // [langProtocol,setLangProtocol] = useState<LangLevel>('Neutral')

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUser(currentUser)
    }

    // if (data && (typeof data.lngProtoc !== 'undefined')) {
    //   if (data.lngProtoc == 'Formal') setLangProtocol('Formal');
    //   if (data.lngProtoc == 'Casual') setLangProtocol('Casual');
    // }
  }, []);


  // Handle logout
  const handleLogout = async (): Promise<void> => {
    try {
      // await Parse.User.logOut();
      setStatus({
        type: 'success',
        message: 'Logged out successfully!'
      });
      // Optionally redirect or clear form
      // setFormData({ field_one: '', field_two: '', field_three: '' });
      setFormData({name:'',url:''/*,jpnTrans:''*/});
      if (typeof cbkFn !== 'undefined') cbkFn()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setStatus({
        type: 'error',
        message: `Logout error: ${errorMessage}`
      });
    }
  } /* End of handleLogout */



  // Type the event parameter
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  } /* End of handleChange */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus({type:'',message:''});

    let sentenRcd
    // sentenRcd = new Parse.Object("Uyum_Sentences");
    sentenRcd = new Parse.Object("URL_List");


    // The lines above seem to be partly unneeded .... ????
    sentenRcd.set("name", formData.name.trim());
    sentenRcd.set("url", formData.url.trim());
    // sentenRcd.set("jpnTrans", formData.jpnTrans.trim());
    // if (langProtocol=='Formal') sentenRcd.set("formalFlag", true);
    // if (langProtocol=='Casual') sentenRcd.set("casualFlag", true);
    if (!data) sentenRcd.set("order", new Date().getTime());
    sentenRcd.set("ownerID", user?.id);




    // Trial code (Start).
    try {
      let newID

      if (data && (typeof data.rcdID !== 'undefined')) {
        newID = await Parse.Cloud.run('updateRcd',{
          name:formData.name.trim(),
          url:formData.url.trim(),
          // jpnTrans:formData.jpnTrans.trim(),
          // fmlFlag:(langProtocol=='Formal'),
          // cslFlag:(langProtocol=='Casual'),
          recordID:data.rcdID
        });
      } else {
        newID = await Parse.Cloud.run('makeUnqRcd',{
          name:formData.name.trim(),
          url:formData.url.trim(),
          // jpnTrans:formData.jpnTrans.trim(),
          // fmlFlag:(langProtocol=='Formal'),
          // cslFlag:(langProtocol=='Casual'),
          order:new Date().getTime()
        });
      }

      setStatus({
        type: 'success',
        message: `Created record: ${newID}`,
      });

      // Reset form, etc.
      setFormData({ 
        name: '', 
        url: '', 
        // jpnTrans: '' 
      });
      // setLangProtocol('Neutral');
    } catch (error) {
      if (error instanceof Parse.Error && error.code === Parse.Error.DUPLICATE_VALUE) {
        setStatus({
          type: 'error',
          message: 'This site has already been registered. It cannot appear twice.',
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setStatus({
          type: 'error',
          message: `Error: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
    // Trial code (End).






    return;
  } /* End of handleSubmit */


  /*const swapLangProtocol = (protocol:LangLevel) => {
    setLangProtocol(langProtocol==protocol?'Neutral':protocol)
  } /* End of swapLangProtocol */


  return (
    <div style={styles.container}>
      {(status.type=='error') &&
      <div style={styles.feedBack}>
        {status.message}
      </div>
      }
      {(user!==null) &&
      <>
      <div style={styles.header}>
        <h2 style={styles.title}>Enter Data</h2>
        {/* <button 
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c82333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dc3545';
          }}
        >
          Logout
        </button> */}
        <LogoutBtn cbkFn={handleLogout}/>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <DtFrmField fieldID={'name'}
                    fieldIntro={'Nom du site :'}
                    fieldVal={formData.name}
                    fieldChgCbkFn={handleChange}
                    disable={loading}
                    need={true} />
        <DtFrmField fieldID={'url'}
                    fieldIntro={'URL :'}
                    fieldVal={formData.url}
                    fieldChgCbkFn={handleChange}
                    disable={loading} />
        {/* <DtFrmField fieldID={'jpnTrans'}
                    fieldIntro={'Enter the Japanese translation :'}
                    fieldVal={formData.jpnTrans}
                    fieldChgCbkFn={handleChange}
                    disable={loading} /> */}
        {/* <div className='flex justify-around items-center m-2'>
          <AwsmBtn clickFn={()=>{swapLangProtocol('Formal')}}
                   btnShape='user-tie'
                   disable={false}
                   color={langProtocol=='Formal'?'indigo-700':'gray-300'}
                   size='2x' />
          <AwsmBtn clickFn={()=>{swapLangProtocol('Casual')}}
                   btnShape='hand-peace'
                   disable={false}
                   color={langProtocol=='Casual'?'orange-700':'gray-300'}
                   size='2x' />
        </div> */}
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
      </>
      }
    </div>
  );
}; /* End of DataForm */


function DtFrmField({fieldID,fieldIntro,fieldVal,
  fieldChgCbkFn,disable,need=false}:{
  fieldID:string,
  fieldIntro:string,
  fieldVal:string
  fieldChgCbkFn:(e:ChangeEvent<HTMLInputElement>)=>void
  disable:boolean
  need?:boolean
}) {
  return (
    <InputField fieldID={fieldID}
                fieldIntro={fieldIntro}
                fieldVal={fieldVal}
                fieldChgCbkFn={fieldChgCbkFn}
                disable={disable}
                globStyl={styles.formGroup}
                lblStyl={styles.label}
                inpStyl={styles.input}
                need={need} />
  )
} /* DtFrmField */


export default DataForm;