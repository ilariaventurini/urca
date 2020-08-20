<% if (useTypescript) { %>
export function hello(name: string): string {
  return `Hello ${name}!`
}
<% } else { %>
export function hello(name) {
  return `Hello ${name}!`
}
<% } %>
