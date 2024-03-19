import {useState} from 'react';

function Test(){
    const [test,setTest] = useState('t'); 
    return(
        <div>
            {test}
        </div>
    )
}

export default test;