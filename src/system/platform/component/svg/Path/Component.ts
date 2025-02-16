import applyStyle from '../../../../../client/applyStyle'
import namespaceURI from '../../../../../client/component/namespaceURI'
import { Element } from '../../../../../client/element'
import { System } from '../../../../../system'
import { Dict } from '../../../../../types/Dict'

export interface Props {
  id?: string
  className?: string
  style?: Dict<string>
  d?: string
  markerStart?: string
  markerEnd?: string
  fillRule?: string
}

export const DEFAULT_STYLE = {
  strokeWidth: '3px',
  fill: 'none',
  stroke: 'currentColor',
}

// M 50,50 A 30 30 6 1 0 50,49.9
// M 10,50 L50,90 L90,50 L50,10 Z

export default class SVGPath extends Element<SVGPathElement, Props> {
  private _path_el: SVGPathElement

  constructor($props: Props, $system: System) {
    super($props, $system)

    const {
      id,
      className,
      style = {},
      d = '',
      markerStart,
      markerEnd,
      fillRule,
    } = $props

    const path_el = document.createElementNS(namespaceURI, 'path')
    if (id !== undefined) {
      path_el.id = id
    }
    if (className) {
      path_el.classList.value = className
    }
    applyStyle(path_el, { ...DEFAULT_STYLE, ...style })
    path_el.setAttribute('d', d)
    if (markerStart !== undefined) {
      path_el.setAttribute('marker-start', markerStart)
    }
    if (markerEnd !== undefined) {
      path_el.setAttribute('marker-end', markerEnd)
    }
    if (fillRule !== undefined) {
      path_el.setAttribute('fill-rule', fillRule)
    }
    this._path_el = path_el

    this.$element = path_el
    this.$unbundled = false
  }

  onPropChanged(prop: string, current: any): void {
    if (prop === 'className') {
      this._path_el.className.value = current
    } else if (prop === 'style') {
      applyStyle(this._path_el, { ...DEFAULT_STYLE, ...current })
    } else if (prop === 'd') {
      if (current === undefined) {
        this._path_el.removeAttribute('d')
      } else {
        this._path_el.setAttribute('d', current)
      }
    } else if (prop === 'markerStart') {
      this._path_el.setAttribute('marker-start', current)
    } else if (prop === 'markerEnd') {
      this._path_el.setAttribute('marker-end', current)
    } else if (prop === 'strokeWidth') {
      if (current === undefined) {
        this._path_el.removeAttribute('stroke-width')
      } else {
        this._path_el.setAttribute('stroke-width', `${current}`)
      }
    } else if (prop === 'fillRule') {
      if (current === undefined) {
        this._path_el.removeAttribute('fill-rule')
      } else {
        this._path_el.setAttribute('fill-rule', current)
      }
    }
  }
}
