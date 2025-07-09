import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware para proteção de rotas e redirecionamentos
 * Implementa Clean Architecture com separação de responsabilidades
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Rotas públicas que não necessitam autenticação
  const publicPaths = ['/auth', '/auth/login', '/']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // Token de autenticação do cookie
  const token = request.cookies.get('auth-token')?.value
  
  // Se é uma rota pública e usuário está autenticado, redireciona para dashboard
  if (isPublicPath && token && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Se é uma rota protegida e usuário não está autenticado, redireciona para login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Redirecionamento das rotas antigas para as novas (backward compatibility)
  if (pathname.startsWith('/routes/')) {
    const newPath = pathname.replace('/routes', '')
    return NextResponse.redirect(new URL(newPath, request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
