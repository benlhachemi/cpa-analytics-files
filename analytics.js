//packages need to be installed
//npm i socket.io-client get-browser-fingerprint

//imports
import io                     from "socket.io-client"    /* NEED TO BE INSTALLED -> npm i socket.io-client */
import {useState, useEffect}  from "react"
import useVisitor             from "../hooks/useVisitor" /* IT CAN NEED MODIFICATION */

//ADD THIS TO THE ROOT COMPONENT AS PROPS
{pages_visited,setPagesVisited,buttons_clicked,setButtonsClicked,errors,setErrors}

//inside main function (modifications : niche)
const socket = io('http://159.223.41.167:3000/') /* ADDRESS OF THE SERVER */
const [os, screen_size, path, returning_user, browser, language, fingerprint_id, client_time, nextRouterLoading, paid_ads, traffic_source, campaign_name, niche] = useVisitor("MLBB")
const [time_spent, setTime] = useState(0)
useEffect(() => {if(!nextRouterLoading)socket.emit("url-info", paid_ads, traffic_source, campaign_name, niche)}, [nextRouterLoading])
useEffect(() => {let temp_pages_visited = pages_visited;temp_pages_visited.push(window.location.pathname);setPagesVisited(temp_pages_visited);setInterval(()=>{setTime(++time_spent)},1000);window.addEventListener('visibilitychange', ()=>{console.log(document.visibilityState);if (document.visibilityState !== 'visible') {const last_page_path = window.location.pathname;socket.emit("click-away", time_spent, last_page_path, pages_visited, buttons_clicked, errors);socket.disconnect();} })}, [])
useEffect(() => {if(os) socket.emit("first-info", os, screen_size, path, returning_user, browser, language, fingerprint_id, client_time, niche)}, [os])


//locker code (ADD THIS TO YOUR LOCKER BUTTON)
const last_page_path = window.location.pathname;socket.emit("locker", time_spent, last_page_path, pages_visited, buttons_clicked, errors)


//add btn to analytics (modification : CHANGE THE NAME OF BTN EACH TIME YOU ADD ONE)
let temp_buttons_clicked = buttons_clicked;temp_buttons_clicked.push('NAME OF BUTTON');setButtonsClicked(temp_buttons_clicked)


//add an error to analytics (modification : CHANGE THE NAME OF ERROR EACH TIME YOU ADD ONE)
let temp_errors = errors;temp_errors.push('NAME OF ERROR');setErrors(temp_errors);
