<% if (useTypescript) { %>
export function hello(name: string): string {
  return `Ciao ${name}!`
}
<% } else { %>
export function hello(name) {
  return `Ciao ${name}!`
}
<% } %>
