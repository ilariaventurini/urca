<% if (dependencies.includes('tachyons')) { %>
import 'tachyons'
<% } %>
<% if (dependencies.includes('tachyons-extra')) { %>
import 'tachyons-extra'
<% } %>
import { hello } from '../src'

///////////////////////////////////////////////////////////////////////////////

const root = document.getElementById('app')
const container = document.createElement('div')

container.classList.add('w-100', 'h-100', 'flex', 'flex-center')
root.appendChild(container)
createDemo(container)

///////////////////////////////////////////////////////////////////////////////

<% if (useTypescript) { %>
function createDemo(container: HTMLDivElement) {
<% } else { %>
function createDemo(container) {
<% } %>
  const example = document.createElement('div')
  example.setAttribute('id', 'example')
  example.classList.add('flex', 'flex-column')
  example.innerText = hello('mitico')
  container.appendChild(example)
}
