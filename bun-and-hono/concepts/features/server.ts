import type { Server } from 'bun'

interface User {
  id: number
  name: string
}

interface APIResponse {
  message: string
  method: string
  route: string
  data?: User | User[]
}

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Brown' },
  { id: 5, name: 'Charlie Green' }
]

const server: Server = Bun.serve({
  port: 3000,
  fetch (request: Request): Response {
    const url = new URL(request.url)
    const method = request.method

    let response: APIResponse = {
      message: 'Hello from Bun server!',
      method: method,
      route: url.pathname
    }

    if (url.pathname === '/') {
      // root route
      if (method === 'GET') {
        response.message = 'Welcome to the Bun server!'
      } else {
        response.message = 'Method not allowed!'
        return new Response(JSON.stringify(response), { status: 405 })
      }
    } else if (url.pathname === '/users') {
      // localhost:3000/user
      switch (method) {
        case 'GET':
          response.message = 'User details fetched successfully!'
          response.data = users
          break

        case 'POST':
          response.message = 'User created successfully!'
          break

        default:
          response.message = 'Method not allowed!'
          return new Response(JSON.stringify(response), { status: 405 })
      }
    }
    return Response.json(response)
  }
})


console.log(`Bun server running at http://localhost:${server.port}/`)
