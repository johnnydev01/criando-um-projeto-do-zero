// import styles from './styles.modules.scss';

import { useEffect } from "react"

export default function Comments(){

    useEffect(()=> {
        let script = document.createElement("script");
        let anchor = document.getElementById("inject-comments-for-uterances");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("crossorigin","anonymous");
        script.setAttribute("async", 'true');
        script.setAttribute("repo", "johnnydev01/criando-um-projeto-do-zero");
        script.setAttribute("issue-term", "url");
        script.setAttribute( "theme", "github-light");
        anchor.appendChild(script);
    }, [])
    return (
        <div id="inject-comments-for-uterances"></div>
    )
}