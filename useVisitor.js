import {useState, useEffect} from 'react'
import { useRouter }         from 'next/router'
import getBrowserFingerprint from 'get-browser-fingerprint'

const useVisitor = (my_niche) => {
    //variables
    const router = useRouter()

    //useStates HOOKS
    const [os, setOs]                              = useState(false)
    const [screen_size, setScreenSize]             = useState(false)
    const [path, setPath]                          = useState(false)
    const [returning_visitor, setReturningVisitor] = useState(false)
    const [browser, setBrowser]                    = useState(false)
    const [language, setLanguage]                  = useState(false)
    const [fingerprint_id, setFingerPrintId]       = useState(false)
    const [client_time, setClientTime]             = useState(new Date())

    const [nextRouterLoading, setNextRouterLoading]= useState(true)
    const [paid_ads, setPaidAds]                   = useState(false)
    const [traffic_source, setTrafficSource]       = useState(false)
    const [campaign_name, setCampaignName]         = useState(false)
    const [niche, setNiche]                        = useState(my_niche !== "undefined" ? my_niche : false)

    //useEffect HOOK
    useEffect(() => {
        if(router.query.paid_ads){
            setNextRouterLoading(false)
            setPaidAds(true)
        }

        if(router.query.traffic_source){
            setNextRouterLoading(false)
            setTrafficSource(router.query.traffic_source)
        }

        if(router.query.campaign_name){
            setNextRouterLoading(false)
            setCampaignName(router.query.campaign_name)
        }

        if(router.query.niche){
            setNextRouterLoading(false)
            setNiche(router.query.niche)
        }
    }, [router])

    useEffect(() => {
        const fingerprint = getBrowserFingerprint()
        setFingerPrintId(fingerprint)

        setOs(window.navigator.platform.toLocaleLowerCase().includes('linux') ? 'Android' : window.navigator.platform)
        setScreenSize(`${window.outerWidth} x ${window.outerHeight}`)
        setPath(window.location.pathname)
        if(localStorage.getItem('returning_visitor')) setReturningVisitor(true)
        else localStorage.setItem('returning_visitor', true)

        if(navigator.userAgent.match(/chrome|chromium|crios/i)) setBrowser('Chrome')
        else if(navigator.userAgent.match(/firefox|fxios/i))    setBrowser('Firefox')
        else if(navigator.userAgent.match(/safari/i))           setBrowser('Safari')
        else if(navigator.userAgent.match(/opr\//i))            setBrowser('Opera')
        else if(navigator.userAgent.match(/edg/i))              setBrowser('Edge')
        else setBrowser(navigator.userAgent)

        setLanguage(window.navigator.language)
    }, [])

    //main return
    return [os, screen_size, path, returning_visitor, browser, language, fingerprint_id, client_time, nextRouterLoading, paid_ads, traffic_source, campaign_name, niche]
}

export default useVisitor
