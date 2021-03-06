import React, {Component} from 'react'
import classNames from 'classnames'
import {inject, observer} from 'mobx-react'

import {trans} from '../state/Translate'

import HorizontalSliderWithControls from './HorizontalSliderWithControls'

const {slideshow} = trans.key.slide2
const slides = [
    {
        heading: slideshow.slide0.heading(),
        text: slideshow.slide0.text(),
    },
    {
        heading: slideshow.slide1.heading(),
        text: slideshow.slide1.text(),
    },
    {
        heading: slideshow.slide2.heading(),
        text: slideshow.slide2.text(),
    },
    {
        heading: slideshow.slide3.heading(),
        text: slideshow.slide3.text(),
    },
    {
        heading: slideshow.slide4.heading(),
        text: slideshow.slide4.text(),
    },
    {
        heading: slideshow.slide5.heading(),
        text: slideshow.slide5.text(),
    },
    {
        heading: slideshow.slide6.heading(),
        text: slideshow.slide6.text(),
    },
]

@inject('store') @observer
class Slide2 extends Component {
    render() {
        const {store: {active}} = this.props

        return <div className={classNames('Slide Slide2', {active: active === 1})}>
            <HorizontalSliderWithControls>
                {slides.map(({heading, text}, i) => <div key={i}>
                    <h2>
                        <span className={`glitchText`}>{heading}</span>
                    </h2>
                    <p>{text}</p>
                </div>)}
            </HorizontalSliderWithControls>
        </div>
    }
}



export default Slide2