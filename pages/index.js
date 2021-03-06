import {Component} from 'react'
import Head from 'next/head'
import {Provider, inject, observer} from 'mobx-react'

import css from '../styles/index.scss'

import {Store} from '../state/Store'
import {trans} from '../state/Translate'

import Slide1 from '../components/Slide1'
import Slide2 from '../components/Slide2'
import Slide3 from '../components/Slide3'
import Scroller from '../components/Scroller'
import SocialWrapper from '../components/SocialWrapper'
import Disclaimer from '../components/Disclaimer'
import Controls from '../components/Controls'
import GoogleTagManager from '../components/GoogleTagManager'

@inject('store') @observer
class Index extends Component {
    _handleResize = e => {
        this.props.store.setViewportWidth(
            Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        )
        this.props.store.setViewportHeight(
            Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        )
    }

    componentDidMount() {
        if (this.props.store.isClient) {
            this._handleResize()

            window.addEventListener('resize', this._handleResize)
        }
    }
    componentWillUnmount() {
        if (this.props.store.isClient) {
            window.removeEventListener('resize', this._handleResize)
        }
    }
    render() {
        const {store: {isMobile}} = this.props
        const {header: {title}, og: {fbLink}} = trans.key
        let DisclaimerComponent = ''

        if (!isMobile) {
            DisclaimerComponent = <Disclaimer/>
        }

        return <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta property="og:title" content={title()} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={fbLink()} />
                <meta property="og:image" content={`static/images/og.jpg`} />
                <style dangerouslySetInnerHTML={{__html: css}}/>
                <title>{title()}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="stylesheet" href="https://use.typekit.net/mqa6irl.css"/>
            </Head>
            <GoogleTagManager gtmId={`GTM-5LTVTK2`} />
            <SocialWrapper/>
            <Controls/>
            <Scroller onScroll={!isMobile}>
                <Slide1/>
                <Slide2/>
                <Slide3/>
            </Scroller>
            {DisclaimerComponent}
        </div>
    }
}

const IndexWithState = () => <Provider store={new Store()}>
    <Index/>
</Provider>

export default IndexWithState