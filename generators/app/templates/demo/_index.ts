import 'tachyons'
import 'tachyons-extra'
import { hello } from '../src'
<% if (useTypescript) { %>
import { select, Selection } from 'd3-selection'
<% } else { %>
import { select } from 'd3-selection'
<% } %>

///////////////////////////////////////////////////////////////////////////////

const root = select('#app')
const container = root.append('div').attr('class', 'w-100 h-100 flex flex-center')
createDemo(container)

///////////////////////////////////////////////////////////////////////////////

<% if (useTypescript) { %>
function createDemo(container: Selection<HTMLDivElement, unknown, HTMLElement, any>) {
<% } else { %>
function createDemo(container) {
<% } %>
  const example = container
    .append('div')
    .attr('id', 'example')
    .attr('class', `flex flex-column`)
    .html(hello('mitico'))
}
